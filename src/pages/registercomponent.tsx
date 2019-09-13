import * as React from "react";
import EmployeeService from "../services/employeeservice";
import { Link } from "react-router-dom";

interface IRegisterState {
  username: string;
  password: string;
  role: string;
}

export default class RegisterComponent extends React.Component<
  {},
  IRegisterState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role: ""
    };
  }
  loadUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };
  loadPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };
  loadRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ role: event.target.value });
  };
  loginUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    EmployeeService.postEmployee({
      username: this.state.username,
      password: this.state.password,
      role: this.state.role
    }).subscribe(() => {
      console.log("Employee Post Done....");
    });
  };
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
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                className="form-control"
                id="role"
                placeholder="Your Position"
                value={this.state.role}
                onChange={this.loadRole}
              />
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
