const Employee = require('../model/employee');
class EmployeesRepository {
    insertEmployee(employee) {
        console.log(employee)
        return Employee.create(employee).then(emp => emp).catch(error => console.log(error))
    }
    getAllEmployee() {
        return Employee.find({}).then(employees => employees)
    }
    getEmployeeById(id) {
        return Employee.find({
            '_id': id
        }).then(employee => employee)
    }
    deleteEmployee(id) {
        return Employee.deleteOne({
            '_id': id
        }).then(employee => employee)
    }
    updateEmployee(id, employee) {
        return Employee.findOneAndUpdate({
            '_id': id
        }, {
            $set: employee
        }).then(employee => employee)
    }
}
module.exports = new EmployeesRepository();