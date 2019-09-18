import * as React from "react";
import { IEmployee } from "../../models/employee";
import EmployeeService from "../../services/employeeservice";
import EmployeeTable from "../../components/employeetable";
import ProfileComponent from "./profilecomponent";
import Card from "../../components/cardcomponent";
import Chart from "../../components/chartcomponent";

interface IHRState {
  employeeList: IEmployee[];
  punctualEmployeeList: IEmployee[];
  tardyEmployeeList: IEmployee[];
  absenteeEmployeeList: IEmployee[];
  user: IEmployee;
  isLoaded: boolean;
}

export default class HRComponent extends React.Component<{}, IHRState> {
  constructor(props: any) {
    super(props);
    this.state = {
      employeeList: [],
      punctualEmployeeList: [],
      tardyEmployeeList: [],
      absenteeEmployeeList: [],
      user: {
        _id: "",
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
      },
      isLoaded: false
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
        punctualEmployeeList: employees.filter(employee => employee.isPunctual),
        tardyEmployeeList: employees.filter(employee => employee.isTardy),
        absenteeEmployeeList: employees.filter(employee => employee.isAbsentee),
        user: employees.filter(
          employee =>
            employee.username === localStorage.getItem("loggedUsername")
        )[0],
        isLoaded: true
      });
    });
  }

  updateEmployeePerformance = (_id: string, performance: string) => {
    let selectedEmployee = this.state.employeeList.filter(
      employee => employee._id === _id
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
    EmployeeService.updateEmployee(selectedEmployee, _id).subscribe(() => {
      console.log(
        "Employee " + selectedEmployee.username + " Performance added..."
      );
      this.setState({ employeeList: updatedEmployees });
    });
  };

  render() {
    return (
      <div className="HR">
        {this.state.isLoaded ? (
          this.state.user.isActivated ? (
            <div className="container my-4">
              <div
                className="row container-fluid mb-4 d-flex justify-content-between"
                style={{ padding: 0 }}
              >
                <div className="col-md-3 col-sm-6 py-3">
                  <Card
                    title={"Employees"}
                    body={this.state.employeeList.length}
                  />
                </div>
                <div className="col-md-3 col-sm-6 py-3">
                  <Card
                    title={"Punctual"}
                    body={this.state.punctualEmployeeList.length}
                  />
                </div>
                <div className="col-md-3 col-sm-6 py-3">
                  <Card
                    title={"Tardy"}
                    body={this.state.tardyEmployeeList.length}
                  />
                </div>
                <div className="col-md-3 col-sm-6 py-3">
                  <Card
                    title={"Absentee"}
                    body={this.state.absenteeEmployeeList.length}
                  />
                </div>
              </div>
              <div
                className="row container-fluid mb-4 d-flex justify-content-between"
                style={{ padding: 0 }}
              >
                <div className="col-md-6 col-sm-6 py-3">
                  <Chart
                    labels={["Active", "Inactive"]}
                    chartData={[
                      this.state.employeeList.filter(emp => emp.isActive)
                        .length,
                      this.state.employeeList.filter(emp => !emp.isActive)
                        .length
                    ]}
                    color={["#28A745", "#DC3545"]}
                    title={"Employee Presence"}
                  />
                </div>
                <div className="col-md-6 col-sm-6 py-3">
                  <Chart
                    labels={["Punctual", "Tardy", "Absentee"]}
                    chartData={[
                      this.state.punctualEmployeeList.length,
                      this.state.tardyEmployeeList.length,
                      this.state.absenteeEmployeeList.length
                    ]}
                    color={["#28A745", "#FFC107", "#DC3545"]}
                    title={"Employee Attendence"}
                  />
                </div>
              </div>
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
                You have not been activated. Contact admin and update your
                profile before activating.
              </div>
              <ProfileComponent />
            </div>
          )
        ) : null}
      </div>
    );
  }
}
