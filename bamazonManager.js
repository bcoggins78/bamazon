require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var sqlPwd = process.env.MYSQL_PASS; // Contains the MySQL password

// Defines the connection to mysql db and assigns it to variable
var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: sqlPwd,
    database: "bamazon"

});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // run the start function after the connection is made to display the menu
    menu();
});

function menu() {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "Please make a Selection",
            choices: ["View Products for Sale", "View Low Inventory Items", "Add to Inventory", "Add New Product"]
        })
        .then(function (answer) {
            
            if (answer.menu === "View Products for Sale") {
              viewProducts();
            }
            else if (answer.menu === "View Low Inventory Items") {
              lowInventory();
            }
            else if (answer.menu === "Add to Inventory") {
              addInventory();
            }
            else if (answer.menu === "Add New Product") {
              addProduct();
            }
            else {
                connection.end();
            }
          });
}

function viewProducts() {
    console.log("This will be the function to view products");
    connection.end();
};

function lowInventory() {
    console.log("This will be the function to view low inventory items");
    connection.end();
};

function addInventory() {
    console.log("This will be the function to add inventory to items");
    connection.end();
};

function addProduct() {
    console.log("This will be the function to add new products to the products table");
    connection.end();
};

