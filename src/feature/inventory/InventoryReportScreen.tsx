import { useReducer, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { InstantSearch } from "react-instantsearch-core";
import { Alert, Box, Fab, LinearProgress, Snackbar } from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import { AddRounded } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { collection, orderBy, query, limit } from "firebase/firestore";
import * as Excel from "exceljs";
import { InventoryReport, InventoryReportRepository } from "./InventoryReport";
import { initialState, reducer, } from "./InventoryReportEditorReducer";
import InventoryReportDataGrid from "./InventoryReportDataGrid";
import { InventoryReportEmptyState } from "./InventoryReportEmptyState";
import InventoryReportList from "./InventoryReportList";
import InventoryReportEditor from "./InventoryReportEditor";
import { convertInventoryReportToSpreadsheet} from "./InventoryReportSheet";
import { usePermissions } from "../auth/AuthProvider";
import { getDataGridTheme } from "../core/Core";
import Client from "../search/Client";
import usePagination from "../shared/hooks/usePagination";
import { ErrorNoPermissionState } from "../state/ErrorStates";
import { ExportSpreadsheetDialog, ExportParameters } from "../shared/ExportSpreadsheetDialog";
import { ScreenProps } from "../shared/types/ScreenProps";
import { convertWorkbookToBlob, spreadsheetFileExtension } from "../../shared/spreadsheet";
import { AdaptiveHeader, useDialog } from "../../components";
import {
  inventoryCollection,
  inventoryReportId,
} from "../../shared/const";
import { isDev } from "../../shared/utils";
import useSort from "../shared/hooks/useSort";
import { firestore } from "../../index";

type InventoryReportScreenProps = ScreenProps
const InventoryReportScreen = (props: InventoryReportScreenProps) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const show = useDialog();
  const { canRead, canWrite } = usePermissions();
  const [toExport, setToExport] = useState<InventoryReport | undefined>(undefined);
  const [searchMode, setSearchMode] = useState(false);
  const [hasBackgroundWork, setBackgroundWork] = useState(false);
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const { sortMethod, onSortMethodChange } = useSort('inventorySort');

  const { items, isLoading, error, canBack, canForward, onBackward, onForward } = usePagination<InventoryReport>(
    query(collection(firestore, inventoryCollection), orderBy(inventoryReportId, "asc"), limit(25)),
    inventoryReportId, 25
  )

  const onInventoryReportRemove = async (report: InventoryReport) => {
    try {
      let result = await show({
        title: t("dialog.inventory_remove"),
        description: t("dialog.inventory_remove_summary"),
        confirmButtonText: t("button.delete"),
        dismissButtonText: t("button.cancel")
      });
      if (result) {
        await InventoryReportRepository.remove(report);
        enqueueSnackbar(t("feedback.inventory_removed"));
      }
    } catch (error) {
      enqueueSnackbar(t("feedback.inventory_remove_error"));
      if (isDev) console.log(error);
    }
  }

  const onExportSpreadsheet = (inventoryReport: InventoryReport) => {
    setToExport(inventoryReport);
  }
  const onExportDismiss = () => setToExport(undefined);
  const onExport = async (params: ExportParameters) => {
    if (toExport) {
      setBackgroundWork(true);
      toExport.items = await InventoryReportRepository.fetch(toExport.inventoryReportId);
      const workBook = new Excel.Workbook();
      convertInventoryReportToSpreadsheet(workBook, params.worksheetName, toExport);

      const blob = await convertWorkbookToBlob(workBook);
      if (linkRef && linkRef.current) {
        linkRef.current.href = URL.createObjectURL(blob);
        linkRef.current.download = `${params.fileName}${spreadsheetFileExtension}`;
        linkRef.current?.click();
      }
      setBackgroundWork(false);
    }
    onExportDismiss();
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const onInventoryEditorDismiss = () => dispatch({ type: "dismiss" })
  const onDataGridRowDoubleClicked = (params: GridRowParams) => {
    onInventoryReportSelected(params.row as InventoryReport)
  }

  const onInventoryReportSelected = (report: InventoryReport) => {
    dispatch({
      type: "update",
      payload: report
    })
  }

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <InstantSearch
        searchClient={Client}
        indexName="inventories">
        <AdaptiveHeader
          title={t("navigation.inventories")}
          actionText={canWrite ? t("button.create_report") : undefined}
          onActionEvent={() => dispatch({ type: "create" })}
          onDrawerTriggered={props.onDrawerToggle}
          onSearchFocusChanged={setSearchMode}/>
        {canRead
          ? <>
            <Box sx={(theme) => ({ flex: 1, padding: 3, display: { xs: 'none', sm: 'block' }, ...getDataGridTheme(theme)})}>
              <InventoryReportDataGrid
                items={items}
                isLoading={isLoading}
                isSearching={searchMode}
                canBack={canBack}
                canForward={canForward}
                sortMethod={sortMethod}
                onBackward={onBackward}
                onForward={onForward}
                onItemSelect={onDataGridRowDoubleClicked}
                onExportSpreadsheet={onExportSpreadsheet}
                onRemoveInvoke={onInventoryReportRemove}
                onSortMethodChanged={onSortMethodChange}/>
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' }}}>
              {!isLoading
                ? items.length < 1
                  ? <InventoryReportEmptyState/>
                  : <InventoryReportList
                      reports={items}
                      onItemSelect={onInventoryReportSelected}
                      onItemRemove={onInventoryReportRemove}/>
                : <LinearProgress/>
              }
              <Fab
                color="primary"
                aria-label={t("button.add")}
                onClick={() => dispatch({ type: "create" })}>
                <AddRounded/>
              </Fab>
            </Box>
          </>
          : <ErrorNoPermissionState/>
        }
      </InstantSearch>
      <InventoryReportEditor
        isOpen={state.isOpen}
        isCreate={state.isCreate}
        report={state.report}
        onDismiss={onInventoryEditorDismiss}/>
      <ExportSpreadsheetDialog
        key="inventoryExport"
        isOpen={Boolean(toExport)}
        isWorking={hasBackgroundWork}
        fileName={toExport?.fundCluster}
        worksheetName={toExport?.fundCluster}
        fileNameOptions={ toExport &&
          [...(toExport!.fundCluster ? [toExport!.fundCluster] : []),
            ...(toExport!.entityName ? [toExport!.entityName] : []),
            ...(toExport!.yearMonth ? [toExport!.yearMonth] : [])
          ]
        }
        worksheetOptions={ toExport &&
          [...(toExport!.fundCluster ? [toExport!.fundCluster] : []),
            ...(toExport!.entityName ? [toExport!.entityName] : []),
            ...(toExport!.yearMonth ? [toExport!.yearMonth] : [])
          ]
        }
        onDismiss={onExportDismiss}
        onSubmit={onExport}/>
      <Box sx={{ display: 'none' }}>
        <a ref={linkRef} href="https://captive.apple.com">{t("button.download")}</a>
      </Box>
      <Snackbar open={Boolean(error)}>
        <Alert severity="error">
          {error?.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default InventoryReportScreen;