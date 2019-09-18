const employeeRepository = require('../repository/employeeRepository')
module.exports = (app) => {
    app.get('/employees', (req, res) => {
        employeeRepository.getAllEmployee().then(employees => res.json(employees))
    })
    app.get('/employees/:id', (req, res) => {
        employeeRepository.getEmployeeById(req.params.id).then(employee => res.json(employee[0]))
    })
    app.post('/employees', (req, res) => {
        employeeRepository.insertEmployee(req.body).then(employee => res.json(employee)).catch(err => console.log(err))
    })
    app.delete('/employees/:id', (req, res) => {
        employeeRepository.deleteEmployee(req.params.id).then(employee => res.json(employee));
    })
    app.put('/employees/:id', (req, res) => {
        employeeRepository.updateEmployee(req.params.id, req.body).then(employee => res.json(employee));
    })


}