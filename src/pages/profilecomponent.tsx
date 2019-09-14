import * as React from "react";
import EmployeeService from "../services/employeeservice";
import { IEmployee } from "../models/employee";

interface IProfileState {
  firstname: string;
  lastname: string;
  role: string;
  user: IEmployee;
}

class ProfileComponent extends React.Component<{}, IProfileState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      role: "",
      user: {
        employeeId: 0,
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        role: "",
        isActive: false,
        isActivated: false,
        isTardy: false,
        isPunctual: false,
        isAbsentee: false
      }
    };
  }

  componentDidMount() {
    EmployeeService.getEmployee().subscribe((employees: IEmployee[]) => {
      const employee = employees.filter(
        employee => employee.username === localStorage.getItem("loggedUsername")
      )[0];
      this.setState({
        user: employee,
        firstname: employee.firstname,
        lastname: employee.lastname,
        role: employee.role
      });
    });
  }

  loadFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ firstname: event.target.value });
  };
  loadLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ lastname: event.target.value });
  };
  loadRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ role: event.target.value });
  };

  editUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let employee = this.state.user;
    employee.firstname = this.state.firstname;
    employee.lastname = this.state.lastname;
    employee.role = this.state.role;
    EmployeeService.updateEmployee(employee, employee.employeeId).subscribe(
      () => {
        console.log(employee);
        console.log("Employee profile updated...");
      }
    );
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <form onSubmit={this.editUser} className="col-md-4">
          <div
            style={{ marginTop: "4em", padding: "4em" }}
            className="rounded-lg shadow border bg-secondary text-white"
          >
            <div className="form-group">
              <label>Firstname</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                aria-describedby="firstnameHelp"
                placeholder="Enter first name"
                value={this.state.firstname}
                onChange={this.loadFirstname}
              />
            </div>
            <div className="form-group">
              <label>Lastname</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Enter last name"
                value={this.state.lastname}
                onChange={this.loadLastname}
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
                Edit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default ProfileComponent;
