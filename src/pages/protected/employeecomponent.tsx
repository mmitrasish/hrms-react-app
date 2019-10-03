import * as React from "react";
import { IEmployee } from "../../models/employee";
import EmployeeService from "../../services/employeeservice";
import ProfileComponent from "./profilecomponent";

interface IEmployeeState {
  employeeList: IEmployee[];
  activeEmployeeList: IEmployee[];
  inactiveEmployeeList: IEmployee[];
  user: IEmployee;
  isLoaded: boolean;
}

export default class EmployeeComponent extends React.Component<
  {},
  IEmployeeState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      employeeList: [],
      activeEmployeeList: [],
      inactiveEmployeeList: [],
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
      },
      isLoaded: false
    };
  }
  componentDidMount() {
    EmployeeService.getEmployee().subscribe((employees: IEmployee[]) => {
      this.setState({
        employeeList: employees.filter(
          employee =>
            employee.firstname !== undefined &&
            employee.lastname !== undefined &&
            employee.isActivated
        ),
        activeEmployeeList: employees.filter(employee => employee.isActive),
        inactiveEmployeeList: employees.filter(employee => !employee.isActive),
        user: employees.filter(
          employee =>
            employee.username === localStorage.getItem("loggedUsername")
        )[0],
        isLoaded: true
      });
    });
  }

  render() {
    return (
      <div className="Employee">
        {this.state.isLoaded ? (
          this.state.user.isActivated ? (
            <div className="container-fluid">
              <ProfileComponent />
            </div>
          ) : (
            <div className="container-fluid">
              <div className="alert alert-danger mx-5 mt-4" role="alert">
                You have not been activated. Contact admin and update your
                profile before activating.
              </div>
              <ProfileComponent />
            </div>
          )
        ) : null}
      </div>
    );
  }
}
