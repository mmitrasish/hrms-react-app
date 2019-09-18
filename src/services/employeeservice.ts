import { Observable, defer, from } from "rxjs";

import { IEmployee } from "../models/employee";

class EmployeeService {
  public getEmployee = (): Observable<IEmployee[]> => {
    return defer(() =>
      // for lazy loading
      {
        return from<Promise<IEmployee[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3500/employees`)
            .then(r => r.json())
            .then(this.mapToEmployees)
        );
      }
    );
  };

  public postEmployee = (employee: any): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/employees`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "POST",
          body: JSON.stringify(employee)
        })
      );
    });
  };

  public updateEmployee = (update: any, id: string): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/employees/${id}`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "PUT",
          body: JSON.stringify(update)
        })
      );
    });
  };

  private mapToEmployees = (employee: IEmployee[]): IEmployee[] => {
    return employee.map(this.mapToEmployee);
  };

  private mapToEmployee(employee: IEmployee): IEmployee {
    return {
      _id: employee._id,
      username: employee.username,
      password: employee.password,
      firstname: employee.firstname,
      lastname: employee.lastname,
      role: employee.role,
      isActive: employee.isActive,
      isActivated: employee.isActivated,
      isTardy: employee.isTardy,
      isPunctual: employee.isPunctual,
      isAbsentee: employee.isAbsentee
    };
  }
}

export default new EmployeeService();
