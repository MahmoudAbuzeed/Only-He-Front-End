import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { makeSelectHome } from "./selectors";
import { testHomeRequest } from "./actions";

import HomeComponent from "./homeComponent";

export function HomePage(props: any): any {
  console.log("home", props.home);
  useEffect(() => {
    props.testAction();
  }, []);
  return <HomeComponent />;
}

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
});

function mapDispatchToProps(dispatch: any) {
  return {
    testAction: () => dispatch(testHomeRequest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
