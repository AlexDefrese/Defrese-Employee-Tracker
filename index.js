const { prompt } = require('inquirer');
const mysql = require('mysql2');
require ('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Harrison1991',
      database: 'employees'
    },
    console.log(`Connected to the employees database.`)
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
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name:'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE'
                },
                {
                    name: 'View all Departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'Add a Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'View all Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'Add a Role',
                    value: 'ADD_ROLE'
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
        case 'VIEW_ROLES':
            viewRoles()
            break;
        case 'ADD_EMPLOYEE':
            addEmployee()
            break;
        case 'UPDATE_EMPLOYEE':
            updateEmployee()
            break;
        case 'ADD_DEPARTMENT':
            addDepartment()
            break;
        case 'ADD_ROLE':
            addRole();
        case 'EXIT':
            process.exit();
        default:
            process.exit();
    }
};

    const viewEmployees = async () => {
        const [employeeData] = await db.query(`SELECT * FROM employee`)
        console.table(employeeData);
        mainMenu();
    };

    const viewDepartments = async () => {
        const [departmentData] = await db.query(`SELECT  * FROM department`)
        console.table(departmentData);
        mainMenu();
    };

    const viewRoles = async () => {
        const [roleData] = await db.query(`SELECT * FROM role`)
        console.table(roleData);
        mainMenu();
    };

    const addEmployee = () => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES (?, ?, ?, ?)`;
        const params = async () => { 
            prompt ([
            {
                type: 'input',
                name:'firstName',
                message:"What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'lastName',
                message:"What is the employee's last name?"
            },
            {
                type: 'list',
                name: 'roleType',
                choices: [
                    'Sales Lead',
                    'IT Support',
                    'Lawyer',
                    'Engineer',
                    'Accountant'
                ]
            }
        ])
    }
        db.query(sql, params, (result));
        console.log('employee added');
        mainMenu();

    };
   
    



  mainMenu();