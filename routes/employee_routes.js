const  express = require('express');
const router = express.Router();

const {saveEmployee} = require('../controller/employee_controller');
const {getEmployees} = require('../controller/employee_controller');
const {getEmployeeById} = require('../controller/employee_controller');
const {updateEmployee} = require('../controller/employee_controller');
const {deleteEmployee} = require('../controller/employee_controller');

router.post('/save', saveEmployee);
router.put('/update', updateEmployee);
router.get('/getall', getEmployees);
router.get('/getbyid/:id', getEmployeeById);
router.delete('/delete/:id', deleteEmployee);

module.exports = router;