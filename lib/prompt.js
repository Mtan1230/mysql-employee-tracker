const inquirer = require('inquirer');

async function main() {
    const question = {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add department', 'Quit', new inquirer.Separator('----------------------')]
    };

    const ans = await inquirer.prompt(question);
    
    if (ans.action === 'View All Employees') {

        const next = await main();
    }
    console.log(ans)
}

module.export = main();