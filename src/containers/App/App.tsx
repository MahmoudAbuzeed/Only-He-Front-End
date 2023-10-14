import { Switch, Route } from "react-router-dom";
import { CategoriesPage } from "../Categories/index";
import { LoginPage } from "../Login/index";
import { RegisterPage } from "../Register";
import HomePage from "../Home/index";
import LayoutComponent from "../../components/layout";
import { ProductsPage } from "../Products";
import { OrdersPage } from "../Orders";
import { OrderDetailsPage } from "../OrderDetails";
import { UsersPage } from "../Users";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <LayoutComponent>
            <HomePage />
          </LayoutComponent>
        </Route>
        <Route exact path="/categories">
          <LayoutComponent>
            <CategoriesPage />
          </LayoutComponent>
        </Route>
        <Route exact path="/products">
          <LayoutComponent>
            <ProductsPage />
          </LayoutComponent>
        </Route>
        <Route exact path="/orders">
          <LayoutComponent>
            <OrdersPage />
          </LayoutComponent>
        </Route>

        <Route exact path="/order/:orderId">
          <LayoutComponent>
            <OrderDetailsPage />
          </LayoutComponent>
        </Route>

        <Route path="/users">
          <LayoutComponent>
            <UsersPage />
          </LayoutComponent>
        </Route>

        <Route path="/login">
          <LayoutComponent>
            <LoginPage />
          </LayoutComponent>
        </Route>
        <Route path="/register">
          <LayoutComponent>
            <RegisterPage />
          </LayoutComponent>
        </Route>
        {/* <Route>
          <LayoutComponent>
            <NotFoundPage />
          </LayoutComponent>
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
