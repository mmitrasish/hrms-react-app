import * as React from "react";
import { IEmployee } from "../models/employee";
interface IEmployeeRowProps {
  employee: IEmployee;
  role: string;
  activateEmployee: (employeeId: number, activate: boolean) => void;
  employeePerformance: (employeeId: number, performance: string) => void;
}
const EmployeeRow: React.FC<IEmployeeRowProps> = (props: IEmployeeRowProps) => {
  let activateEmployee = () => {
    props.activateEmployee(props.employee.employeeId, true);
  };
  let deactivateEmployee = () => {
    props.activateEmployee(props.employee.employeeId, false);
  };
  let addPerformance = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    props.employeePerformance(props.employee.employeeId, event.target.value);
  };
  return (
    <tr>
      <th scope="row">{props.employee.employeeId}</th>
      <td>
        {props.role === "Admin"
          ? props.employee.username
          : props.employee.firstname}
      </td>
      <td>
        {props.role === "Admin"
          ? props.employee.password
          : props.employee.lastname}
      </td>
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
      {props.role === "HR" ? (
        <td className="px-3 d-flex justify-content-center">
          <select
            className={
              "form-control " +
              (props.employee.isPunctual
                ? "text-success"
                : props.employee.isTardy
                ? "text-warning"
                : "text-danger")
            }
            style={{ width: "80%" }}
            onChange={addPerformance}
            value={
              props.employee.isPunctual
                ? "Punctual"
                : props.employee.isTardy
                ? "Tardy"
                : "Absentee"
            }
          >
            <option className="text-success" value="Punctual">
              Punctual
            </option>
            <option className="text-warning" value="Tardy">
              Tardy
            </option>
            <option className="text-danger" value="Absentee">
              Absentee
            </option>
          </select>
        </td>
      ) : (
        <td className="px-3 d-flex justify-content-center">
          <div
            className={
              "border rounded-lg px-4 py-1 text-center " +
              (props.employee.isPunctual
                ? "text-success border-success"
                : props.employee.isTardy
                ? "text-warning border-warning"
                : "text-danger border-danger")
            }
          >
            <b>
              {props.employee.isPunctual
                ? "Punctual"
                : props.employee.isTardy
                ? "Tardy"
                : "Absentee"}
            </b>
          </div>
        </td>
      )}
    </tr>
  );
};
export default EmployeeRow;
