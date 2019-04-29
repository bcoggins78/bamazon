# Bamazon

### UNC Coding Bootcamp Week 12 Homework Project


This week introduced the use of MySQL and using Node.js to manipulate items in the database.

The Bamazon app is a store app that can be used to purchase items from the fictional Bamazon store.  It can also be used to view and update products in the store's MySQL database.

This project uses:

* JavaScript
* Node.js
* MySQL
* DotEnv

#### Instructions

This project uses two apps:
* bamazonCustomer.js - Used by the customer to make purchases
* bamazonManager.js - Used by the manager to view available products, view low inventory items, add inventory to existing products, and add new products.

When using bamazonCustomer, the user is presented with the list of available products and asked to enter the item id of the desired product.  The user is then asked for the quantity.  If there is enough of this item instock, the user will be presented with the item requested and the total cost.  

When using bamazonManager, the user is given a menu with four choices:

1. View Products for Sale
   - Lists all available products

2. View Low Inventory
   - Lists only products where there is less than five in stock

3. Add to Inventory
   - Add inventory to an existing product

4. Add New Product
   - Add a new product to the catalog

#### Example Screenshots

##### bamazonCustomer

- Starting the app and I already see something I want to buy, the Epiphone Les Paul Electric Guitar

![running-bamazonCustomer.js](/media/bamazonCustomer-1.jpg)

- I make the selection and I'll take three (I'm trying to start a band).

![make-selection](/media/bamazonCustomer-2.jpg)

![select-quantity](/media/bamazonCustomer-3.jpg)

- And I have made the purchase. A bit pricy but worth the purchase.  I forgot I need one more!

![purchase-made](/media/bamazonCustomer-4.jpg)

- Go back through the app and try to purchase one more Guitar.  Oops, they are out of stock!

![out-of-stock](/media/bamazonCustomer-5.jpg)
