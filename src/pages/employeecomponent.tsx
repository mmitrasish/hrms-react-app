import * as React from "react";
import { IEmployee } from "../models/employee";
import EmployeeService from "../services/employeeservice";
import EmployeeRow from "../components/employeerow";

interface IEmployeeState {
  employeeList: IEmployee[];
}

export default class EmployeeComponent extends React.Component<
  {},
  IEmployeeState
> {
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
                </tr>
              </thead>
              <tbody>
                {this.state.employeeList.map((employee: IEmployee) => (
                  <EmployeeRow
                    employee={employee}
                    role={"employee"}
                    key={employee.employeeId}
                    activateEmployee={(employeeId, activate) => {}}
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
