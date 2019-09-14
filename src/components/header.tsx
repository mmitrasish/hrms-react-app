import * as React from "react";
import EmployeeService from "../services/employeeservice";
import { IEmployee } from "../models/employee";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

const Header: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  let logout = () => {
    EmployeeService.getEmployee().subscribe((employees: IEmployee[]) => {
      let user = employees.filter(
        employee => employee.username === localStorage.getItem("loggedUsername")
      )[0];
      user.isActive = false;
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("loggedUsername");
      localStorage.removeItem("loggedUserRole");

      EmployeeService.updateEmployee(user, user.employeeId).subscribe(() => {
        console.log("Update Successful");
        props.history.push("/login");
      });
    });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            HRMS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div id="navbarNavDropdown" className="navbar-collapse collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reports">
                  Reports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/transaction">
                  Transactions
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {localStorage.getItem("isLoggedIn") === "false" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Sign in
                  </Link>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Welcome {localStorage.getItem("loggedUsername")}!
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                    <div className="dropdown-divider"></div>
                    <div
                      onClick={logout}
                      className="dropdown-item"
                      style={{ margin: 0 }}
                    >
                      Logout
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Header);
