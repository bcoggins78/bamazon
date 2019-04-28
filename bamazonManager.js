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
            choices: ["View Products for Sale",
                "View Low Inventory Items",
                "Add to Inventory",
                "Add New Product",
                "EXIT"]
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
};

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {

        for (var i = 0; i < res.length; i++) {
            console.log("\---------------------------------------------\n Item ID: " + res[i].item_id + "\n Product: " + res[i].product_name + "\n Department: " + res[i].department_name + "\n Price $" + res[i].price + "\n Inventory Stock: " + res[i].stock_quantity);
        }
        console.log("\---------------------------------------------\n")
        menu();
    });
};

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        console.log("\n------ Items with less than 5 in stock ------")
        for (var i = 0; i < res.length; i++) {
            console.log("\---------------------------------------------\n Item ID: " + res[i].item_id + "\n Product: " + res[i].product_name + "\n Department: " + res[i].department_name + "\n Price $" + res[i].price + "\n Inventory Stock: " + res[i].stock_quantity);
        }
        console.log("\---------------------------------------------\n")
        menu();
    });
};

// Function used to round the price values to 2 decimal places
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
};

function addInventory() {
    
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        // Prompt to select the item_id of the product receiving inventory and how much is being added
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var idArray = [];
                        
                        for (var i = 0; i < results.length; i++) {
                            
                            idArray.push(results[i].item_id);
                            
                        }
                        return idArray;
                    },
                    message: "Enter the Item ID number of the product you would like inventory added."
                },

                
                {
                    name: "quantity",
                    type: "input",
                    message: "How much inventory are we adding?"
                }
            ])

            .then(function (answer) {

                // Defines variables for the product and it's table values
                var arrayNum = answer.choice - 1;
                var itemID = results[arrayNum].item_id;
                var prodName = results[arrayNum].product_name;
                var quantityToAdd = answer.quantity;
                var stockQuantity = results[arrayNum].stock_quantity;
               
                    // Variable that holds the updated inventory stock after the addition
                    var updatedQuantity = parseInt(stockQuantity) + parseInt(quantityToAdd);

                    // Updates the products table and sets the stock_quantity value to the updated quantity 
                    // where the item_id is the number the user selected
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: updatedQuantity
                            },
                            {
                                item_id: itemID
                            }
                        ],
                        function (error) {
                            if (error) throw err;

                            // Shows the user the Product with the updated inventory amount.
                            console.log("\nInventory Added");
                            console.log("==================================\n  Item ID: " + itemID + "\n  Product: " + prodName + "\n  Previous Quantity: " + stockQuantity + "\n  Quantity to Add: " + quantityToAdd + "\n  New Quantity: "
                                + updatedQuantity + "\n==================================\n\n");
                            menu();
                        }
                    );              
            });
    });
    // menu();
};

function addProduct() {
    console.log("This will be the function to add new products to the products table");
    connection.end();
};

