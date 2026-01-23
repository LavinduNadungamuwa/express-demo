const connection = require("../db/db_connection");

const saveEmployee = (req, res) => {
    const { name, age, salary } = req.body;
    connection.query('INSERT INTO employee (name, age, salary) VALUES (?, ?, ?)', [name, age, salary], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return
        } 
        res.send('Data inserted successfully with ID: ' + results.insertId);
    });
}


const getEmployees = (req, res) => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        res.json(results);
    });
}


const updateEmployee = (req, res) => {
    const { id, name, age, salary } = req.body;
    
    // Check if the employee exists
    connection.query('SELECT * FROM employee WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error checking employee:', err);
            return res.status(500).send('Error checking employee');
        }
        
        // If no employee found with this ID
        if (results.length === 0) {
            return res.status(404).send('Employee with ID ' + id + ' does not exist in database');
        }
        
        // Employee exists, proceed with update
        connection.query('UPDATE employee SET name = ?, age = ?, salary = ? WHERE id = ?', [name, age, salary, id], (err, updateResults) => {
            if (err) {
                console.error('Error updating data:', err);
                return res.status(500).send('Error updating data');
            }
            res.send('Data updated successfully');
        });
    });
}

const deleteEmployee = (req, res) => {
    const { id } = req.params;
    
    // Check if the employee exists
    connection.query('SELECT * FROM employee WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error checking employee:', err);
            return res.status(500).send('Error checking employee');
        }
        
        // If no employee found with this ID
        if (results.length === 0) {
            return res.status(404).send('Employee with ID ' + id + ' does not exist in database');
        }
        
        // Employee exists, proceed with delete
        connection.query('DELETE FROM employee WHERE id = ?', [id], (err, deleteResults) => {
            if (err) {
                console.error('Error deleting data:', err);
                return res.status(500).send('Error deleting data');
            }
            res.send('Employee with ID ' + id + ' deleted successfully');
        });
    });
}

module.exports = { saveEmployee, getEmployees, updateEmployee, deleteEmployee };