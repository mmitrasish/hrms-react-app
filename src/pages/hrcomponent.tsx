import * as React from "react";
import { IEmployee } from "../models/employee";
import EmployeeService from "../services/employeeservice";
import EmployeeTable from "../components/employeetable";
import ProfileComponent from "./profilecomponent";

interface IHRState {
  employeeList: IEmployee[];
  user: IEmployee;
}

export default class HRComponent extends React.Component<{}, IHRState> {
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

  updateEmployeePerformance = (employeeId: number, performance: string) => {
    let selectedEmployee = this.state.employeeList.filter(
      employee => employee.employeeId === employeeId
    )[0];
    let updatedEmployees: IEmployee[] = [];
    this.state.employeeList.forEach(employee => {
      if (employee === selectedEmployee) {
        employee.isPunctual = performance === "Punctual";
        employee.isTardy = performance === "Tardy";
        employee.isAbsentee = performance === "Absentee";
      }
      updatedEmployees.push(employee);
    });
    selectedEmployee.isPunctual = performance === "Punctual";
    selectedEmployee.isTardy = performance === "Tardy";
    selectedEmployee.isAbsentee = performance === "Absentee";
    EmployeeService.updateEmployee(selectedEmployee, employeeId).subscribe(
      () => {
        console.log(
          "Employee " + selectedEmployee.username + " Performance added..."
        );
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
              role={"HR"}
              activateEmployee={(employeeId, activate) => {}}
              employeePerformance={this.updateEmployeePerformance}
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
