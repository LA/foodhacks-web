import React from "react"
import DashboardView from "./Views";

const Dashboard = React.memo(function Dashboard() {
  const items = [{}];

  return (
    <React.Fragment>
      <DashboardView />
    </React.Fragment>
  );
});

export default Dashboard;
