const inquirer = require('inquirer');

//Add inquirer-tree-prompt plugin
const TreePrompt = require('inquirer-tree-prompt');

//Register plugin
inquirer.registerPrompt('tree', TreePrompt);

const { connect } = require('./model');

//Main menu
async function main() {
    //Connect to the database
    const db = await connect();

    //Load data from database
    const departments = await db.listAllDepartments();
    const managers = await db.listAllManagers();

    //User menu tree
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
                    {
                        name: 'View Budge',
                        value: '',
                        open: false,
                        children: departments,
                    },
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
                name: "QUIT",
            }
        ]
    };

    const addDepartment = {
        type: 'input',
        name: 'name',
        message: 'Please enter the name of the department you would like to add: '
    }

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
        type: 'input',
        name: 'department_id',
        message: 'Please enter the department id of the role: '
    }
    ]

    const addEmployee = [
        {
            type: 'input',
            name: 'first_name',
            message: 'Please enter the first name of the employee you would like to add: '
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please enter the last name: '
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Please choose the role: '
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Please choose the manager: '
        }
    ]

    const ans = await inquirer.prompt(options);

    switch (ans.option) {
        case 'View All Departments':
            db.viewAllDepartments();
            break;
        case 'View All Roles':
            db.viewAllRoles();
            break;
        case 'View All Employees By Default':
            db.viewAllEmployees();
            break;
        case '':
            db.viewEmployeesByManager();
            break;
        case 'View All Employees By Department':
            db.viewAllEmployeesByDepartment();
            break;

        case 'Add department':
            {
                const input = await inquirer.prompt(addDepartment);
                db.addDepartment(input.name);
                break;
            }
        case 'Add Role':
            {
                const input = await inquirer.prompt(addRole);
                db.addRole(input.title, input.salary, input.department_id);

                break;
            }
        case 'Add Employee':
            {
                const input = await inquirer.prompt(addEmployee);
                db.addEmployee(input.first_name, input.last_name, input.role_id, input.manager_id);
                break;
            }



        default:
            process.exit();
    }
    main()
}

module.exports = { main };