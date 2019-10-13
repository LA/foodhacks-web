import React from 'react';
import Header from "../../../components/Header";
import styles from "./styles";
import {Typography} from "@material-ui/core";
import FeedList from "../../../components/Lists/FeedList";

const DashboardView = React.memo(function DashboardView() {
  return (
    <div>
      <Header />
      <div style={styles.container}>
        <Typography variant="h5" style={{textAlign: 'center'}}>
          Recent Donations
        </Typography>
        <FeedList
          items={[
            "ABC donated 25 cans of beans.",
            "ABC donated 50 cans of beans."
          ]}
        />
      </div>
    </div>
  );
});

export default DashboardView;