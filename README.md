# bamazon-node-app

### Project Description

This project takes its inspiration from one of the world's most popular online retailers, Amazon.com. In this example, the app is executed via a command line interface, prompting for user inputs in order to process a fictitious purchase. The items for purchase are stored in a SQL database that is acted upon in the course of the app's execution. 

Technologies used in this app include the following:

* JavaScript - As a "back-end" programming language
* Node.js - JavaScript runtime providing the app's execution environment and command line interface
* Inquirer.js (package) - Node package used to process command line questions/answers
* mysql (package) - Node package used to interface with the database
* MySQL (database) - Relational Database Management System (RDMS) administered using MySQL Workbench

### Running the Application

This app must be run (executed) in the context of Node.js using a terminal application. With Node.js installed, the app can be accessed from the terminal's command line as follows:

* node bamazonCustomer.js

### User Experience Assumptions

* A transaction can only handle 1 item/product per app execution (must run the app again to purchase an additional item)
* A purchase transaciton is cancelled if the stock quantity is less than the requested quantity (even if a lesser amount of the item is in stock)

### GitHub Repository

* https://github.com/michaeldcastillo/bamazon-node-app

### GitHub Pages (screenshots)

* https://michaeldcastillo.github.io/bamazon-node-app/index.html

### Extra Credit (screenshots)

* bamazonManager1.png
* bamazonManager2.png
* bamazonManager3.png
