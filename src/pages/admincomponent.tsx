import * as React from "react";
import { IEmployee } from "../models/employee";
import EmployeeService from "../services/employeeservice";
import EmployeeRow from "../components/employeerow";

interface IAdminState {
  employeeList: IEmployee[];
}

export default class AdminComponent extends React.Component<{}, IAdminState> {
  constructor(props: any) {
    super(props);
    this.state = {
      employeeList: []
    };
  }
  componentDidMount() {
    EmployeeService.getEmployee().subscribe((employees: IEmployee[]) => {
      this.setState({ employeeList: employees });
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
      <div className="container pt-4">
        <div className="card">
          <div className="card-header bg-secondary text-white">
            <b>All Employees</b>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="table table-striped" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th scope="col">EmployeeId</th>
                  <th scope="col">Username</th>
                  <th scope="col">Password</th>
                  <th scope="col">Role</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.employeeList.map((employee: IEmployee) => (
                  <EmployeeRow
                    employee={employee}
                    role={"Admin"}
                    key={employee.employeeId}
                    activateEmployee={this.activateEmployee}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
