import LandingPage from "../Pages/LandingPage/LandingPage";
import UserAccount from "../Pages/UserAccount";
import Header from "./Header/";
import ProtectedRoute from "./Protected";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PATH } from "../helper/helper";

const App = () => {
  return (
    <Router>
      <div className="layout">
        <Header />
        <main>
          <Switch>
            <Route exact path={PATH.HOME}>
              <LandingPage />
            </Route>
            <ProtectedRoute exact path={PATH.ACCOUNT} component={UserAccount} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
