import React, { ComponentClass, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, SxProps, Theme, lighten, darken } from "@mui/material";
import { Destination } from "./NavigationContainer";

type NavigationListProps = {
  navigationKey?: string,
  current: Destination,
  header?: string,
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[],
  sx?: SxProps<Theme>
  onNavigate: (destination: Destination) => void,
}
const NavigationList = (props: NavigationListProps) => {
  const { t } = useTranslation();

  return (
    <List
      aria-labelledby={props.navigationKey && `${props.navigationKey}-subheader`}
      subheader={
        props.navigationKey && props.header &&
        <ListSubheader component="div" id={`${props.navigationKey}-subheader`}>
          {t(props.header)}
        </ListSubheader>
      }
      sx={{
        ...props.sx,
        backgroundColor: theme => theme.palette.background.paper,
        '&& .Mui-selected': {
          backgroundColor: theme => theme.palette.mode === 'dark' ? lighten(theme.palette.background.paper, 0.25) : darken(theme.palette.background.paper, 0.15),
        }
      }}>
      {props.children}
    </List>
  )
}

type NavigationListItemProps = {
  itemKey: any,
  icon: string | FunctionComponent<any> | ComponentClass<any, any>,
  title: string,
  active?: boolean,
  onNavigate: () => void,
}
const NavigationListItem = (props: NavigationListItemProps) => {
  const { t } = useTranslation();

  return (
    <ListItemButton
      key={props.itemKey}
      selected={props.active}
      onClick={props.onNavigate}
      sx={{
        borderRadius: 2,
        margin: theme => theme.spacing(1, 2),
      }}>
      <ListItemIcon>{React.createElement(props.icon)}</ListItemIcon>
      <ListItemText
        primary={t(props.title)}
        primaryTypographyProps={{
          fontSize: 14,
          fontWeight: 600
        }}/>
    </ListItemButton>
  )
}

export {
  NavigationList,
  NavigationListItem,
}