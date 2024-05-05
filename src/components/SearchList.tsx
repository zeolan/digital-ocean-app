import React from "react";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemText } from "@mui/material";

import { getMode } from "../store/reducer.ts";
import { IVerb, Lang, Mode } from "../types.ts";

interface SearchListParams {
  searchResults: any[];
  searchLang: Lang;
  onItemClick: (item: IVerb) => void;
}
const SearchList: React.FC<SearchListParams> = ({
  searchResults,
  searchLang,
  onItemClick,
}) => {
  const isLightMode = useSelector(getMode) === Mode.light;

  const onListItemClick = (item: IVerb) => {
    onItemClick(item);
  };

  return searchResults.length > 0 ? (
    <div className="App-verb-search-list">
      <List
        style={{
          backgroundColor: !isLightMode ? "#555555" : "#cccccc",
        }}
      >
        {searchResults.map((option) => (
          <ListItem
            style={{ cursor: "pointer" }}
            key={option.id}
            value={option.nameRo}
            disablePadding
            onClick={() => onListItemClick(option)}
          >
            <ListItemText
              primary={
                searchLang === Lang.ro ? option.nameRo[0] : option.nameRu
              }
              sx={{ borderBottom: "1px solid #aaaaaa" }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  ) : null;
};

export default SearchList;
