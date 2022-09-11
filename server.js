const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer")
const conTable = require('console.table');
const sequelize = require('./config/connection');
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

