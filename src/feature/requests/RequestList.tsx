import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

import { MailOpenIcon, TrashIcon } from "@heroicons/react/outline";

import EmptyStateComponent from "../state/EmptyStates";
import PaginationController from "../../components/PaginationController";
import HeroIconButton from "../../components/HeroIconButton";
import ConfirmationDialog from "../shared/ConfirmationDialog";

import { usePermissions } from "../auth/AuthProvider";
import { Request, RequestRepository } from "./Request";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '60vh'
    },
}));

type RequestListProps = {
    requests: Request[],
    hasPrevious: boolean,
    hasNext: boolean,
    onPrevious: () => void,
    onNext: () => void,
    onItemSelect: (request: Request) => void,
}

const RequestList = (props: RequestListProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [request, setRequest] = useState<Request | undefined>(undefined);

    const onRemoveInvoke = (request: Request) => setRequest(request);
    const onRemoveDismiss = () => setRequest(undefined);

    const onRequestRemove = () => {
        if (request !== undefined) {
            RequestRepository.remove(request)
                .then(() => enqueueSnackbar(t("feedback.request_removed")))
                .catch(() => enqueueSnackbar(t("feedback.request_remove_error")))
                .finally(onRemoveDismiss)
        }
    }

    return (
        <>
            { props.requests.length > 0
            ? <>
                <List className={classes.root}>{
                    props.requests.map((request: Request) => {
                        return (
                            <RequestItem
                                key={request.requestId}
                                request={request}
                                onItemSelect={props.onItemSelect}
                                onItemRemove={onRemoveInvoke}/>
                        );
                    })
                }</List>
                { !props.hasNext && !props.hasPrevious &&
                    <PaginationController
                        hasPrevious={props.hasPrevious}
                        hasNext={props.hasNext}
                        getPrevious={props.onPrevious}
                        getNext={props.onNext}/>
                }
                </>
            : <EmptyStateComponent
                icon={MailOpenIcon}
                title={t("empty.requests")}
                subtitle={t("empty.requests_summary")}/>
            }
            { request &&
                <ConfirmationDialog
                    isOpen={request !== undefined}
                    title="dialog.request_remove"
                    summary="dialog.request_remove_summary"
                    onDismiss={onRemoveDismiss}
                    onConfirm={onRequestRemove}/>
            }
        </>
    )
}

type RequestItemProps = {
    request: Request,
    onItemSelect: (request: Request) => void,
    onItemRemove: (request: Request) => void
}

const RequestItem = (props: RequestItemProps) => {
    const { t } = useTranslation();
    const { isAdmin } = usePermissions();

    return (
        <ListItem
            button
            key={props.request.requestId}
            onClick={() => props.onItemRemove(props.request)}>
            <ListItemText
                primary={props.request.asset?.assetName}
                secondary={props.request.petitioner?.name}/>
            { isAdmin &&
                <ListItemSecondaryAction>
                    <HeroIconButton
                        icon={TrashIcon}
                        edge="end"
                        aria-label={t("delete")}
                        onClick={() => props.onItemRemove(props.request)}
                    />
                </ListItemSecondaryAction>
            }
        </ListItem>
    )
}

export default RequestList;