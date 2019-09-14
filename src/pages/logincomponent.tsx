import * as React from "react";
import EmployeeService from "../services/employeeservice";
import { IEmployee } from "../models/employee";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface ILoginState {
  username: string;
  password: string;
  employeeList: IEmployee[];
}

class LoginComponent extends React.Component<RouteComponentProps, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
      employeeList: []
    };
  }
  loadUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };
  loadPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };
  loginUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isUserPresent =
      this.state.employeeList.filter(
        employee =>
          employee.username === this.state.username &&
          employee.password === this.state.password
      ).length > 0;
    if (isUserPresent) {
      let user = this.state.employeeList.filter(
        employee =>
          employee.username === this.state.username &&
          employee.password === this.state.password
      )[0];

      user.isActive = true;
      let updateLocalStorage = new Promise((success, failure) => {
        localStorage.setItem("isLoggedIn", isUserPresent + "");
        localStorage.setItem("loggedUsername", this.state.username);
        localStorage.setItem("loggedUserRole", user.role);
        console.log(localStorage.getItem("loggedUserRole"));
        success();
      });
      updateLocalStorage.then(() => {
        EmployeeService.updateEmployee(user, user.employeeId).subscribe(() => {
          console.log("Update Successful");
          this.props.history.push("/");
        });
      });
    } else {
      this.setState({ username: "", password: "" });
    }
  };
  componentDidMount() {
    EmployeeService.getEmployee().subscribe((employees: IEmployee[]) => {
      this.setState({ employeeList: employees });
    });
  }
  render() {
    return (
      <div className="d-flex justify-content-center">
        <form onSubmit={this.loginUser} className="col-md-4">
          <div
            style={{ marginTop: "5em", padding: "4em" }}
            className="rounded-lg shadow-sm border bg-secondary text-white"
          >
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter username"
                value={this.state.username}
                onChange={this.loadUsername}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.loadPassword}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-dark px-4 mt-2">
                Login
              </button>
            </div>
            <hr className="bg-white" />
            <div className="text-center">
              <span>
                New to here?{" "}
                <Link to="/register" className="text-white">
                  Register
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginComponent);
