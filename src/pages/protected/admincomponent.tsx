import * as React from "react";
import { IEmployee } from "../../models/employee";
import EmployeeService from "../../services/employeeservice";
import EmployeeTable from "../../components/employeetable";
import ProfileComponent from "./profilecomponent";
import Card from "../../components/cardcomponent";
import Chart from "../../components/chartcomponent";
import Toast from "../../components/toastcomponent";
import $ from "jquery";

interface IAdminState {
  employeeList: IEmployee[];
  activeEmployeeList: IEmployee[];
  inactiveEmployeeList: IEmployee[];
  activatedEmployeeList: IEmployee[];
  user: IEmployee;
  isLoaded: boolean;
  toastMessage: string;
  toastTitle: string;
}

export default class AdminComponent extends React.Component<{}, IAdminState> {
  constructor(props: any) {
    super(props);
    this.state = {
      employeeList: [],
      activeEmployeeList: [],
      inactiveEmployeeList: [],
      activatedEmployeeList: [],
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
      isLoaded: false,
      toastMessage: "",
      toastTitle: ""
    };
  }
  componentDidMount() {
    EmployeeService.getEmployee().subscribe((employees: IEmployee[]) => {
      this.setState({
        employeeList: employees,
        activeEmployeeList: employees.filter(employee => employee.isActive),
        inactiveEmployeeList: employees.filter(employee => !employee.isActive),
        activatedEmployeeList: employees.filter(
          employee => employee.isActivated
        ),
        user: employees.filter(
          employee =>
            employee.username === localStorage.getItem("loggedUsername")
        )[0],
        isLoaded: true
      });
    });
  }
  activateEmployee = (_id: string, activate: boolean) => {
    let selectedEmployee = this.state.employeeList.filter(
      employee => employee._id === _id
    )[0];
    selectedEmployee.isActivated = activate;
    let updatedEmployees: IEmployee[] = [];
    this.state.employeeList.forEach(employee => {
      if (employee === selectedEmployee) {
        employee.isActivated = activate;
      }
      updatedEmployees.push(employee);
    });
    EmployeeService.updateEmployee(selectedEmployee, _id).subscribe(() => {
      const activateString = activate ? " activated" : " deactivate";
      console.log("Employee " + selectedEmployee.username + activateString);
      this.setState(
        {
          employeeList: updatedEmployees,
          toastMessage:
            "Employee " + selectedEmployee.username + " is " + activateString,
          toastTitle: "Activated"
        },
        () => {
          ($(".toast") as any).toast("show");
        }
      );
    });
  };

  render() {
    return (
      <div className="HR">
        <Toast
          message={this.state.toastMessage}
          title={this.state.toastTitle}
        />
        {this.state.isLoaded ? (
          this.state.user.isActivated ? (
            <div className="container my-4">
              <div
                className="row container-fluid mb-4 d-flex justify-content-between"
                style={{ padding: 0 }}
              >
                <div className="col-md-3 col-sm-6 py-3">
                  <Card title={"Users"} body={this.state.employeeList.length} />
                </div>
                <div className="col-md-3 col-sm-6 py-3">
                  <Card
                    title={"Active"}
                    body={this.state.activeEmployeeList.length}
                  />
                </div>
                <div className="col-md-3 col-sm-6 py-3">
                  <Card
                    title={"Inactive"}
                    body={this.state.inactiveEmployeeList.length}
                  />
                </div>
                <div className="col-md-3 col-sm-6 py-3">
                  <Card
                    title={"Activated"}
                    body={this.state.activatedEmployeeList.length}
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
                      this.state.activeEmployeeList.length,
                      this.state.inactiveEmployeeList.length
                    ]}
                    color={["#28A745", "#DC3545"]}
                    title={"Employee Presence"}
                  />
                </div>
                <div className="col-md-6 col-sm-6 py-3">
                  <Chart
                    labels={["Punctual", "Tardy", "Absentee"]}
                    chartData={[
                      this.state.employeeList.filter(emp => emp.isPunctual)
                        .length,
                      this.state.employeeList.filter(emp => emp.isTardy).length,
                      this.state.employeeList.filter(emp => emp.isAbsentee)
                        .length
                    ]}
                    color={["#28A745", "#FFC107", "#DC3545"]}
                    title={"Employee Attendence"}
                  />
                </div>
              </div>
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
                You have not been activated. Contact admin and update your
                profile before activating.
              </div>
              <ProfileComponent />{" "}
            </div>
          )
        ) : null}
        {}
      </div>
    );
  }
}
