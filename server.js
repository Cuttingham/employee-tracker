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
              updateEmployeeManager()
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

      const viewEmployees = () => {
        const sql = 'SELECT * FROM EMPLOYEES';
        db.query(sql,function(err,res){
            if(err){
                console.log(err)
            }
            console.table(res);
            init();
        });
      }

      const viewAllDepts = ()=>{
        const sql = 'SELECT * FROM department';
        db.query(sql,function(err,res){
          if(err){
            console.log(err)
          }
          console.table(res);
          init();
        })
      }

      const viewAllRoles = () => {
        const sql ='SELECT * FROM roles';
        db.query(sql,function(err,res){
          if(err){
            console.log(err);
          }
          console.table(res);
          init();
        })
      }

      const addDept = () =>{
        return inquirer.prompt([
          {
            type:"input",
            message:"What is the name of the new department?",
            name:"deptNew"
          }

        ]).then(function(response){
          db.query("INSERT INTO department (name) VALUES (?)",[response.deptNew],function(err,res){
            if(err){
              console.log(err)
            }
            console.table(res);
            init();
          })
        })
      }

      const addRole = () =>{
        return inquirer.prompt([
          {
            type:"input",
            message:"What is the name of the new role?",
            name:"roleNew"
          },
          {
            type:"input",
            message:"What is the salary of this new role?",
            name:"salaryNew"
          },
          {
            type:'input',
            message:'What is the ID number of the department?',
            name:"idNew"
          }
        ]).then(function(response){
          db.query("INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)",[response.roleNew,response.salaryNew,response.idNew],function(err,res){
            if(err){
              console.log(err)
            }
            console.table(res);
            init();
    
          })
        })

      }

      const addEmployee = () =>{
        return inquirer.prompt([
          {
            type:"input",
            message:"What is the new employee's first name?",
            name:"firstnameNew"
          },
          {
            type:"input",
            message:"What is the new employee's last name?",
            name:"lastnameNew"
          },
          {
            type:"input",
            message:"What is the employee's role id?",
            name:"roleIdNew"
          },
          {
            type:"input",
            message:"What is their manager's manager id?",
            name:"managerIdNew"
          },
        ]).then(function(response){
          db.query("INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES(?,?,?,?)",[response.firstnameNew,response.lastnameNew,response.roleIdNew,response.managerIdNew],function(err,res){
            if(err){
              console.log(err)
            }
            console.table(res);
            init();
          })
        })

      }

      const updateEmployeeRole = () =>{
        inquirer.prompt([
          {
            type:"input",
            message:"Enter employee's last name that you would like to update.",
            name:"lastnameUpdate"
          },
          {
            type:"input",
            message:"What is the employee's new role id?",
            name:"roleIdUpdate"
          }
        ]).then(function(response){
          db.query("UPDATE employees SET role_id=? WHERE last_name =?",[response.roleIdUpdate,response.lastnameUpdate],function(err,res){
            if(err){
              console.log(err)
            }
            console.table(res);
            init();
          })
        })

      }

      const updateEmployeeManager = () =>{
        inquirer.prompt([
          {
            type:"input",
            message:"Type in employee's last name you would like to update.",
            name:"lastnameUpdate"
          },
          {
            type:"input",
            message:"Please enter new manager's id.",
            name:"managerUpdate"
          }
        ]).then(function(response){
          db.query("UPDATE employees SET manager_id=? WHERE last_name = ?",[response.managerUpdate,response.lastnameUpdate],function(err,res){
            if(err){
              console.log(err)
            }
            console.table(res)
            init();
          })
        })
      }

      function quit() {
        db.end();
        process.exit();
      }
      init();

      app.use((req, res) => {
        res.status(404).end();
      });
      

      app.listen(PORT, () => {
        console.log(`Server running on localhost:${PORT}`);
      })
      