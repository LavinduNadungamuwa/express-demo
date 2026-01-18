const  express = require('express');
const router = express.Router();

const {saveEmployee} = require('../controller/employee_controller');

router.post('/save', saveEmployee);

module.exports = router;