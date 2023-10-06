import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { makeSelectUsers } from "./selectors";
import { testUsersRequest } from "./actions";

import UsersComponent from "./usersComponent";

export function UsersPage(props: any): any {
  console.log("Users", props.users);
  useEffect(() => {
    // props.testAction();
  }, []);
  return <UsersComponent />;
}

const mapStateToProps = createStructuredSelector({
  Users: makeSelectUsers(),
});

function mapDispatchToProps(dispatch: any) {
  return {
    testAction: () => dispatch(testUsersRequest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
