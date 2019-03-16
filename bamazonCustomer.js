//bamazonCustomer.js

/* -------------- INSTRUCTIONS 1 -------------------
The app should then prompt users with two messages.
   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.
*/
/* -------------- INSTRUCTIONS 2 -------------------
Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.
*/

/* ============================ REQUIRE MODULES =================================== */

var mysql = require("mysql");
var inquirer = require("inquirer");

/* ============================ GLOBAL VARIABLES =================================== */

var itemId = 0; //primary key in DB
var itemQty = 0; //the quantity the user wants to buy
var stockQty = 0; //the quantity of the item in the database
var newStockQty = 0; //the qantity remaining after the user buys (stockQty - itemQty)
var itemPrice = 0; //the price of the item inthe database
var totalPrice = 0; //the price the user pays (itemQty * itemPrice)
var displayItemPrice = ""; //string
var displayTotalPrice = ""; //string

//this function will return the data as a string!!!
const formatter = new Intl.NumberFormat("en-US",{
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
});

/* ============================ SQL DATABASE =================================== */

//var connection = mysql.createConnection({});
//connection.connect();
//connection.query();
//connection.end();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "temp",
    database: "bamazon_db"
});
//console.log("\nconnection = ", connection);

// THIS IS NOT NEEDED BECAUSE A CONNECTION IS AUTOMATICALLY OPENED 
// WHEN USING "connection.query()"
/*
connection.connect(function(error) {
    if(error) {
        console.error("Connection error: " + error.stack);
        return;
    };
    console.log("\n");
    console.log("connection.connect = success (" + "threadId is " + connection.threadId + ")");
});
*/


/* -------------------------------- startApp() -------------------------------- */

function startApp() {
    console.log("\nStarting...");
    selectAllFromDB();
}

/* -------------------- invoke introBamazon() [start the application] --------------------- */

startApp();
//selectAllFromDB(); //display all items!
//inquireWithUser0(); //run first question, which runs second question, which runs third question
//selectItemFromDB(); //get single item
//endConnection(connection); //end the connection!

/* -------------------------------- selectAllFromDB() -------------------------------- */

function selectAllFromDB() {
    //console.log("\nbegin selectAllFromDB()");
    
    var SQLQuery = "SELECT * FROM bamazon_db.products_tbl ORDER BY item_id ASC;";

    var query = connection.query(SQLQuery, function(error, result, fields) {
        console.log("connection.state = ", connection.state);
        console.log("connection.threadId = ", connection.threadId);
        if(error) throw error;
  
        //console.log("result = ", result);
        //console.log("fields = ", fields);
        
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("B A M A Z O N  P R O D U C T S");
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        for (var i = 0, z = result.length; i < z; i++) {
            itemPrice = result[i].price;
            itemPrice = formatter.format(itemPrice);
            //console.log(itemPrice);
            console.log(result[i].item_id+". "+result[i].department_name+" -> "+"'"+result[i].product_name+"' = "+itemPrice);
        }
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        inquireWithUser0();

    });
    // logs the actual query being run
    //console.log("query.sql = ", query.sql);
    //endConnection(connection); 
}

/* -------------------------------- selectItemFromDB() -------------------------------- */

function selectItemFromDB() {
    //console.log("\nbegin selectItemFromDB()");
    console.log("Here is your order...");

    var SQLQuery = "SELECT * FROM bamazon_db.products_tbl WHERE item_id = " + parseInt(itemId) + ";";

    var query = connection.query(SQLQuery, function(error, result, fields) {
        //console.log("\nconnection.state = ", connection.state);
        //console.log("connection.threadId = ", connection.threadId + "\n");
        if(error) throw error;
        //console.log("result = ", result);
        //console.log("\nresult.stock_quantity = ", result[0].stock_quantity);
        stockQty = parseInt(result[0].stock_quantity); //number
            //console.log("typeof(stockQty) = ", typeof(stockQty));
            //console.log("typeof(itemQty) = ", typeof(itemQty)); //string
        itemQty = parseInt(itemQty); //back to number
            //console.log("typeof(parseInt(itemQty)) = ", typeof(itemQty)); //number
        newStockQty = stockQty - itemQty;
            //console.log("typeof(newStockQty) = typeof(stockQty - itemQty) = ", typeof(newStockQty)); //???

        itemPrice = parseInt(result[0].price); //number
            //console.log("typeof(itemPrice) = ", typeof(itemPrice));
        totalPrice = itemQty * itemPrice; //number
            //console.log("typeof(totalPrice) = ", typeof(totalPrice));
        
        displayItemPrice = formatter.format(itemPrice); //string
            //console.log("typeof(formatter.format(itemPrice)) = ", typeof(itemPrice));
        displayTotalPrice = formatter.format(totalPrice); //string
            //console.log("typeof(formatter.format(totalPrice)) = ", typeof(totalPrice));
        

        if(newStockQty >= 0) {//in stock
            
            console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
            console.log("B A M A Z O N  S H O P P I N G  C A R T");
            console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
            console.log(result[0].item_id+". "+result[0].department_name+" -> "+"'"+result[0].product_name+"' | Total Price: "+displayTotalPrice+" (Qty: "+itemQty+", Price: "+displayItemPrice+")");
            console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
            
            fulfillOrder();

        } else {//not in stock
            
            stockQty = parseInt(result[0].stock_quantity); //number
            itemQty = parseInt(itemQty); //back to number
       
            console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
            console.log("B A M A Z O N  S H O P P I N G  C A R T");
            console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
            console.log(result[0].item_id+". "+result[0].department_name+" -> "+"'"+result[0].product_name+"' | Requested Qty: "+itemQty+" | Remaining Qty: "+stockQty);
            console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n");
            console.log("We're sorry. There are not enough items in stock to fulfill your order. This order has been cancelled.");
            
            endConnection(connection);
        };
    });
}

