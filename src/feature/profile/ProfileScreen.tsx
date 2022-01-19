import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { makeStyles, useTheme } from "@material-ui/core/styles";

import {
  PencilIcon, KeyIcon, PaperAirplaneIcon, PhotographIcon
} from "@heroicons/react/outline";

import ProfileInfoList from "./ProfileInfoList";
import ProfileActionList from "./ProfileActionList";
import ChangeNamePrompt from "./actions/ChangeName";
import ChangePasswordPrompt from "./actions/ChangePassword";
import RequestResetPrompt from "./actions/RequestReset";
import { AuthStatus, useAuthState } from "../auth/AuthProvider";
import ComponentHeader from "../../components/ComponentHeader";
import { ReactComponent as Avatar } from "../../shared/user.svg"

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%'
  },
  wrapper: {
    height: '80%',
    padding: '1.4em'
  },
  avatar: {
    width: '20em',
    height: '20em',
    borderRadius: '50%'
  }
}))

type ProfileScreenProps = {
  onDrawerToggle: () => void
}

const ProfileScreen = (props: ProfileScreenProps) => {
  const { status, user } = useAuthState();
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const fileInput = useRef<HTMLInputElement | null>(null);

  const [changeName, setChangeName] = useState(false);
  const onChangeNameInvoke = () => setChangeName(true);
  const onChangeNameDismiss = () => setChangeName(false);

  const [changePassword, setChangePassword] = useState(false);
  const onChangePasswordInvoke = () => setChangePassword(true);
  const onChangePasswordDismiss = () => setChangePassword(false);

  const [requestReset, setRequestReset] = useState(false);
  const onResetPasswordInvoke = () => setRequestReset(true);
  const onResetPasswordDismiss = () => setRequestReset(false);

  const actions = [
    { key: 'action:avatar', icon: PhotographIcon, title: "action.update_avatar", action: () => fileInput?.current?.click() },
    { key: 'action:name', icon: PencilIcon, title: "action.change_name", action: onChangeNameInvoke },
    { key: 'action:password', icon: KeyIcon, title: "action.change_password", action: onChangePasswordInvoke },
    { key: 'action:request', icon: PaperAirplaneIcon, title: "action.request_reset", action: onResetPasswordInvoke }
  ];

  return (
    <Box className={classes.root}>
      <ComponentHeader
        title={t("navigation.profile")}
        onDrawerToggle={props.onDrawerToggle} />
      <input ref={fileInput} type="file" accept="image/*" hidden />

      {status === AuthStatus.FETCHED
        ?
        <div className={classes.wrapper}>
          <Grid
            container
            direction={isMobile ? "column" : "row"}
            alignItems="center"
            justifyContent="center"
            spacing={2}>
            <Grid container direction="row" item sm={6} alignItems="center" justifyContent="center">
              <Grid container item alignItems="center" justifyContent="center">
                {user?.imageUrl
                  ? <LazyLoadImage
                    className={classes.avatar}
                    alt={t("info.profile_image")}
                    src={user?.imageUrl} />
                  : <Avatar className={classes.avatar} />
                }
              </Grid>
              <Grid container item alignItems="center" justifyContent="center">
                <Typography align="center" variant="h4">
                  {t("template.full_name", { first: user?.firstName, last: user?.lastName })}
                </Typography>
              </Grid>
              <Grid container item alignItems="center" justifyContent="center">
                <Typography align="center" variant="body1">{user?.email}</Typography>
              </Grid>
            </Grid>
            <Grid container item sm={6} alignItems="center" justifyContent="flex-start">
              <ProfileInfoList user={user} />
              <ProfileActionList actions={actions} />
            </Grid>
          </Grid>
        </div>
        : <LinearProgress />
      }
      {changeName &&
        <ChangeNamePrompt
          isOpen={changeName}
          onDismiss={onChangeNameDismiss} />
      }
      {changePassword &&
        <ChangePasswordPrompt
          isOpen={changePassword}
          onDismiss={onChangePasswordDismiss} />
      }
      {requestReset &&
        <RequestResetPrompt
          isOpen={requestReset}
          onDismiss={onResetPasswordDismiss} />
      }
    </Box>
  );
}

export default ProfileScreen;