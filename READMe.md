# Express.js Employee Management API

A simple Express.js application with MySQL database integration for managing employee records.

## Features

- RESTful API for employee management
- MySQL database integration
- Express.js server with JSON support

## Prerequisites

- Node.js installed
- MySQL server running on port 3307
- Database: `express_db`
- Table: `employee` with columns (name, age, salary)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure database connection in `index.js`:
   ```javascript
   user: 'your_username',
   password: 'your_password',
   database: 'express_db',
   port: 3307
   ```

## Database Setup

Create the database and table:

```sql
CREATE DATABASE express_db;
USE express_db;

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    salary DECIMAL(10, 2)
);
```

## Running the Application

```bash
node index.js
```

The server will start on `http://localhost:3000`

## API Endpoints

### GET /
- **Description**: Welcome endpoint
- **Response**: "Hey Lavindu!"

### POST /save
- **Description**: Add a new employee
- **Body**:
  ```json
  {
    "name": "John Doe",
    "age": 30,
    "salary": 50000
  }
  ```
- **Response**: "Employee saved successfully"

## Technologies Used

- Express.js
- MySQL2
- Node.js

## Troubleshooting

If you encounter database connection errors:
- Verify MySQL is running on port 3307
- Check username and password credentials
- Ensure the database and table exist
- Grant proper permissions to the database user
