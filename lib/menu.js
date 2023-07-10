const inquirer = require('inquirer');

// Add inquirer-tree-prompt plugin
const TreePrompt = require('inquirer-tree-prompt');

// Register plugin
inquirer.registerPrompt('tree', TreePrompt);

const { connect } = require('./connection');

// Main menu
async function main() {
    // Create connection
    const db = await connect();

    // Load data from database
    const managers = await db.listAllManagers();
    const departments = await db.listAllDepartments();
    const roles = await db.listAllRoles();
    const employees = await db.listAllEmployees();

    // Map data from object to array
    const managerList = managers.map((manager) => manager.name);
    const departmentList = departments.map((department) => department.name);
    const roleList = roles.map((role) => role.title);
    const employeeList = employees.map((employee) => employee.name);

    // User menu tree
    const options = {
        type: 'tree',
        name: 'option',
        message: 'What would you like to do?',
        validate: (value) => !!value,
        tree: [
            {
                name: '----- View -----',
                value: '',
                open: false,
                children: [
                    'View All Departments',
                    'View All Roles',
                    {
                        name: 'View All Employees',
                        value: '',
                        open: false,
                        children: [
                            {
                                name: 'By Default',
                                value: 'View All Employees By Default'
                            },
                            {
                                name: 'By Manager',
                                value: '',
                                open: false,
                                children: managers,
                            },
                            {
                                name: 'By Department',
                                value: '',
                                open: false,
                                children: departments,
                            }
                        ]
                    },
                    'View Budge'
                ]
            },
            {
                name: '----- Add -----',
                value: '',
                open: false,
                children: [
                    'Add Department',
                    'Add Role',
                    'Add Employee'
                ]
            },
            {
                name: '----- Update -----',
                value: '',
                open: false,
                children: [
                    'Update Employee Role',
                    'Update Employee Manager'
                ]
            },
            {
                name: '----- Delete -----',
                value: '',
                open: false,
                children: [
                    'Delete Department',
                    'Delete Role',
                    'Delete Employee'
                ]
            },
            {
                name: "Quit",
            }
        ]
    };

    const addDepartment = {
        type: 'input',
        name: 'name',
        message: 'Please enter the name of the department you would like to add: '
    };

    const addRole = [{
        type: 'input',
        name: 'title',
        message: 'Please enter the title of the role you would like to add: '
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Please enter the salary of the role: '
    },
    {
        type: 'rawlist',
        name: 'department',
        message: 'Please select which department the role belongs to: ',
        choices: departmentList
    }
    ];

    const addEmployee = [
        {
            type: 'input',
            name: 'first_name',
            message: 'Please enter the first name of the employee: '
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please enter the last name: '
        },
        {
            type: 'rawlist',
            name: 'role',
            message: 'Please choose the role: ',
            choices: roleList
        },
        {
            type: 'rawlist',
            name: 'manager',
            message: 'Please choose the manager: ',
            choices: [...managerList, 'null']
        }
    ];

    const updateRole = [
        {
            type: 'rawlist',
            name: 'employee',
            message: 'Please select the employee to update: ',
            choices: employeeList
        },
        {
            type: 'rawlist',
            name: 'role',
            message: 'Please choose the role: ',
            choices: roleList
        }
    ];

    const updateManager = [
        {
            type: 'rawlist',
            name: 'employee',
            message: 'Please select the employee to update: ',
            choices: employeeList
        },
        {
            type: 'rawlist',
            name: 'manager',
            message: 'Please choose the manager: ',
            choices: [...managerList, 'null']
        }
    ];

    const deleteDepartment = {
        type: 'rawlist',
        name: 'department',
        message: 'Please select the department to delete: ',
        choices: departmentList
    };

    const deleteRole = {
        type: 'rawlist',
        name: 'role',
        message: 'Please select the role to delete: ',
        choices: roleList
    };

    const deleteEmployee = {
        type: 'rawlist',
        name: 'employee',
        message: 'Please select the employee to delete: ',
        choices: employeeList
    };

    // Prompt user menu
    const ans = await inquirer.prompt(options);

    if (managerList.includes(ans.option)) {
        await db.viewEmployeesByManager(ans.option);
    } else if (departmentList.includes(ans.option)) {
        await db.viewEmployeesByDepartment(ans.option);
    } else {
        switch (ans.option) {
            case 'View All Departments':
                await db.viewAllDepartments();
                break;
            case 'View All Roles':
                await db.viewAllRoles();
                break;
            case 'View All Employees By Default':
                await db.viewAllEmployees();
                break;
            case 'View Budge':
                await db.viewBudge();
                break;
            case 'Add Department':
                {
                    const input = await inquirer.prompt(addDepartment);
                    await db.addDepartment(input.name);
                    break;
                }
            case 'Add Role':
                {
                    const input = await inquirer.prompt(addRole);
                    const departmentId = departmentList.indexOf(input.department) + 1;
                    await db.addRole(input.title, input.salary, departmentId);
                    break;
                }
            case 'Add Employee':
                {
                    const input = await inquirer.prompt(addEmployee);
                    const roleId = roleList.indexOf(input.role) + 1;
                    await db.addEmployee(input.first_name, input.last_name, roleId, input.manager);
                    break;
                }
            case 'Update Employee Role':
                {
                    const input = await inquirer.prompt(updateRole);
                    const employeeId = employeeList.indexOf(input.employee) + 1;
                    const roleId = roleList.indexOf(input.role) + 1;
                    await db.updateRole(employeeId, roleId);
                    break;
                }
            case 'Update Employee Manager':
                {
                    const input = await inquirer.prompt(updateManager);
                    const employeeId = employeeList.indexOf(input.employee) + 1;
                    await db.updateManager(employeeId, input.manager);
                    break;
                }
            case 'Delete Department':
                {
                    const input = await inquirer.prompt(deleteDepartment);
                    const departmentId = departmentList.indexOf(input.department) + 1;
                    await db.deleteDepartment(departmentId);
                    break;
                }
            case 'Delete Role':
                {
                    const input = await inquirer.prompt(deleteRole);
                    const roleId = roleList.indexOf(input.role) + 1;
                    await db.deleteRole(roleId);
                    break;
                }
            case 'Delete Employee':
                {
                    const input = await inquirer.prompt(deleteEmployee);
                    const employeeId = employeeList.indexOf(input.employee) + 1;
                    await db.deleteEmployee(employeeId);
                    break;
                }
            default:
                process.exit();
        }
    }

    main();
}

module.exports = { main };