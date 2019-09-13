import * as React from "react";
import { IEmployee } from "../models/employee";
interface IEmployeeRowProps {
  employee: IEmployee;
  role: string;
}
const EmployeeRow: React.FC<IEmployeeRowProps> = (props: IEmployeeRowProps) => {
  return (
    <tr>
      <th scope="row">{props.employee.employeeId}</th>
      <td>{props.employee.username}</td>
      <td>{props.employee.password}</td>
      <td>{props.employee.role}</td>

      <td className="px-3">
        {props.employee.isActive ? (
          <div className="text-success border border-success rounded-lg p-1 text-center">
            <b>Active</b>
          </div>
        ) : (
          <div className="text-danger border border-danger rounded-lg p-1 text-center">
            <b>Inactive</b>
          </div>
        )}
      </td>
      {props.role === "Admin" ? (
        <td className="px-3 text-center">
          {!props.employee.isActivated ? (
            <button className="btn btn-success">Activate</button>
          ) : (
            <button className="btn btn-danger">Deactivate</button>
          )}
        </td>
      ) : null}
    </tr>
  );
};
export default EmployeeRow;
