const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer")
const conTable = require('console.table');
const sequelize = require('./config/connection');
const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });