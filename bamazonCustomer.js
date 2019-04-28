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
    transaction();
});

// function displayProducts() {
//     console.log("\n\n---------------------------\nProducts Currently for sale\n---------------------------\n");
//     connection.query("SELECT * FROM products", function (err, res) {

//         if (err) throw err;
//         for (var i = 0; i < res.length; i++) {

//             console.log("==================================")
//             console.log("Item ID: " + res[i].item_id);
//             console.log("Product Name: " + res[i].product_name);
//             console.log("Price: $" + res[i].price);
//             console.log("==================================")

//         }

//         pickItem()

//     });
// }

function transaction() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([{
                name: "choice",
                type: "rawlist",
                choices: function () {
                    var idArray = [];
                    console.log("\n\n---------------------------\nProducts Currently for sale\n---------------------------\n");
                    for (var i = 0; i < results.length; i++) {
                        console.log("==================================")
                        console.log("Item ID: " + idArray.push(results[i].item_id));
                        console.log("Product Name: " + results[i].product_name);
                        console.log("Price: $" + results[i].price);
                        console.log("==================================\n")
                    }
                    return idArray;
                },
                message: "Enter the Item ID number of the product you would like to buy."
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?"
            }
            ])

            .then(function (answer) {

                var arrayNum = answer.choice - 1;
                console.log("\n==================================\nProduct: " + results[arrayNum].product_name + "\nQuantity: "
                    + answer.quantity + "\nAmount Left in Stock: " + results[arrayNum].stock_quantity + "\nTotal: $" +
                    answer.quantity * results[arrayNum].price + "\n==================================");

                    inquirer
                        .prompt([
                            {
                                type: "confirm",
                                message: "Proceed with transaction?",
                                name: "confirm",
                                default: true
                            }
                        ])
                        .then(function(response) {
                            if (response.confirm) {
                                
                            }

                            if (answer.quantity > results[arrayNum].stock_quantity) {
                                console.log("Insufficient quantity!");
                            }

                            else {
                                var stockQuantity = results[arrayNum].stock_quantity-answer.quantity;
                                var itemId = results[arrayNum].item_id
                                connection.query(
                                    "UPDATE products SET ? WHERE ?",
                                    [
                                      {
                                        stock_quantity: stockQuantity
                                      },
                                      {
                                        item_id: itemId
                                      }
                                    ],
                                    function (error) {
                                      if (error) throw err;
                                      console.log("Item(s) Purchased!");
                                      
                                    }
                                );
                                
                            }

                            
                        })

                connection.end();

            });
    });
};
