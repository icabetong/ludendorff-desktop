import { useContext, useState, Suspense, lazy } from "react";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";

import { AuthContext, AuthFetched, AuthPending } from "../auth/AuthProvider";

import { Destination, NavigationComponent } from "../navigation/NavigationComponent";
import { SettingsComponent } from "../settings/SettingsComponent";
import { ErrorNotFoundStateComponent } from "../state/ErrorStates";
import { MainLoadingStateComponent, ContentLoadingStateComponent } from "../state/LoadingStates";

const HomeComponent = lazy(() => import('../home/HomeComponent'));
const ScanComponent = lazy(() => import('../scan/ScanComponent'));
const AssetComponent = lazy(() => import('../asset/AssetComponent'));
const UserComponent = lazy(() => import('../user/UserComponent'));
const AssignmentComponent = lazy(() => import('../assignment/AssignmentComponent'));

type InnerComponentPropsType = {
    destination: Destination,
    onDrawerToggle: () => void,
}

const InnerComponent = (props: InnerComponentPropsType) => {
    switch(props.destination) {
        case Destination.HOME:
            return <HomeComponent onDrawerToggle={props.onDrawerToggle}/>
        case Destination.SCAN:
            return <ScanComponent onDrawerToggle={props.onDrawerToggle}/>
        case Destination.ASSETS:
            return <AssetComponent onDrawerToggle={props.onDrawerToggle}/>
        case Destination.USERS:
            return <UserComponent onDrawerToggle={props.onDrawerToggle}/>
        case Destination.ASSIGNMENTS:
            return <AssignmentComponent onDrawerToggle={props.onDrawerToggle}/>
        case Destination.SETTINGS:
            return <SettingsComponent onDrawerToggle={props.onDrawerToggle}/>
        default:
            return <ErrorNotFoundStateComponent/>
    }
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100vw',
        height: '100vh'
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        }
    },
    drawerPaper: {
        width: drawerWidth,
    },
    container: {
        minWidth: '100%',
        minHeight: '100%',
    }, 
    icon: {
        maxWidth: '2em',
        maxHeight: '2em',
    },
    content: {
        flexGrow: 1,
    },
    headerIcon: {
        fontSize: '1em',
        display: 'block',
        margin: 'auto'
    },
    header: {
        display: 'block',
        textAlign: 'center'
    }
}));

type RootContainerComponentPropsType = {
    onNavigate: (destination: Destination) => void,
    currentDestination: Destination,
}

const RootContainerComponent = (props: RootContainerComponentPropsType) => {
    const classes = useStyles();
    const theme = useTheme();

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const onToggleDrawerState = () => {
        setDrawerOpen(!drawerOpen);
    }

    const onNavigateThenDismiss = (destination: Destination) => {
        setDrawerOpen(false)
        props.onNavigate(destination)
    }

    const drawerItems = (
        <NavigationComponent 
            onNavigate={onNavigateThenDismiss} 
            currentDestination={props.currentDestination}/>
    )

    return (
        <div className={classes.root}>
            <nav className={classes.drawer}>
                <Hidden mdUp implementation="css">
                    <Drawer 
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? 'right' : 'left' }
                        open={drawerOpen}
                        onClose={onToggleDrawerState}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}>
                        {drawerItems}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer 
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}>
                        {drawerItems}
                    </Drawer>
                </Hidden>
            </nav>
            <div className={classes.content}>
                <Suspense fallback={<ContentLoadingStateComponent/>}>
                    <InnerComponent destination={props.currentDestination} onDrawerToggle={onToggleDrawerState}/>
                </Suspense>
            </div>
        </div>
    );
}

const RootComponent = () => {
    const authState = useContext(AuthContext);
    const [destination, setDestination] = useState<Destination>(Destination.ASSETS);

    const onNavigate = (newDestination: Destination) => {
        setDestination(newDestination)
    }

    if (authState instanceof AuthPending) {
        return <MainLoadingStateComponent/>
    } else if (authState instanceof AuthFetched) {
        if (authState.user != null) {
            return (
                <SnackbarProvider 
                    maxSnack={3}
                    autoHideDuration={3000}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}>
                    <RootContainerComponent 
                        onNavigate={onNavigate} 
                        currentDestination={destination}/>
                </SnackbarProvider>
            )
        } else return <Redirect to="/auth"/>
    } else return <Redirect to="/error"/>
}
export default withRouter(RootComponent);