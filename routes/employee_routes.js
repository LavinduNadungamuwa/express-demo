const  express = require('express');
const router = express.Router();

const {saveEmployee} = require('../controller/employee_controller');
const {getEmployees} = require('../controller/employee_controller');
const {updateEmployee} = require('../controller/employee_controller');

router.post('/save', saveEmployee);
router.put('/update', updateEmployee);
router.get('/all', getEmployees);

module.exports = router;