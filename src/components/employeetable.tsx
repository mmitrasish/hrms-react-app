import * as React from "react";
import { IEmployee } from "../models/employee";
import EmployeeRow from "./employeerow";
interface IEmployeeTableProps {
  employeeList: IEmployee[];
  role: string;
  activateEmployee: (_id: string, activate: boolean) => void;
  employeePerformance: (_id: string, performance: string) => void;
}
interface IEmployeeTableState {
  filteredEmployeeList: IEmployee[];
}

class EmployeeTable extends React.Component<
  IEmployeeTableProps,
  IEmployeeTableState
> {
  constructor(props: IEmployeeTableProps) {
    super(props);
    this.state = {
      filteredEmployeeList: this.props.employeeList
    };
  }
  loadFilterText = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    this.props.role === "Admin"
      ? this.setState({
          filteredEmployeeList: this.props.employeeList.filter(
            emp =>
              emp.username
                .toLowerCase()
                .indexOf(event.target.value.toLowerCase()) !== -1
          )
        })
      : this.setState({
          filteredEmployeeList: this.props.employeeList.filter(
            emp =>
              emp.firstname
                .toLowerCase()
                .indexOf(event.target.value.toLowerCase()) !== -1
          )
        });
  };
  render() {
    return (
      <div className="card shadow">
        <div className="card-header bg-secondary text-white">
          <b>All Employees</b>
        </div>
        <div className="card-body table-responsive" style={{ padding: 0 }}>
          <div className="p-3 d-flex align-items-center">
            <span className="mr-4">
              Filtered by{" "}
              {this.props.role === "Admin" ? "username" : "firstname"}:
            </span>{" "}
            <input
              type="text"
              name="filter"
              id="filter"
              placeholder="Enter name"
              className="form-control"
              style={{ width: 300 }}
              onChange={this.loadFilterText}
            />
          </div>
          <table
            className="table table-striped table-borderless"
            style={{ margin: 0 }}
          >
            <thead>
              <tr>
                <th scope="col">EmployeeId</th>
                <th scope="col">
                  {this.props.role === "Admin" ? "Username" : "Firstname"}
                </th>
                <th scope="col">
                  {this.props.role === "Admin" ? "Password" : "Lastname"}
                </th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filteredEmployeeList.map((employee: IEmployee) => (
                <EmployeeRow
                  employee={employee}
                  role={this.props.role}
                  key={employee._id}
                  activateEmployee={this.props.activateEmployee}
                  employeePerformance={this.props.employeePerformance}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default EmployeeTable;
