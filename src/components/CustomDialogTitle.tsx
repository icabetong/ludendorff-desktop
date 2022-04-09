import React from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Theme, Typography } from "@mui/material";
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import { SearchOutlined } from "@mui/icons-material";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: theme.spacing(1, 2)
    },
    header: {
      flex: 2
    },
  });

type CustomDialogTitleProps = WithStyles<typeof styles> & {
  children: React.ReactNode,
  onSearch: () => void,
}
const CustomDialogTitle = withStyles(styles)((props: CustomDialogTitleProps) => {
  const { t } = useTranslation();
  const { children, classes, onSearch, ...other } = props;
  return (
    <Box className={classes.root} {...other}>
      <Typography className={classes.header} variant="h6">{children}</Typography>
      {onSearch ? (
        <IconButton
          edge="end"
          size="large"
          aria-label={t("button.search")}
          onClick={onSearch}>
          <SearchOutlined/>
        </IconButton>
      ) : null}
    </Box>
  );
})

export default CustomDialogTitle;