import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { makeSelectProducts } from "./selectors";
import { testProductsRequest } from "./actions";

import ProductsComponent from "./productsComponent";

export function ProductsPage(props: any): any {
  console.log("Products", props.products);
  useEffect(() => {
    // props.testAction();
  }, []);
  return <ProductsComponent />;
}

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
});

function mapDispatchToProps(dispatch: any) {
  return {
    testAction: () => dispatch(testProductsRequest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
