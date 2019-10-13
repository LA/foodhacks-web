import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {connect} from "react-redux";

type Props = {
  text: string;
};

const FeedListItem = React.memo(function FeedListItem(props: Props) {
  return (
      <ListItem button style={{backgroundColor: 'lightgray'}}>
        <ListItemText primary={props.text} />
      </ListItem>
  );
});

const mapStateToProps = (state: any) => {
  return {
    accountType: state.accountType
  };
};
export default connect(mapStateToProps)(FeedListItem);