import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { makeSelectDashboard } from "./selectors";
import { testDashboardRequest } from "./actions";

import DashboardComponent from "./dashboardComponent";

export function DashboardPage(props: any): any {
  console.log("dashboard", props.dashboard);
  useEffect(() => {
    // props.testAction();
  }, []);
  return <DashboardComponent />;
}

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch: any) {
  return {
    testAction: () => dispatch(testDashboardRequest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
