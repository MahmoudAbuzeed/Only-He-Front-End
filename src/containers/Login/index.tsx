import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { makeSelectLogin } from "./selectors";
import { testLoginRequest } from "./actions";

import LoginComponent from "./loginComponent";

export function LoginPage(props: any): any {
  console.log("login", props.login);
  useEffect(() => {
    // props?.loginAction();
  }, []);
  return <LoginComponent />;
}

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch: any) {
  return {
    loginAction: () => dispatch(testLoginRequest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
