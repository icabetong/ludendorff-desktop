import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";

import { usePermissions } from "../auth/AuthProvider";
import { Category } from "./Category";
import CategoryList from "./CategoryList";

import { ErrorNoPermissionState } from "../state/ErrorStates";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '60vh',
        paddingTop: 0,
        paddingBottom: 0,
        '& .MuiList-padding': {
            padding: 0
        }
    }
}));

type CategoryPickerProps = {
    isOpen: boolean,
    categories: Category[],
    isLoading: boolean,
    hasPrevious: boolean,
    hasNext: boolean,
    onPreviousBatch: () => void,
    onNextBatch: () => void,
    onDismiss: () => void,
    onAddItem: () => void,
    onSelectItem: (category: Category) => void,
    onDeleteItem: (category: Category) => void,
}

const CategoryPicker = (props: CategoryPickerProps) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles();
    const { canRead, canWrite } = usePermissions();

    return (
        <Dialog
            fullScreen={isMobile}
            fullWidth={true}
            maxWidth="xs"
            open={props.isOpen}
            onClose={() => props.onDismiss() }>
            <DialogTitle>{ t("category_select") }</DialogTitle>
            <DialogContent dividers={true} className={classes.root}>
                { canRead 
                    ? !props.isLoading
                        ? <CategoryList 
                            hasPrevious={props.hasPrevious}
                            hasNext={props.hasNext}
                            onPrevious={props.onPreviousBatch}
                            onNext={props.onNextBatch}
                            categories={props.categories} 
                            onItemSelect={props.onSelectItem}
                            onItemRemove={props.onDeleteItem}/>
                        : <LinearProgress/>
                    :  <ErrorNoPermissionState/>
                }
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => props.onAddItem()} disabled={!canWrite}>{ t("button.add") }</Button>
                <div style={{flex: '1 0 0'}}></div>
                <Button color="primary" onClick={() => props.onDismiss()}>{ t("button.close") }</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CategoryPicker;