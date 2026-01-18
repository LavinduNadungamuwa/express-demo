const connection = require("../db/db_connection");

const saveEmployee = (req, res) => {
    const { name, age, salary } = req.body;
    connection.query('INSERT INTO users (name, age, salary) VALUES (?, ?, ?)', [name, age, salary], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return
        } 
        res.send('Data inserted successfully with ID: ' + results.insertId);
    });
}


const getEmployees = (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        res.json(results);
    });
}


const updateEmployee = (req, res) => {
    const { id, name, age, salary } = req.body;
    connection.query('UPDATE users SET name = ?, age = ?, salary = ? WHERE id = ?', [name, age, salary, id], (err, results) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send('Error updating data');
        }
        res.send('Data updated successfully');
    });
}
module.exports = { saveEmployee, getEmployees, updateEmployee };