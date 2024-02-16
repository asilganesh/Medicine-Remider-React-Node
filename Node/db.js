let sql=require("mysql");


let con=sql.createConnection({

    host:"localhost",
    user:"root",
    password:"Ganesh@464",
    database:"medicine_reminder_app"
})

con.connect(()=>{
    console.log("Database Connected")
})

module.exports=con