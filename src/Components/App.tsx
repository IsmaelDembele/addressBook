import LandingPage from "../Pages/LandingPage/LandingPage";
import UserAccount from "../Pages/UserAccount";
import UserHome from "../Pages/UserHome";
import Header from "./Header/";

import ProtectedRoute from "./Protected";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const App = () => {
  return (
      <Router>
        <div className="layout">
          <Header />
          <main>
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              {/* <Route exact path="/account">
              <UserAccount />
            </Route> */}
              <Route exact path="/home">
                <UserHome />
              </Route>
              <ProtectedRoute exact path="/account" component={UserAccount} />
            </Switch>
          </main>
        </div>
      </Router>
  );
};

export default App;
