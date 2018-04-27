/*************************************
            REQUIREMENTS
 *************************************/

var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
/*************************************
            CONNECTIONS
 *************************************/


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    start();
});

/*************************************
            PROMPT
 *************************************/

function start() {
  
   // show table of products in database
   connection.query('SELECT * FROM products', function(err, res, fields){
       if(err){
           throw err;
       }
      // console.log("DEPARTMENT NAME: "+res[0].department_name + "PRICE: " + res[0].price )
      console.table(res);
      // console.log('FIELDS: '+ JSON.stringify(fields) )
      promptId()
   })
}

function promptId(){
    inquirer
    .prompt({
       name: "intro",
       type: "questions",
       message: "What would you like to buy? (Select by typing the ID number.)",
    }).then(function(answer,val){
        connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: answer
            },
        ],
        function(err, results){
            if (err) throw err;
            console.log ("Thank You for your purchase!")
        });

        // console.log("USER INPUT: "+JSON.stringify( val))

    })

    
}
