import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    ListItem,
    TextField,
    Typography,
    makeStyles
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Department, DepartmentRepository } from "./Department";
import { User, UserCore, minimize } from "../user/User";
import UserPicker from "../user/UserPicker";
import { usePagination } from "../../shared/pagination";
import {
    userCollection,
    lastName
} from "../../shared/const";
import { newId } from "../../shared/utils";
import { firestore } from "../..";

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: '0.6em 0',
        width: '100%',
        '& .MuiListItem-root': {
            borderRadius: theme.spacing(1)
        }
    }
}));

type DepartmentEditorProps = {
    isOpen: boolean,
    isCreate: boolean,
    department?: Department
    onDismiss: () => void,
}

type FormValues = {
    name: string
}

const DepartmentEditor = (props: DepartmentEditorProps) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [isPickerOpen, setPickerOpen] = useState(false);
    const [manager, setManager] = useState<UserCore | undefined>(props.department?.manager);

    const onPickerView = () => setPickerOpen(true);
    const onPickerDismiss = () => setPickerOpen(false);

    const onSubmit = (data: FormValues) => {
        const department: Department = {
            departmentId: props.department?.departmentId !== undefined ? props.department?.departmentId : newId(),
            manager: manager,
            count: props.department?.count !== undefined ? props.department?.count : 0,
            ...data
        }

        if (props.isCreate) {
            DepartmentRepository.create(department)
                .then(() => enqueueSnackbar(t("feedback.department_created")))
                .catch(() => enqueueSnackbar(t("feedback.department_create_error")))
                .finally(props.onDismiss)
        } else {
            DepartmentRepository.update(department)
                .then(() => enqueueSnackbar(t("feedback.department_updated")))
                .catch(() => enqueueSnackbar(t("feedback.department_update_error")))
                .finally(props.onDismiss)
        }
    }

    const onUserSelected = (user: User) => {
        setManager(minimize(user))
    }

    const {
        items: users,
        isLoading: isUsersLoading,
        isStart: atUserStart,
        isEnd: atUserEnd,
        getPrev: getPreviousUsers,
        getNext: getNextUsers
    } = usePagination<User>(
        firestore
            .collection(userCollection)
            .orderBy(lastName, "asc"), { limit: 15 }
    )

    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth="xs"
                open={props.isOpen}
                onClose={props.onDismiss}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>{ t("department_details") }</DialogTitle>
                    <DialogContent>
                        <Container disableGutters>
                            <TextField
                                autoFocus
                                id="name"
                                type="text"
                                label={ t("field.department_name") }
                                defaultValue={props.department !== undefined ? props.department?.name : ""}
                                error={errors.name !== undefined}
                                helperText={errors.name?.message !== undefined ? t("feedback.empty_department_name") : undefined}
                                className={classes.textField}
                                {...register("name", { required: "feedback.empty_department_name" })}/>
                            <FormControl component="fieldset" className={classes.textField}>
                                    <FormLabel component="legend">
                                        <Typography variant="body2">{ t("field.manager") }</Typography>
                                    </FormLabel>
                                    <ListItem button onClick={onPickerView}>
                                        <Typography variant="body2">
                                            { manager !== undefined ? manager?.name : t("not_set")  }
                                        </Typography>
                                    </ListItem>
                                </FormControl>
                        </Container>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={props.onDismiss}>{ t("button.cancel") }</Button>
                        <Button color="primary" type="submit">{ t("button.save") }</Button>
                    </DialogActions>
                </form>
            </Dialog>
            { isPickerOpen &&
                <UserPicker
                    isOpen={isPickerOpen}
                    users={users}
                    isLoading={isUsersLoading}
                    hasPrevious={atUserStart}
                    hasNext={atUserEnd}
                    onPrevious={getPreviousUsers}
                    onNext={getNextUsers}
                    onDismiss={onPickerDismiss}
                    onSelectItem={onUserSelected}/>
            }
        </>
    )
}

export default DepartmentEditor;