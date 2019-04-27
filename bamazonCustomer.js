require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var sqlPwd = process.env.MYSQL_PASS; // Contains the MySQL password


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
    displayProducts();
});

function displayProducts() {
    console.log("\nProducts Currently in Inventory\n");
    connection.query("SELECT * FROM products", function (err, res) {
        
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            
            console.log("==================================")
            console.log("Item ID: " + res[i].item_id);
            console.log("Product Name: " + res[i].product_name);
            console.log("Price: $" + res[i].price);
            console.log("==================================\n")
            
        }

        connection.end();
        
    });
}
