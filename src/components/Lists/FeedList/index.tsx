import React from "react";
import FeedListItem from "../../ListItems/FeedListItem";
import { List } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

type Props = {
  items: Array<any>;
};

const FeedList = React.memo(function FeedList(props: Props) {
  return (
    <List style={{ width: "80%", margin: "auto", maxWidth: 500 }}>
      {props.items.map((item, index) => (
        <React.Fragment>
          <FeedListItem key={item.id} text={`${item.quantity}x ${item.name}`} />
          { index !== props.items.length-1 && <Divider />}
        </React.Fragment>

      ))}
    </List>
  );
});

export default FeedList;
