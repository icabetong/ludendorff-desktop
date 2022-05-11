import { useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Dialog,
  DialogContent,
  LinearProgress
} from "@mui/material";
import { InstantSearch } from "react-instantsearch-core";
import { collection, orderBy, query } from "firebase/firestore";
import { usePagination } from "use-pagination-firestore";
import { Category } from "./Category";
import CategoryEditor from "./CategoryEditor";
import { initialState, reducer } from "./CategoryEditorReducer";
import CategoryList from "./CategoryList";
import CategorySearchList from "./CategorySearchList";
import { usePermissions } from "../auth/AuthProvider";
import Client from "../search/Client";
import { ErrorNoPermissionState } from "../state/ErrorStates";
import { categoryCollection, categoryName } from "../../shared/const";
import { firestore } from "../../index";
import { PaginationController } from "../../components/PaginationController";
import useQueryLimit from "../shared/hooks/useQueryLimit";
import DialogToolbar from "../../components/DialogToolbar";
import { Transition } from "../../components/EditorComponent";

type CategoryScreenProps = {
  isOpen: boolean,
  onDismiss: () => void,
}

const CategoryScreen = (props: CategoryScreenProps) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { canRead, canWrite } = usePermissions();
  const { limit } = useQueryLimit('categoryQueryLimit');

  const { items, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<Category>(
    query(collection(firestore, categoryCollection), orderBy(categoryName, "asc")),
    { limit: limit }
  );

  const onSearchInvoked = () => setSearch(!search);

  const onEditorCreate = () => dispatch({ type: "create" })
  const onEditorDismiss = () => dispatch({ type: "dismiss" })
  const onEditorUpdate = (type: Category) => dispatch({ type: "update", payload: type })

  return (
    <InstantSearch searchClient={Client} indexName="categories">
      <Dialog
        fullScreen={true}
        open={props.isOpen}
        TransitionComponent={Transition}>
        <DialogToolbar
          title={t("navigation.categories")}
          onAdd={canWrite ? onEditorCreate : undefined}
          onDismiss={props.onDismiss}
          onSearchFocusChanged={onSearchInvoked}/>
        <DialogContent
          dividers={true}
          sx={{
            minHeight: '60vh',
            paddingX: 0,
            '& .MuiList-padding': { padding: 0 }
          }}>
          { canRead
            ? !isLoading
              ? <Box sx={{ height: '100%' }}>
                  { search
                    ? <CategorySearchList onItemSelect={onEditorUpdate}/>
                    : <>
                      <CategoryList categories={items} onItemSelect={onEditorUpdate}/>
                      { isEnd && items.length > 0 && items.length === limit &&
                        <PaginationController
                          canBack={isStart}
                          canForward={isEnd}
                          onBackward={getPrev}
                          onForward={getNext}/>
                      }
                      </>
                  }
                </Box>
              : <LinearProgress/>
            : <ErrorNoPermissionState/>
          }
        </DialogContent>
      </Dialog>
      <CategoryEditor
        isOpen={state.isOpen}
        isCreate={state.isCreate}
        category={state.category}
        onDismiss={onEditorDismiss}/>
    </InstantSearch>
  )
}
export default CategoryScreen;