/*

### Challenge #2: Manager View (Next Level)

* Create a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

*/

/* ============================ REQUIRE MODULES =================================== */

var mysql = require("mysql");
var inquirer = require("inquirer");

/* ============================ GLOBAL VARIABLES =================================== */

var itemPrice = 0;
var newStockQty = 0;
var itemId = 0;

//this function will return the data as a string!!!
const formatter = new Intl.NumberFormat("en-US",{
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
});


/* -------------------------------- inquireWithUser() -------------------------------- */

function inquireWithUser() {
    
    inquirer.prompt(questions).then(function(answers) {
       console.log(answers.userselection);
        if(answers.userselection == 'View Products for Sale') {
                viewProductsForSale(); 
        } else if(answers.userselection == 'View Low Inventory') {
                viewLowInventory();
        } else {
            addToInventory();
        }

       }
   );
}

var questions = [
    {
        message: "Which report would you like to run?",
        type: "list",
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory'],
        name: "userselection",
        validate: function validateUserName(name){
            return name !== '';
        }
    }
];



/* ============================ SQL DATABASE =================================== */


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "temp",
    database: "bamazon_db"
});
//console.log("\nconnection = ", connection);


/* -------------------------------- startApp() -------------------------------- */

function startApp() {
    console.log("\nStarting...");
    inquireWithUser()
}

/* -------------------- invoke startApp() [start the application] --------------------- */

startApp();
//viewProductsForSale();
//viewLowInventory();
//addToInventory();
//addNewProduct();

/* -------------------------------- viewProductsForSale() -------------------------------- */

function viewProductsForSale() {

    beginConnection(connection);
    
    var SQLQuery = "SELECT * FROM bamazon_db.products_tbl ORDER BY item_id ASC;";

    var query = connection.query(SQLQuery, function(error, result, fields) {
        
        if(error) throw error;
        
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("B A M A Z O N  P R O D U C T S: Products For Sale");
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        for (var i = 0, z = result.length; i < z; i++) {
            itemPrice = result[i].price; //number
            itemPrice = formatter.format(itemPrice); //string
            console.log(result[i].item_id+". "+result[i].department_name+" -> "+"'"+result[i].product_name+"' = "+itemPrice+" | Stock Qty: "+result[i].stock_quantity);
        }
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        
    });

    endConnection(connection);
 
}


/* -------------------------------- viewLowInventory() -------------------------------- */

function viewLowInventory() {

    beginConnection(connection);
    
    // SELECT * FROM products_tbl WHERE stock_quantity < 5;
    var SQLQuery = "SELECT * FROM bamazon_db.products_tbl WHERE stock_quantity < 5 ORDER BY item_id ASC;";

    var query = connection.query(SQLQuery, function(error, result, fields) {
       
        if(error) throw error;
        
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("B A M A Z O N  P R O D U C T S: Low Inventory (Stock Quantity < 5)");
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        for (var i = 0, z = result.length; i < z; i++) {
            itemPrice = result[i].price; //number
            itemPrice = formatter.format(itemPrice); //string
            console.log(result[i].item_id+". "+result[i].department_name+" -> "+"'"+result[i].product_name+"' = "+itemPrice+" | Stock Qty: "+result[i].stock_quantity);
        }
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        

    });

    endConnection(connection);
 
}

/* -------------------------------- addToInventory() -------------------------------- */

function addToInventory() {

    beginConnection(connection);

    newStockQty = 20; //get these values from the manager/user
    itemId = 1; //get these values from the manager/user
    
    var SQLQuery1 = "UPDATE bamazon_db.products_tbl SET stock_quantity = " + parseInt(newStockQty) + " WHERE item_id = " + parseInt(itemId) + ";";

    var query = connection.query(SQLQuery1, function(error, result, fields) {
       
        if(error) throw error;
        console.log(result);
        //console.log(result.message);
    });

    //var SQLQuery = "SELECT * FROM bamazon_db.products_tbl WHERE item_id = " + parseInt(itemId) + ";";
    var SQLQuery2 = "SELECT * FROM bamazon_db.products_tbl WHERE item_id = " + parseInt(itemId) + ";";

    var query = connection.query(SQLQuery2, function(error, result, fields) {
       
        if(error) throw error;
        
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("B A M A Z O N  P R O D U C T S: Add to Inventory (Sets Item ID = 1 to Stock Quantity = 20)");
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        for (var i = 0, z = result.length; i < z; i++) {
            itemPrice = result[i].price; //number
            itemPrice = formatter.format(itemPrice); //string
            console.log(result[i].item_id+". "+result[i].department_name+" -> "+"'"+result[i].product_name+"' = "+itemPrice+" | Stock Qty: "+result[i].stock_quantity);
        }
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        

    });

    endConnection(connection); 

}

/* -------------------------------- beginConnection() -------------------------------- */

function beginConnection(connectionArg) {

    connectionArg.connect(function(error) {
        if(error) {
            console.error("Connection error: " + error.stack);
            return;
        };
        console.log("connection.state = ", connection.state);
        console.log("connection.connect = success (" + "threadId is " + connection.threadId + ")"); 
    });
}

/* -------------------------------- endConnection() -------------------------------- */

function endConnection(connectionArg) {

    connectionArg.end(function(error) {
        if(error) {
            console.log("\nconnection.end error = ", error);
        } else {
            console.log("connection.end = success\n");
        }; 
    });
}

