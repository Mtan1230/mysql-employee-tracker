const { connect } = require('./config/connection');

async function start() {
    const db = await connect();

    db.viewAllDepartments();
    db.viewAllRoles();
    db.viewAllEmployees();

    // db.addDepartment('Driver');

}

start()