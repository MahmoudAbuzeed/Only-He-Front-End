import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { makeSelectOrderDetails } from "./selectors";
import { testOrderDetailsRequest } from "./actions";

import OrderDetailsComponent from "./orderDetailsComponent";

const dummyOrderData = [
  {
    orderId: "123456",
    date: new Date("2023-10-01"),
    customerName: "John Doe",
    products: [
      { name: "Laptop", quantity: 1, price: 999.99 },
      { name: "Mouse", quantity: 2, price: 19.99 },
      { name: "Keyboard", quantity: 1, price: 49.99 },
      { name: "Monitor", quantity: 1, price: 129.99 },
      { name: "Headphones", quantity: 2, price: 59.99 },
      { name: "USB Cable", quantity: 3, price: 5.99 },
      { name: "Charger", quantity: 1, price: 29.99 },
      { name: "Webcam", quantity: 1, price: 69.99 },
      { name: "Microphone", quantity: 1, price: 79.99 },
      { name: "Speaker", quantity: 2, price: 89.99 },
      { name: "Hard Drive", quantity: 1, price: 49.99 },
      { name: "RAM", quantity: 2, price: 39.99 },
    ],
    totalAmount: 1039.97,
    status: "Pending",
  },
  {
    orderId: "789012",
    date: new Date("2023-09-21"),
    customerName: "Jane Smith",
    products: [{ name: "Headphones", quantity: 1, price: 59.99 }],
    totalAmount: 59.99,
    status: "Shipped",
  },
  // ... add more dummy orders as required
];

export function OrderDetailsPage(props: any): any {
  console.log("OrderDetails", props.orderDetails);
  useEffect(() => {
    // props.testAction();
  }, []);
  const orderId = "123456";
  const orderDetails = dummyOrderData.find(
    (order) => order.orderId === orderId
  );

  if (!orderDetails) {
    return <div>Order not found!</div>;
  }
  return <OrderDetailsComponent orderDetails={orderDetails} />;
}

const mapStateToProps = createStructuredSelector({
  orderDetails: makeSelectOrderDetails(),
});

function mapDispatchToProps(dispatch: any) {
  return {
    testAction: () => dispatch(testOrderDetailsRequest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsPage);
