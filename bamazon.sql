CREATE DATABASE bamazon_db;
USE bamazon_db;
-- will show bold in the left 'SCHEMAS' panel

CREATE TABLE products_tbl (
item_id INT NOT NULL AUTO_INCREMENT, 
PRIMARY KEY(item_id), 
product_name VARCHAR(255),
department_name VARCHAR(255),
price DECIMAL(13,4),
stock_quantity INT
);

SET SQL_SAFE_UPDATES=0; -- off
SET SQL_SAFE_UPDATES=1; -- on

DROP TABLE products_tbl;

DELETE FROM products_tbl; -- deletes all rows from the table

INSERT INTO products_tbl(product_name, department_name, price, stock_quantity)
VALUES("Girl, Stop Apologizing: A Shame-Free Plan for Embracing and Achieving Your Goals", "Books", 14.99, 1),
("Where the Crawdads Sing", "Books", 16.20, 16),
("Go See the Principal: True Tales from the School Trenches", "Books", 10.82, 0),
("Wyze Cam 1080p HD Indoor Wireless Smart Home Camera with Night Vision, 2-Way Audio, Works with Alexa", "Camera & Photo", 25.99, 4),
("Fujifilm Instax Mini Instant Film Value Pack - (3 Twin Packs, 60 Total Pictures)", "Camera & Photo", 35.40, 2),
("Wyze Cam Pan 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart Home Camera with Night Vision and 2-Way Audio, Works with Alexa", "Camera & Photo", 37.98, 5),
("TIJN Blue Light Blocking Glasses Square Nerd Eyeglasses Frame Anti Blue Ray Computer Game Glasses (one size fits all)", "Clothing, Shoes & Jewelry", 16.99, 24),
("SATINA High Waisted Leggings - 25 Colors - Super Soft Full Length Opaque Slim (one size fits all)", "Clothing, Shoes & Jewelry", 11.99, 8),
("ODODOS High Waist Out Pocket Yoga Pants Tummy Control Workout Running 4 Way Stretch Yoga Leggings Black (one size fits all)", "Clothing, Shoes & Jewelry", 18.98, 8),
("Crocs Men's and Women's Classic Clog | Comfort Slip On Casual Water Shoe | Lightweight (one size fits all)", "Clothing, Shoes & Jewelry", 35.95, 16),
("Fire TV Stick 4K with all-new Alexa Voice Remote, streaming media player", "Electronics", 49.99, 3),
("Fire TV Stick with all-new Alexa Voice Remote, streaming media player", "Electronics", 39.99, 8),
("All-new Kindle Paperwhite – Now Waterproof with 2x the Storage", "Electronics", 99.99, 12),
("Echo Dot (3rd Gen) - New and improved smart speaker with Alexa", "Electronics", 49.99, 0),
("Roku Express | Easy High Definition (HD) Streaming Media Player", "Electronics", 29.88, 9),
("Exploding Kittens Card Game", "Toys & Games", 19.99, 6),
("L.O.L. Surprise! Glam Glitter Series Doll with 7 Surprises", "Toys & Games", 10.99, 10),
("Guess How Much I Love You Big Nutbrown Hare and Little Nutbrown Hare Musical Plush Waggie", "Toys & Games", 28.00, 0),
("$10 PlayStation Store Gift Card [Digital Code]", "Video Games", 10.00, 11),
("$20 PlayStation Store Gift Card [Digital Code]", "Video Games", 20.00, 9),
("$25 PlayStation Store Gift Card [Digital Code]", "Video Games", 25.00, 8);

SELECT * FROM products_tbl;

SELECT * FROM products_tbl WHERE item_id = 1;

UPDATE products_tbl SET stock_quantity = 10 WHERE item_id = 1;

SELECT * FROM products_tbl WHERE stock_quantity < 5;










