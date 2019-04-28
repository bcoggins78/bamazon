DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price FLOAT (15),
  stock_quantity INT (10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MSI GeForce GTX 1050 TI Gaming X 4G", "Electronics", 189.00, 54);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Epiphone Les Paul Electric Guitar", "Musical Instruments", 599.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("FurHaven Pet Dog Bed", "Pet Supplies", 37.99, 85);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("A Dance with Dragons", "Books", 9.99, 105);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BOOM 2 Mobile Bluetooth Speaker", "Smart Home", 129.49, 68);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("World of Warcraft", "Video Games", 49.99, 578);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hanes Men's ComfortSoft Short Sleeve T-Shirt (6 Pack)", "Clothing", 17.44, 59);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Voltron Combination Lion Bundle Action Figures", "Toys & Games", 140.00, 37);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Last of Us", "Video Games", 19.61, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("CORSAIR Crystal 570X RGB Mid-Tower Case", "Electroncs", 159.98, 4);

-- SELECT * FROM products;
-- update products set stock_quantity = 3 where item_id = 6;

-- SELECT * FROM products WHERE stock_quantity < 5;

