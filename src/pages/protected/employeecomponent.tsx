import * as React from "react";
import { IEmployee } from "../../models/employee";
import EmployeeService from "../../services/employeeservice";
import ProfileComponent from "./profilecomponent";
import EmployeeTable from "../../components/employeetable";
import Card from "../../components/cardcomponent";
import Chart from "../../components/chartcomponent";

interface IEmployeeState {
  employeeList: IEmployee[];
  activeEmployeeList: IEmployee[];
  inactiveEmployeeList: IEmployee[];
  user: IEmployee;
  isLoaded: boolean;
}

export default class EmployeeComponent extends React.Component<
  {},
  IEmployeeState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      employeeList: [],
      activeEmployeeList: [],
      inactiveEmployeeList: [],
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
        activeEmployeeList: employees.filter(employee => employee.isActive),
        inactiveEmployeeList: employees.filter(employee => !employee.isActive),
        user: employees.filter(
          employee =>
            employee.username === localStorage.getItem("loggedUsername")
        )[0],
        isLoaded: true
      });
    });
  }

  render() {
    return (
      <div className="Employee">
        {this.state.isLoaded ? (
          this.state.user.isActivated ? (
            <div className="container p-4">
              <div className="row container-fluid mb-4" style={{ padding: 0 }}>
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
                role={"Employee"}
                activateEmployee={(employeeId, activate) => {}}
                employeePerformance={(employeeId, performance) => {}}
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
