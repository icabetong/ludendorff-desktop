import React, { FunctionComponent, ComponentClass } from "react";
import { ListItemIcon } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    icon: { width: '1em', height: '1em' }
}))

type HeroListItemIconProps = {
    icon: FunctionComponent<any> | ComponentClass<any, any>
}

const HeroListItemIcon = (props: HeroListItemIconProps) => {
    const classes = useStyles();

    return (
        <ListItemIcon>{React.createElement(props.icon, { className: classes.icon })}</ListItemIcon>
    )
}

export default HeroListItemIcon;