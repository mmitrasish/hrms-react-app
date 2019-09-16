import * as React from "react";
import EmployeeService from "../services/employeeservice";
import { IEmployee } from "../models/employee";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface IValidateLogin {
  value: string;
  isValid: boolean;
  message: string;
}

interface ILoginState {
  username: IValidateLogin;
  password: IValidateLogin;
  employeeList: IEmployee[];
}

class LoginComponent extends React.Component<RouteComponentProps, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: {
        value: '',
        isValid: true,
        message: 'Please choose a username.'
      },
      password: {
        value: '',
        isValid: true,
        message: 'Please choose a password.'
      },
      employeeList: []
    };
  }
  loadUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: {
      value: event.target.value,
      isValid: true,
      message: 'Please choose a username.'
    } });
  };
  loadPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: {
      value: event.target.value,
      isValid: true,
      message: 'Please choose a password.'
    } });
  };
  loginUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(this.state.username.value === ''){
      this.setState({ username: {
        value: '',
        isValid: false,
        message: 'Please choose a username.'
      } });
    }else if(this.state.password.value === ''){
      this.setState({ password: {
        value: '',
        isValid: false,
        message: 'Please choose a password.'
      } });
    }else{
      let isUserPresent =
      this.state.employeeList.filter(
        employee =>
          employee.username === this.state.username.value &&
          employee.password === this.state.password.value
      ).length > 0;
    if (isUserPresent) {
      let user = this.state.employeeList.filter(
        employee =>
          employee.username === this.state.username.value &&
          employee.password === this.state.password.value
      )[0];

      user.isActive = true;
      let updateLocalStorage = new Promise((success, failure) => {
        localStorage.setItem("isLoggedIn", isUserPresent + "");
        localStorage.setItem("loggedUsername", this.state.username.value);
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
      this.setState({ username: {
        value: '',
        isValid: false,
        message: 'Username doesnot match.'
      }, password: {
        value: '',
        isValid: false,
        message: 'Password doesnot match.'
      } });
    }
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
            className="rounded-lg shadow border bg-secondary text-white"
          >
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className={"form-control " + (this.state.username.isValid ? null : 'is-invalid')}
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter username"
                value={this.state.username.value}
                onChange={this.loadUsername}
              />
              <div className="invalid-feedback">{this.state.username.message}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={"form-control " + (this.state.password.isValid ? null : 'is-invalid')}
                id="password"
                placeholder="Password"
                value={this.state.password.value}
                onChange={this.loadPassword}
              />
              <div className="invalid-feedback">{this.state.password.message}</div>
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
