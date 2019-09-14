import * as React from "react";
import { IEmployee } from "../models/employee";
interface IEmployeeRowProps {
  employee: IEmployee;
  role: string;
  activateEmployee: (employeeId: number, activate: boolean) => void;
}
const EmployeeRow: React.FC<IEmployeeRowProps> = (props: IEmployeeRowProps) => {
  let activateEmployee = () => {
    props.activateEmployee(props.employee.employeeId, true);
  };
  let deactivateEmployee = () => {
    props.activateEmployee(props.employee.employeeId, false);
  };
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
            <button className="btn btn-success" onClick={activateEmployee}>
              Activate
            </button>
          ) : (
            <button className="btn btn-danger" onClick={deactivateEmployee}>
              Deactivate
            </button>
          )}
        </td>
      ) : null}
    </tr>
  );
};
export default EmployeeRow;
