import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { makeSelectRegister } from "./selectors";
import { testRegisterRequest } from "./actions";

import RegisterComponent from "./registerComponent";

export function RegisterPage(props: any): any {
  console.log("Register", props.register);
  useEffect(() => {
    // props.testAction();
  }, []);
  return <RegisterComponent />;
}

const mapStateToProps = createStructuredSelector({
  register: makeSelectRegister(),
});

function mapDispatchToProps(dispatch: any) {
  return {
    testAction: () => dispatch(testRegisterRequest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
