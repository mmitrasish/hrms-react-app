import * as React from "react";
import { IEmployee } from "../models/employee";
import EmployeeService from "../services/employeeservice";
import ProfileComponent from "./profilecomponent";
import EmployeeTable from "../components/employeetable";

interface IEmployeeState {
  employeeList: IEmployee[];
  user: IEmployee;
}

export default class EmployeeComponent extends React.Component<
  {},
  IEmployeeState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      employeeList: [],
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
      this.setState({
        employeeList: employees.filter(
          employee =>
            employee.firstname !== undefined &&
            employee.lastname !== undefined &&
            employee.isActivated
        ),
        user: employees.filter(
          employee =>
            employee.username === localStorage.getItem("loggedUsername")
        )[0]
      });
    });
  }

  render() {
    return (
      <div className="Employee">
        {this.state.user.isActivated ? (
          <div className="container p-4">
            <EmployeeTable
              employeeList={this.state.employeeList}
              role={"Employee"}
              activateEmployee={(employeeId, activate) => {}}
              employeePerformance={(employeeId, performance) => {}}
            />
          </div>
        ) : (
          <div className="container-fluid">
            <div className="alert alert-danger mx-5 mt-4" role="alert">
              You have not been activated. Contact admin and update your profile
              before activating.
            </div>
            <ProfileComponent />
          </div>
        )}
      </div>
    );
  }
}
