import * as React from "react";
import EmployeeService from "../../services/employeeservice";
import { IEmployee } from "../../models/employee";
import $ from "jquery";
import Toast from "../../components/toastcomponent";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface IValidateProfile {
  value: string;
  isValid: boolean;
  message: string;
}

interface IProfileState {
  firstname: IValidateProfile;
  lastname: IValidateProfile;
  role: IValidateProfile;
  user: IEmployee;
}

class ProfileComponent extends React.Component<RouteComponentProps, IProfileState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      firstname: {
        value: "",
        isValid: true,
        message: "Please choose a firstname."
      },
      lastname: {
        value: "",
        isValid: true,
        message: "Please choose a lastname."
      },
      role: {
        value: "",
        isValid: true,
        message: "Please choose a role."
      },
      user: {
        _id: "",
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
        firstname: {
          value: employee.firstname,
          isValid: true,
          message: "Please choose a firstname."
        },
        lastname: {
          value: employee.lastname,
          isValid: true,
          message: "Please choose a lastname."
        },
        role: {
          value: employee.role,
          isValid: true,
          message: "Please choose a role."
        }
      });
    });
  }

  loadFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      firstname: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a firstname."
      }
    });
  };
  loadLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      lastname: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a lastname."
      }
    });
  };
  loadRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      role: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a role."
      }
    });
  };

  editUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.firstname.value === "") {
      this.setState({
        firstname: {
          value: "",
          isValid: false,
          message: "Please choose a firstname."
        }
      });
    } else if (this.state.lastname.value === "") {
      this.setState({
        lastname: {
          value: "",
          isValid: false,
          message: "Please choose a lastname."
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
    } else {
      let employee = this.state.user;
      employee.firstname = this.state.firstname.value;
      employee.lastname = this.state.lastname.value;
      employee.role = this.state.role.value;
      EmployeeService.updateEmployee(employee, employee._id).subscribe(() => {
        console.log(employee);
        console.log("Employee profile updated...");
        ($(".toast") as any).toast("show");
        this.props.history.push("/dashboard");
      });
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <Toast
          message={"You have updated your profile"}
          title={"Profile Updated"}
        />
        <form onSubmit={this.editUser} className="col-md-4">
          <div
            style={{ marginTop: "4em", padding: "4em" }}
            className="rounded-lg shadow border bg-secondary text-white"
          >
            <div className="form-group">
              <label>Firstname</label>
              <input
                type="text"
                className={
                  "form-control " +
                  (this.state.firstname.isValid ? null : "is-invalid")
                }
                id="firstname"
                aria-describedby="firstnameHelp"
                placeholder="Enter first name"
                value={this.state.firstname.value}
                onChange={this.loadFirstname}
              />
              <div className="invalid-feedback">
                {this.state.firstname.message}
              </div>
            </div>
            <div className="form-group">
              <label>Lastname</label>
              <input
                type="text"
                className={
                  "form-control " +
                  (this.state.lastname.isValid ? null : "is-invalid")
                }
                id="lastname"
                placeholder="Enter last name"
                value={this.state.lastname.value}
                onChange={this.loadLastname}
              />
              <div className="invalid-feedback">
                {this.state.lastname.message}
              </div>
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                className={
                  "form-control " +
                  (this.state.role.isValid ? null : "is-invalid")
                }
                id="role"
                aria-describedby="roleHelp"
                value={this.state.role.value}
                onChange={this.loadRole}
              >
                <option value="Admin">Admin</option>
                <option value="HR">HR</option>
                <option value="Employee">Employee</option>
              </select>
              <div className="invalid-feedback">{this.state.role.message}</div>
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
export default withRouter(ProfileComponent);
