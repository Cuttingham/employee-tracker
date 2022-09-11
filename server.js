const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer")
const conTable = require('console.table');

const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '428C96anfqs',
      database: 'employeeDB'
    },
    console.log(`Connected to the employeeDB database.`)
  );

const init = () => {
    return inquirer.prompt([
        {
            type: "list",
            message: "Please select an option",
            choices: [
              "View All Employees",
              "Add Employee",
              "Update Employee Role",
              "Update Employee's Manager",
              "View All Roles",
              "Add Role",
              "View All Departments",
              "Add Department",
              "Quit"
            ],
            name: "mainMenu",
        }

    ]).then((userOption)=>{
        switch(userOption.mainMenu){
            case "View All Employees":
              viewEmployees()
              break;
            case "Add Employee":
              addEmployee()
              break;
            case "Update Employee Role":
              updateEmployeeRole()
              break;
            case "Update Employee's Manager":
              updateEmployeeMan()
              break;
            case "View All Roles":
              viewAllRoles()
              break;
            case "Add Role":
              addRole()
              break;
            case "View All Departments":
              viewAllDepts()
              break;
            case "Add Department":
              addDept()
              break;
            case "Quit":
              quit();
          }
        })
      }
      init();