/* -------------------------------- fulfillOrder() -------------------------------- */
/*
if your store _does_ have enough of the product, you should fulfill the customer's order.
* This means updating the SQL database to reflect the remaining quantity.
* Once the update goes through, show the customer the total cost of their purchase.
*/
function fulfillOrder() {
    //console.log("\nbegin fulfillOrder()");
    console.log("\nWe are now fulfilling your order...");
  
    newStockQty = stockQty - itemQty;
    //console.log("newStockQty (to be inserted into the database) = " + newStockQty);
    //UPDATE products_tbl SET stock_quantity = 2 WHERE item_id = 1;
    var SQLQuery1 = "UPDATE bamazon_db.products_tbl SET stock_quantity = " + newStockQty + " WHERE item_id = " + parseInt(itemId) + ";";

    var query = connection.query(SQLQuery1, function(error, result, fields) {
        if(error) throw error;
        console.log(result.message);
    });

    var SQLQuery2 = "SELECT * FROM bamazon_db.products_tbl WHERE item_id = " + parseInt(itemId) + ";";

    var query = connection.query(SQLQuery2, function(error, result, fields) {
        if(error) throw error;

          //console.log(result);
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("B A M A Z O N  C H A N G E  L O G");
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log(result[0].item_id+". "+"'"+result[0].product_name+"' | Remaining Qty: "+newStockQty);
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        
    });

    endConnection(connection); 

}

function cancelOrder() {
    //console.log("\nbegin cancelOrder()");
    console.log("Your order has been cancelled. Thank you and have a nice day!");
    endConnection(connection); 
}

/* -------------------------------- endConnection() -------------------------------- */

function endConnection(connectionArg) {
    //console.log("\nbegin endConnection()");

    connectionArg.end(function(error) {
        if(error) {
            console.log("\nconnection.end error = ", error);
        } else {
            console.log("\nconnection.end = success");
            console.log("Thank you. Come again.\n");
        }; 
    });
}



/* ============================ INQUIRER =================================== */

//inquirer.prompt().then();

/* inquirer.prompt([], function(answers) {
    console.log("do something with ", answers)
}); */

/* 
function doSomething(answers){
  // Do whateva you want!
}
var questions = [];
inquirer.prompt(questions, doSomething);
*/

/* -------------------------------- inquireWithUser0() -------------------------------- */

function inquireWithUser0() {
    //console.log("\nbegin inquireWithUser0()");
    console.log("\nGreetings, and welcome to Bamazon!");
    inquirer.prompt(questions0).then(function(answers) {
       console.log("Hello, " + answers.username + "...");
       inquireWithUser1();
       }
   );
}

var questions0 = [
    {
        message: "What is your name?",
        type: "input",
        name: "username",
        validate: function validateUserName(name){
            return name !== '';
        }
    }
];

/* -------------------------------- inquireWithUser1() -------------------------------- */

function inquireWithUser1() {
    //console.log("\nbegin inquireWithUser1()\n");
     inquirer.prompt(questions1).then(function(answers) {
        //console.log("And your answers are:", answers);
            if(answers.itemconfirm1 === true) { //true
                itemId = answers.itemid; //string!
                //console.log("itemId = typeof(answers.itemid) = ", typeof(answers.itemid)); //string
                //ask next question
                inquireWithUser2();
            } else { //false
                //ask same question again
                inquireWithUser1();
            }
        }
    );
}

var questions1 = [
    {
        type: "input",
        message: "What is the ID number of the item you would like to purchase?:",
        name: "itemid",    
        validate: function validateItemId(name){
            //var valueId = parseInt(name, 10);//NaN
            if(isNaN(name) || name == "") {//true
                //console.log("\nvalue = ", name);
                console.log("\nThat is not a valid ID. Please enter a valid number...");
                return false;
            } else {//false
                return true;
            };
        }
    },
    {
        type: "confirm",
        message: "Are you sure?",
        name: "itemconfirm1",
        default: true
    }
];

/* -------------------------------- inquireWithUser2() -------------------------------- */

function inquireWithUser2() {
    //console.log("\nbegin inquireWithUser2()\n");
    inquirer.prompt(questions2).then(function(answers) {
        //console.log("And your answers are:", answers);
            if(answers.itemconfirm2 === true) { //true
                //end questions
                console.log("\n");
                itemQty = answers.itemcount; //string!
                //console.log("itemQty = typeof(answers.itemcount) = ", typeof(answers.itemcount)); //string

                if(itemQty == 0) {
                    cancelOrder();
                } else { 
                    selectItemFromDB();  
                };

            } else { //false
                //ask same question again
                inquireWithUser2();
            }
        }
    );
}

var questions2 = [
    {
        type: "input",
        message: "How many would like to purchase? (Enter '0' to cancel the transaction):",
        name: "itemcount",
        validate: function validateItemCount(name){
            //var valueId = parseInt(name, 10);//NaN
            if(isNaN(name) || name == "") {//true
                //console.log("\nvalue = ", name);
                console.log("\nThat is not a valid quantity. Please enter a valid number...");
                return false;
            } else {//false
                return true;
            };
        }        
    },
    {
        type: "confirm",
        message: "Are you sure?",
        name: "itemconfirm2",
        default: true
    }
];





























