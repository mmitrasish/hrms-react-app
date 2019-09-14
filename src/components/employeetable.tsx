import * as React from "react";
import { IEmployee } from "../models/employee";
import EmployeeRow from "./employeerow";
interface IEmployeeTableProps {
  employeeList: IEmployee[];
  role: string;
  activateEmployee: (employeeId: number, activate: boolean) => void;
  employeePerformance: (employeeId: number, performance: string) => void;
}
const EmployeeTable: React.FC<IEmployeeTableProps> = (
  props: IEmployeeTableProps
) => {
  return (
    <div className="card shadow">
      <div className="card-header bg-secondary text-white">
        <b>All Employees</b>
      </div>
      <div className="card-body table-responsive" style={{ padding: 0 }}>
        <table className="table table-striped" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th scope="col">EmployeeId</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {props.employeeList.map((employee: IEmployee) => (
              <EmployeeRow
                employee={employee}
                role={props.role}
                key={employee.employeeId}
                activateEmployee={props.activateEmployee}
                employeePerformance={props.employeePerformance}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default EmployeeTable;
