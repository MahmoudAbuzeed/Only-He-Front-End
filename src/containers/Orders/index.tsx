import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { makeSelectOrders } from "./selectors";
import { testOrdersRequest } from "./actions";

import OrdersComponent from "./ordersComponent";

export function OrdersPage(props: any): any {
  console.log("Orders", props.orders);
  useEffect(() => {
    // props.testAction();
  }, []);
  return <OrdersComponent />;
}

const mapStateToProps = createStructuredSelector({
  orders: makeSelectOrders(),
});

function mapDispatchToProps(dispatch: any) {
  return {
    testAction: () => dispatch(testOrdersRequest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
