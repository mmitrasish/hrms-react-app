import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../App";
import LoginComponent from "../pages/logincomponent";
import RegisterComponent from "../pages/registercomponent";
import AdminComponent from "../pages/admincomponent";
import HRComponent from "../pages/hrcomponent";

const AppRouter: React.FC = () => {
  //   'function PrivateRoute({ component: Component, ...rest }) {
  //     return (
  //       <Route
  //         {...rest}
  //         render={props =>
  //           true ? (
  //             <Component {...props} />
  //           ) : (
  //             <Redirect
  //               to={{
  //                 pathname: "/login",
  //                 state: { from: props.location }
  //               }}
  //             />
  //           )
  //         }
  //       />
  //     );
  //   }
  return (
    <Router>
      <App>
        <Route path="/login" component={LoginComponent} />
        <Route path="/register" component={RegisterComponent} />
        <Route
          path="/dashboard"
          render={() =>
            localStorage.getItem("isLoggedIn") === "true" ? (
              <HRComponent />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/"
          render={() =>
            localStorage.getItem("isLoggedIn") === "true" ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </App>
    </Router>
  );
};
export default AppRouter;
