import { Switch, Route } from "react-router-dom";
import { LoginPage } from "../Login/index";
import HomePage from "../Home/index";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route  path="/login" component={LoginPage} />
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
