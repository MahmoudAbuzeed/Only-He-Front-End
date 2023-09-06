import { Switch, Route } from "react-router-dom";

import { CategoriesPage } from "../Categories/index";
import { LoginPage } from "../Login/index";
import { RegisterPage } from "../Register";
import HomePage from "../Home/index";
import LayoutComponent from "../../components/layout";

function App() {
  return (
    <div>
      <LayoutComponent />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/categories" component={CategoriesPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
