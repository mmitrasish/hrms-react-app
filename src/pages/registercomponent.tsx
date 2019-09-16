import * as React from "react";
import EmployeeService from "../services/employeeservice";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface IValidateRegister {
  value: string;
  isValid: boolean;
  message: string;
}

interface IRegisterState {
  username: IValidateRegister;
  password: IValidateRegister;
  role: IValidateRegister;
}

class RegisterComponent extends React.Component<
  RouteComponentProps,
  IRegisterState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: {
        value: "",
        isValid: true,
        message: "Please choose a username."
      },
      password: {
        value: "",
        isValid: true,
        message: "Please choose a password."
      },
      role: {
        value: "",
        isValid: true,
        message: "Please choose a role."
      }
    };
  }
  loadUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a username."
      }
    });
  };
  loadPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a password."
      }
    });
  };
  loadRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      role: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a role."
      }
    });
  };
  registerUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.username.value === "") {
      this.setState({
        username: {
          value: "",
          isValid: false,
          message: "Please choose a username."
        }
      });
    } else if (this.state.password.value === "") {
      this.setState({
        password: {
          value: "",
          isValid: false,
          message: "Please choose a password."
        }
      });
    } else if (this.state.role.value === "") {
      this.setState({
        role: {
          value: "",
          isValid: false,
          message: "Please choose a role."
        }
      });
    } else if (
      this.state.role.value.localeCompare("Admin") !== 0 &&
      this.state.role.value.localeCompare("HR") !== 0 &&
      this.state.role.value.localeCompare("Employee") !== 0
    ) {
      this.setState({
        role: {
          value: "",
          isValid: false,
          message: "Please choose a correct role."
        }
      });
    } else {
      EmployeeService.postEmployee({
        username: this.state.username.value,
        password: this.state.password.value,
        firstname: "",
        lastname: "",
        role: this.state.role.value,
        isActive: true,
        isActivated: this.state.role.value === "Admin",
        isTardy: false,
        isPunctual: true,
        isAbsentee: false
      }).subscribe(() => {
        console.log("Employee Post Done....");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedUsername", this.state.username.value);
        localStorage.setItem("loggedUserRole", this.state.role.value);
        this.props.history.push("/");
      });
    }
  };
  render() {
    return (
      <div className="d-flex justify-content-center">
        <form onSubmit={this.registerUser} className="col-md-4">
          <div
            style={{ marginTop: "5em", padding: "4em" }}
            className="rounded-lg shadow border bg-secondary text-white"
          >
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className={
                  "form-control " +
                  (this.state.username.isValid ? null : "is-invalid")
                }
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter username"
                value={this.state.username.value}
                onChange={this.loadUsername}
              />
              <div className="invalid-feedback">
                {this.state.username.message}
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={
                  "form-control " +
                  (this.state.password.isValid ? null : "is-invalid")
                }
                id="password"
                placeholder="Password"
                aria-describedby="paswordHelp"
                value={this.state.password.value}
                onChange={this.loadPassword}
              />
              <div className="invalid-feedback">
                {this.state.password.message}
              </div>
            </div>
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                className={
                  "form-control " +
                  (this.state.role.isValid ? null : "is-invalid")
                }
                id="role"
                placeholder="Your Position"
                aria-describedby="roleHelp"
                value={this.state.role.value}
                onChange={this.loadRole}
              />
              <div className="invalid-feedback">{this.state.role.message}</div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-dark px-4 mt-2">
                Register
              </button>
            </div>
            <hr className="bg-white" />
            <div className="text-center">
              <span>
                Already have an account?{" "}
                <Link to="/login" className="text-white">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(RegisterComponent);
