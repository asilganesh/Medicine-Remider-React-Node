// process.env.TZ='Asia/Kolkata'

// let express=require("express")
// let app=express();
// let conn=require("./db.js");
// const{json}=require("body-parser")
// const cors = require('cors');


// app.use(express.json())
// app.use(cors());


// app.get("/getdetails",(req,res)=>{

//     conn.query("select * from user_details",(err,data)=>{
//         if(data){
//             res.send(data)
//         }
//         else{
//             res.send(err)
//         }
//     })
// })

// app.post("/register",(req,res)=>{

//     conn.query("insert into user_details set?",req.body,(err,data)=>{

//         if(data){
//             res.send(data)
//         }
//         else{
//             res.send(err)
//         }
//     })
// })



// app.get('/getReminders',(req,res)=>{
//     conn.query("select * from reminders",(err,data)=>{
//         if(data){
//             res.send(data)
//         }
//         else{
//             res.send(err)
//         }
//     })
// })

// app.post("/PostRemeinders",(req,res)=>{

//     conn.query("insert into reminders set?",req.body,(err,data)=>{

//         if(data){
//             res.send(data)
//             console.log("data updated")
//         }
//         else{
//             res.send(err)
//             console.log(err)

//         }
//     })
// })


// app.listen(process.env.PORT || 3002,()=>{
//     console.log("server is running");
// })




process.env.TZ = 'Asia/Kolkata';

let express = require("express");
let app = express();
let conn = require("./db.js");
const { json } = require("body-parser");
const cors = require('cors');
const moment = require('moment-timezone');

app.use(express.json());
app.use(cors());

// Function to convert date and time to Kolkata time zone
function convertToKolkataTime(dateTime) {
    return moment.tz(dateTime, 'Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
}

app.get("/getdetails", (req, res) => {
    conn.query("SELECT * FROM user_details", (err, data) => {
        if (data) {
            res.send(data);
        } else {
            res.send(err);
        }
    });
});

app.post("/register", (req, res) => {
    const requestBody = req.body;
    requestBody.created_at = convertToKolkataTime(new Date());
    conn.query("INSERT INTO user_details SET ?", requestBody, (err, data) => {
        if (data) {
            res.send(data);
        } else {
            res.send(err);
        }
    });
});

// app.get('/getReminders', (req, res) => {
//     const requestBody = req.body;
//     requestBody.time = convertToKolkataTime(requestBody.time);
//     conn.query("SELECT * FROM reminders", (err, data) => {
//         if (data) {
//             res.send(data);
//         } else {
//             res.send(err);
//         }
//     });
// });

app.get('/getReminders', (req, res) => {
    conn.query("SELECT * FROM reminders", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            // Convert timestamps to Kolkata time zone
            const remindersWithKolkataTime = data.map(reminder => {
                return {
                    ...reminder,
                    time: convertToKolkataTime(reminder.time)
                };
            });
            res.send(remindersWithKolkataTime);
        }
    });
});


app.post("/PostRemeinders", (req, res) => {
    const requestBody = req.body;
    requestBody.time = convertToKolkataTime(requestBody.time);
    conn.query("INSERT INTO reminders SET ?", requestBody, (err, data) => {
        if (data) {
            res.send(data);
            console.log("Data updated");
        } else {
            res.send(err);
            console.log(err);
        }
    });
});

app.listen(process.env.PORT || 3002, () => {
    console.log("Server is running");
});
