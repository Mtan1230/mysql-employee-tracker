async function connect() {
    // get the client
    const mysql = require('mysql2/promise');
    // create the connection
    const con = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'employee_db'
        }
    );
    console.log(`Connected to the employee_db database.`);

    con.viewAllDepartments = async function () {
        const [rows] = await this.execute(`SELECT * FROM department`);
        console.table(rows);
    }

    con.viewAllRoles = async function () {
        const [rows] = await this.execute(`SELECT * FROM role`);
        console.table(rows);
    }

    con.viewAllEmployees = async function () {
        const [rows] = await this.execute(
            `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
                    CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id
            ORDER BY e.id;`);
        console.table(rows);
    }

    con.addDepartment = async function (name) {
        const [rows] = await this.execute(`INSERT INTO department (name) VALUES ('${name}')`);
        console.log(`Added ${name} to the database`);
    }

    

    return con;
}

exports.connect = connect;