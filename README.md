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
* bamazonCustomer.js - Used by the customer to make purchases.
* bamazonManager.js - Used by the manager to view available products, view low inventory items, add inventory to existing products, and add new products.

When using bamazonCustomer, the user is presented with the list of available products and is asked to enter the item id of the desired product.  The user is then asked for the quantity.  If there is enough of this item in stock, the user will be presented with the item requested and the total cost. If there is not enough inventory for that specific item, the user receives the "Insufficient quantity" message.  

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

##### bamazonCustomer.js

- Starting the app and I already see something I want to buy, the Epiphone Les Paul Electric Guitar

![running-bamazonCustomer.js](/media/bamazonCustomer-1.jpg)

- I make the selection and I'll take three (I'm trying to start a band).

![make-selection](/media/bamazonCustomer-2.jpg)

![select-quantity](/media/bamazonCustomer-3.jpg)

- And I have made the purchase. A bit pricy but worth the purchase.  I forgot I need one more!

![purchase-made](/media/bamazonCustomer-4.jpg)

- Go back through the app and try to purchase one more Guitar.  Oops, they are out of stock!

![out-of-stock](/media/bamazonCustomer-5.jpg)

##### bamazonManager.js

- Starting this app gives you the below menu options.  After making a selection and completing the task, you are taken back to this menu.

![running-bamazonManager.js](/media/bamazonManager-1.jpg)

- Selecting "View Products for Sale" will give a listing and information for all products available.

![view-products](/media/bamazonManager-2.jpg)

- Lets look at the products that have less than five in stock by selecting "View Low Inventory".

![low-inventory](/media/bamazonManager-3.jpg)

- Looks like someone bought all of the Epiphone Les Paul Electric Guitars. Since we had a new shipment come in, lets add these to the inventory by selecting "Add to Inventory" and selecting the Item ID for the guitar.

![low-inventory-product-selection](/media/bamazonManager-4.jpg)

- We received 30 in the warehouse so we'll add this to the database.

![low-inventory-add-quantity](/media/bamazonManager-5.jpg)

- Selecting "View Products for Sale" will now show the updated inventory stock for the guitar.

![low-inventory-updated-list](/media/bamazonManager-6.jpg)

- The last option lets us add a new product to the database. Select "Add New Product" and enter the information for each prompt.  The Playstation 4 was used in the below example.

![add-product](/media/bamazonManager-7.jpg)

- Now if we select "View Products for Sale", the Playstation is now listed.

![add-product-updated-list](/media/bamazonManager-8.jpg)
