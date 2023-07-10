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

    // Add custom methods

    // List methods
    con.listAllDepartments = async function () {
        const [rows] = await this.execute(`SELECT name FROM department`);
        return rows;
    }

    con.listAllManagers = async function () {
        const [rows] = await this.execute(`SELECT CONCAT(first_name, ' ', last_name) AS name
        FROM employee
        WHERE manager_id IS NULL`);
        return rows;
    }

    con.listAllRoles = async function () {
        const [rows] = await this.execute(`SELECT title FROM role`);
        return rows;
    }

    con.listAllEmployees = async function () {
        const [rows] = await this.execute(`SELECT CONCAT(e.first_name, ' ', e.last_name) AS name
        FROM employee e;`);
        return rows;
    }

    // View methods
    con.viewAllDepartments = async function () {
        const [rows] = await this.execute(`SELECT * FROM department`);
        console.table(rows);
    }

    con.viewAllRoles = async function () {
        const [rows] = await this.execute(`SELECT r.id, r.title, d.name AS department, r.salary
        FROM role r
        JOIN department d ON r.department_id = d.id`);
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
            ORDER BY e.id`);
        console.table(rows);
    }

    con.viewEmployeesByManager = async function (name) {
        const [rows] = await this.execute(
            `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary 
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
        WHERE CONCAT(m.first_name, ' ', m.last_name) = ?`, [name]);
        console.table(rows);
    }

    con.viewEmployeesByDepartment = async function (name) {
        const [rows] = await this.execute(
            `SELECT e.id, e.first_name, e.last_name, r.title, r.salary,
            CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
        WHERE d.name = ?`, [name]);
        console.table(rows);
    }

    con.viewBudge = async function () {
        const [rows] = await this.execute(
            `SELECT d.name AS department, SUM(r.salary) AS total_salary
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        GROUP BY d.name`);
        console.table(rows);
    }

    // Add methods
    con.addDepartment = async function (name) {
        await this.execute(`INSERT INTO department (name) VALUES (?)`, [name]);
        console.log(`Added Department: ${name} to the database`);
    }

    con.addRole = async function (title, salary, department) {
        const [rows] = await this.execute(`SELECT id
        FROM department
        WHERE name = ?`, [department]);

        await this.execute(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, rows[0].id]);
        console.log(`Added Role: ${title} to the database`);
    }

    con.addEmployee = async function (first_name, last_name, role, manager) {
        let manager_id;
        if (manager === 'null') {
            manager_id = null;
        } else {
            const [rows] = await this.execute(`SELECT e.id
            FROM employee e
            WHERE CONCAT(e.first_name, ' ', e.last_name) = ?`, [manager]);
            manager_id = rows[0].id;
        }

        const [rows] = await this.execute(`SELECT id
        FROM role
        WHERE title = ?`, [role]);

        await this.execute(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first_name, last_name, rows[0].id, manager_id]);

        console.log(`Added Employee: ${first_name} ${last_name} to the database`);
    }

    // Update methods
    con.updateRole = async function (employee, role) {
        const [roleRows] = await this.execute(`SELECT id
        FROM role
        WHERE title = ?`, [role]);

        await this.execute(`UPDATE employee
        SET role_id = ?
        WHERE CONCAT(first_name, ' ', last_name) = ?`, [roleRows[0].id, employee]);

        console.log(`Updated Employee: ${employee}'s role to ${role}`);
    }

    con.updateManager = async function (employee, manager) {
        let manager_id;
        if (manager === 'null') {
            manager_id = null;
        } else {
            const [rows] = await this.execute(`SELECT e.id
            FROM employee e
            WHERE CONCAT(e.first_name, ' ', e.last_name) = ?`, [manager]);
            manager_id = rows[0].id;
        }

        await this.execute(`UPDATE employee
        SET manager_id = ?
        WHERE CONCAT(first_name, ' ', last_name) = ?`, [manager_id, employee]);

        console.log(`Updated Employee: ${employee}'s manager to ${manager}`);
    }

    // Delete methods
    con.deleteDepartment = async function (department) {
        await this.execute(`DELETE FROM department
        WHERE name = ?`, [department]);
        console.log(`Deleted Department: ${department}`);
    }

    con.deleteRole = async function (role) {
        await this.execute(`DELETE FROM role
        WHERE title = ?`, [role]);
        console.log(`Deleted Role: ${role}`);
    }

    con.deleteEmployee = async function (employee) {
        await this.execute(`DELETE FROM employee
        WHERE CONCAT(first_name, ' ', last_name) = ?`, [employee]);
        console.log(`Deleted Employee: ${employee}`);
    }

    return con;
}

exports.connect = connect;