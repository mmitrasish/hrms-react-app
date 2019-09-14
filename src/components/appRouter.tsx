import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../App";
import LoginComponent from "../pages/logincomponent";
import RegisterComponent from "../pages/registercomponent";
import AdminComponent from "../pages/protected/admincomponent";
import HRComponent from "../pages/protected/hrcomponent";
import EmployeeComponent from "../pages/protected/employeecomponent";
import ProfileComponent from "../pages/protected/profilecomponent";

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
        <Route path="/profile" component={ProfileComponent} />
        <Route
          path="/dashboard"
          render={() =>
            localStorage.getItem("isLoggedIn") === "true" ? (
              localStorage.getItem("loggedUserRole") === "Admin" ? (
                <AdminComponent />
              ) : localStorage.getItem("loggedUserRole") === "HR" ? (
                <HRComponent />
              ) : (
                <EmployeeComponent />
              )
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
