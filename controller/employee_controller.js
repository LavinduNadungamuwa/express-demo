const connection = require("../db/db_connection");
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Files will be saved in 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to accept only certain file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images (jpeg, jpg, png) and documents (pdf, doc, docx) are allowed!'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
    fileFilter: fileFilter
});

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


const getEmployeeById = (req, res) => {
    const { id } = req.params;
    
    connection.query('SELECT * FROM employee WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        
        // If no employee found with this ID
        if (results.length === 0) {
            return res.status(404).send('Employee with ID ' + id + ' does not exist in database');
        }
        
        res.json(results[0]);
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

const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    
    res.json({
        message: 'File uploaded successfully',
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        path: req.file.path
    });
}

module.exports = { saveEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee, uploadFile, upload };