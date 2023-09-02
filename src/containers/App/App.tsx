import { Switch, Route } from "react-router-dom";

import { DashboardPage } from "../Dashboard";
import { LoginPage } from "../Login/index";
import { RegisterPage } from "../Register";
import HomePage from "../Home/index";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route  path="/login" component={LoginPage} />
        <Route  path="/register" component={RegisterPage} />
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
