import { Switch, Route } from "react-router-dom";
import { LoginPage } from "../Login/index";
import HomePage from "../Home/index";
import { RegisterPage } from "../Register";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route  path="/login" component={LoginPage} />
        <Route  path="/register" component={RegisterPage} />
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
