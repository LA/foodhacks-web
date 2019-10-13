import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

type Props = {
  text: string;
};

const FeedListItem = React.memo(function FeedListItem(props: Props) {
  return (
      <ListItem button>
        <ListItemText primary={props.text} />
      </ListItem>
  );
});

export default FeedListItem;
