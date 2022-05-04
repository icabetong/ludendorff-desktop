import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Box, InputBase, TextField } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import algoliasearch from "algoliasearch/lite";
import { connectHighlight, connectSearchBox } from "react-instantsearch-dom";
import { HighlightProps, SearchBoxProvided } from "react-instantsearch-core";

const CustomHighlight = ({ highlight, attribute, hit }: HighlightProps) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit
  });

  return (
    <span>
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <Box
            key={index}
            component="span"
            sx={{ color: (theme) => theme.palette.primary.main }}>
            {part.value}
          </Box>
        ) : (
          <span key={index}>{part.value}</span>
        ))
      }
    </span>
  )
}


type SearchBoxInputBaseProps = SearchBoxProvided & {
  dontWatchFocus?: boolean,
  onFocusChanged?: (hasFocus: boolean) => void,
}
const SearchBoxInputBaseCore = (props: SearchBoxInputBaseProps) => {
  const { t } = useTranslation();
  const onFocusGained = () => props.onFocusChanged?.(true)
  const onFocusLost = () => {
    if (!props.dontWatchFocus) {
      if (props.currentRefinement.match(/^ *$/) != null)
        return props.onFocusChanged?.(false)
      else return props.onFocusChanged?.(true)
    }
  }

  const onQueryChanged = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    props.refine(event.target.value)
    if (!props.dontWatchFocus) {
      if (event.target.value === '') {
        props.onFocusChanged?.(false)
      }
    }
  }

  return (
    <Box
      sx={(theme) => (
        {
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          padding: theme.spacing('4px', 1),
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.divider,
          marginLeft: 0,
          marginRight: theme.spacing(2),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
          }
        }
      )}>
      <Box
        sx={{
          padding: (theme) => theme.spacing(0, 1),
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <SearchRounded/>
      </Box>
      <InputBase
        id="search"
        placeholder={t("field.search")}
        value={props.currentRefinement}
        onFocus={onFocusGained}
        onBlur={onFocusLost}
        onChange={onQueryChanged}
        sx={(theme) => ({
            flexGrow: 1,
            color: 'inherit',
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
              width: '18ch',
              '&:focus': {
                width: '20ch'
              }
            }
        })}/>
    </Box>

  );
}
type SearchBoxProps = SearchBoxProvided & {
  onFocusChanged?: (hasFocus: boolean) => void,
}
const SearchBoxCore = (props: SearchBoxProps) => {
  const { t } = useTranslation();
  const onFocusGained = () => props.onFocusChanged?.(true)
  const onFocusLost = () => {
    if (props.currentRefinement.match(/^ *$/) != null)
      return props.onFocusChanged?.(false)
    else return props.onFocusChanged?.(true)
  }

  const onQueryChanged = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    props.refine(event.target.value)
    if (event.target.value === '') {
      props.onFocusChanged?.(false)
    }
  }

  return (
    <TextField
      id="search"
      size="small"
      label={t("field.search")}
      value={props.currentRefinement}
      onFocus={onFocusGained}
      onBlur={onFocusLost}
      onChange={onQueryChanged}/>
  );
}

export const Highlight = connectHighlight(CustomHighlight)
export const SearchBox = connectSearchBox<SearchBoxProps>(SearchBoxCore);
export const SearchBoxInputBase = connectSearchBox<SearchBoxInputBaseProps>(SearchBoxInputBaseCore)
export const Provider = algoliasearch("H1BMXJXRBE", "ecfcef9a59b7ec023817ef3041de6416");