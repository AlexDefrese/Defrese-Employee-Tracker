const { prompt } = require('inquirer');
const mysql = require('mysql2');
console.table = require ('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Harrison1991',
      database: 'inventory_db'
    },
    console.log(`Connected to the inventory_db database.`)
  ).promise();
  

  const mainMenu = async () => {
    const { choice } = await prompt ([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View all Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'View all Departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'EXIT',
                    value: 'EXIT'
                },
            ]
        }
    ])

    switch (choice) {
        case 'VIEW_EMPLOYEES':
            viewEmployees()
            break;
        case 'VIEW_DEPARTMENTS':
            viewDepartments()
            break;
        case 'EXIT':
            process.exit();
        default:
            process.exit();
    };

    const viewEmployees = async() => {
        const employeeData = await db.query("SELECT * FROM employee")
        console.log(employeeData);
        mainMenu();
    };

    const viewDepartments = () => {

    }

  }

  mainMenu();