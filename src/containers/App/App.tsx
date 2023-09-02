import { Switch, Route } from "react-router-dom";
import HomePage from "../Home/index";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={HomePage} />
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
