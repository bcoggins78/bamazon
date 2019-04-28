// Loads required modules
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

// Establishes connection to the database and runs the transaction function
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    transaction();
});

// Function used to round the price values to 2 decimal places
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
}

// Function that runs the transaction
function transaction() {

    // Queries the bamazon db and selects all fields from the products table
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        // Prompt that will display everything currently in inventory and then asks the use to select the Item ID for the desired product
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var idArray = [];
                        console.log("\n\n---------------------------\n  Products Currently for sale\n---------------------------\n");
                        for (var i = 0; i < results.length; i++) {
                            console.log("==================================================")
                            console.log("  Item ID: " + idArray.push(results[i].item_id));
                            console.log("  Product Name: " + results[i].product_name);
                            console.log("  Category: " + results[i].department_name);
                            console.log("  Price: $" + results[i].price);
                            console.log("  Current Stock: " + results[i].stock_quantity);
                            console.log("==================================================\n")
                        }
                        return idArray;
                    },
                    message: "Enter the Item ID number of the product you would like to buy."
                },

                // Asks the user the quantity they would like to purchase
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy?"
                }
            ])

            .then(function (answer) {

                // Defines variables for the product and it's table values
                var arrayNum = answer.choice - 1;
                var total = round(answer.quantity * results[arrayNum].price, 2)
                var itemID = results[arrayNum].item_id;
                var prodName = results[arrayNum].product_name;
                var quantityToBuy = answer.quantity;
                var stockQuantity = results[arrayNum].stock_quantity;

                // Checks to see if there is enough inventory stock to fullfill the user's purchase
                if (quantityToBuy > stockQuantity) {
                    console.log("Insufficient quantity!");
                }

                else {
                    // Variable that holds the updated inventory stock after the purchase
                    var updatedQuantity = stockQuantity - quantityToBuy;

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

                            // Shows the user what they purchased and the amount.
                            console.log("\nItem(s) Purchased!");
                            console.log("==================================\n  Item ID: " + itemID + "\n  Product: " + prodName + "\n  Quantity: "
                                + quantityToBuy + "\n  Total: $" + total + "\n==================================");
                        }
                    );
                }

                // Closes connection to bamazon db
                connection.end();
            });
    });
};
