import * as React from "react";
import { IEmployee } from "../models/employee";
import EmployeeService from "../services/employeeservice";
import EmployeeTable from "../components/employeetable";
import ProfileComponent from "./profilecomponent";

interface IAdminState {
  employeeList: IEmployee[];
  user: IEmployee;
}

export default class AdminComponent extends React.Component<{}, IAdminState> {
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
        employeeList: employees,
        user: employees.filter(
          employee =>
            employee.username === localStorage.getItem("loggedUsername")
        )[0]
      });
    });
  }
  activateEmployee = (employeeId: number, activate: boolean) => {
    let selectedEmployee = this.state.employeeList.filter(
      employee => employee.employeeId === employeeId
    )[0];
    selectedEmployee.isActivated = activate;
    let updatedEmployees: IEmployee[] = [];
    this.state.employeeList.forEach(employee => {
      if (employee === selectedEmployee) {
        employee.isActivated = activate;
      }
      updatedEmployees.push(employee);
    });
    EmployeeService.updateEmployee(selectedEmployee, employeeId).subscribe(
      () => {
        const activateString = activate ? " activated" : " deactivate";
        console.log("Employee " + selectedEmployee.username + activateString);
        this.setState({ employeeList: updatedEmployees });
      }
    );
  };

  render() {
    return (
      <div className="HR">
        {this.state.user.isActivated ? (
          <div className="container pt-4">
            <EmployeeTable
              employeeList={this.state.employeeList}
              role={"Admin"}
              activateEmployee={this.activateEmployee}
              employeePerformance={(employeeId, performance) => {}}
            />
          </div>
        ) : (
          <div className="container-fluid">
            <div className="alert alert-danger mx-5 mt-4" role="alert">
              You have not been activated. Contact admin and update your profile
              before activating.
            </div>
            <ProfileComponent />{" "}
          </div>
        )}
      </div>
    );
  }
}
