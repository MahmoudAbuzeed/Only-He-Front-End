import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { makeSelectCategories } from "./selectors";
import { testCategoriesRequest } from "./actions";

import CategoriesComponent from "./categoriesComponent";

export function CategoriesPage(props: any): any {
  console.log("Categories", props.categories);
  useEffect(() => {
    // props.testAction();
  }, []);
  return <CategoriesComponent />;
}

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
});

function mapDispatchToProps(dispatch: any) {
  return {
    testAction: () => dispatch(testCategoriesRequest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
