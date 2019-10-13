import React, { useEffect } from "react";
import DashboardView from "./Views";
import { ACTIONS } from "../../redux/actionTypes";
import { connect } from "react-redux";

type Props = {
  accountType: string;
  dispatch: any;
  donations: Array<any>;
};

const Dashboard = React.memo(function Dashboard(props: Props) {
  useEffect(() => {
    props.dispatch({ type: ACTIONS.CORE.STARTUP });
  }, []);

  return (
    <React.Fragment>
      <DashboardView accountType={props.accountType} dispatch={props.dispatch} items={props.donations} />
    </React.Fragment>
  );
});

const mapStateToProps = (state: any) => {
  return {
    accountType: state.accountType,
    donations: state.donations,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
