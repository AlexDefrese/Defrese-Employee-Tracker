const { prompt, default: inquirer } = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const db = mysql
  .createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "root",
      // MySQL password
      password: "Harrison1991",
      database: "employees",
    },
    console.log(`Connected to the employees database.`)
  )
  .promise();

const mainMenu = async () => {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View all Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE",
        },
        {
          name: "View all Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "View all Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE",
        },
        {
          name: "EXIT",
          value: "EXIT",
        },
      ],
    },
  ]);

  switch (choice) {
    case "VIEW_EMPLOYEES":
      viewEmployees();
      break;
    case "VIEW_DEPARTMENTS":
      viewDepartments();
      break;
    case "VIEW_ROLES":
      viewRoles();
      break;
    case "ADD_EMPLOYEE":
      addEmployee();
      break;
    case "UPDATE_EMPLOYEE":
      updateEmployee();
      break;
    case "ADD_DEPARTMENT":
      addDepartment();
      break;
    case "ADD_ROLE":
      addRole();
    case "EXIT":
      process.exit();
    default:
      process.exit();
  }
};

const viewEmployees = async () => {
  const [employeeData] = await db.query(
    `SELECT * FROM employee JOIN role ON employee.role_id = role.id`
  );
  console.table(employeeData);
  mainMenu();
};

const viewDepartments = async () => {
  const [departmentData] = await db.query(`SELECT  * FROM department`);
  console.table(departmentData);
  mainMenu();
};

const viewRoles = async () => {
  const [roleData] = await db.query(`SELECT * FROM role`);
  console.table(roleData);
  mainMenu();
};

const addEmployee = async () => {
  const [RolesData] = await db.query(`SELECT * FROM role`);
  const formattedRole = RolesData.map((eachRole)=> {
    return {name: eachRole.title, value: eachRole.id};
  })
  const [employeeData] = await db.query(`SELECT * FROM employee`);
  const formattedEmployee = employeeData.map((eachEmployee)=> {
    return {name: eachEmployee.first_name + " " + eachEmployee.last_name, value: eachEmployee.id};
  })
  await prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      name: "role_id",
      message: "What is their role?",
      choices: formattedRole,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is their manager?",
      choices: formattedEmployee,
    }
  ]).then(function (answers) {
    db.query(`INSERT INTO employee SET ?`, {
      first_name: answers.first_name,
      last_name: answers.last_name,
      role_id: answers.role_id,
      manager_id: answers.manager_id,
    }),
      console.log("<<<<Added employee>>>>");
    mainMenu();
  });
};
const addDepartment = async () => {
  await prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the department?",
    },
  ]).then(function (answers) {
    db.query(`INSERT INTO department SET ?`, {
      name: answers.name,
    }),
      console.log("<<<<Added department>>>>");
    mainMenu();
  });
};

const addRole = async () => {
  const [departmentData] = await db.query(`SELECT * FROM department`);
  const formattedDepartment = departmentData.map((eachDepartment)=> {
    return {name: eachDepartment.name, value: eachDepartment.name};
  })
  await prompt([
    {
      type: "input",
      name: "role_name",
      message: "What is the title of the role?",
    },
    {
      type: "input",
      name: "salary_amount",
      message: "What is the salary?",
    },
    {
      type: "list",
      name: "role_department",
      message: "What department will they be in?",
      choices: formattedDepartment,
    },
  ]).then(function (answers) {
    db.query(`INSERT INTO role SET ?`, {
      title: answers.role_name,
      salary: answers.salary_amount,
      department_id: answers.role_department,
    }),
      console.log("<<<<Added role>>>>");
    mainMenu();
  });
};

const updateEmployee = async () => {
  const [RolesData] = await db.query(`SELECT * FROM role`);
  const formattedRole = RolesData.map((eachRole)=> {
    return {name: eachRole.title, value: eachRole.id};
  })
  const [employeeData] = await db.query(`SELECT * FROM employee`);
  const formattedEmployee = employeeData.map((eachEmployee)=> {
    return {name: eachEmployee.first_name + " " + eachEmployee.last_name, value: eachEmployee.id};
  })

  await prompt([
    {
      type: 'list',
      name: 'employee_name',
      message: "Who would you like to update?",
      choices: formattedEmployee,
    },
    {
      type: 'list',
      name: 'employee_role',
      message: "What role would you like to update them to?",
      choices: formattedRole,
    }
]).then(function (answers){
  db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [
    answers.employee_role,
    answers.employee_name,
  ])
})
    console.log ("<<<<Updated Role>>>");
    mainMenu();
  };


mainMenu();
