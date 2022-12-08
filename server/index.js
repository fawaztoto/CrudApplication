const express = require("express");
const app = express();
const bodyPraser = require("body-parser");
const mysql = require("mysql2")
const cors = require("cors")


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Neymar11",
    database: "crud_contact"
})

app.use(cors());
app.use(express.json());
app.use(bodyPraser.urlencoded({extended: true}));



app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_dbs"
    db.query(sqlGet, (error, result) =>{
        res.send(result)
    })
})


app.post("/api/post",(req,res) =>{
    const {name, email, contact} = req.body;
    const sqlInsert = "INSERT INTO contact_dbs (name, email, contact) VALUES (?, ? , ?)";
    db.query(sqlInsert, [name, email, contact],(error, result) => {
        if(error) {
            console.log(error)
        }
    })
})


app.delete("/api/remove/:id",(req,res) =>{
    const {id} = req.params;
    const sqlRemove = "DELETE FROM contact_dbs WHERE id = ? ";
    db.query(sqlRemove, id ,(error, result) => {
        if(error) {
            console.log(error)
        }
    })
})


app.get("/api/get/:id", (req, res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM contact_dbs WHERE id = ?"
    db.query(sqlGet, id, (error, result) =>{
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})


app.put("/api/update/:id", (req, res) => {
    const {id} = req.params;
    const {name, email, contact} = req.body
    const sqlUpdate = "UPDATE contact_dbs SET name = ?, email = ?, contact = ? WHERE id = ?"
    db.query(sqlUpdate, [name, email, contact, id], (error, result) =>{
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})



// app.get("/", (req, res) => {
//    const sqlInsert = "INSERT INTO contact_dbs (name, email, contact) VALUES (' fawaz lol', 'johndosse@gmail.com', 44373222)";
//    db.query(sqlInsert, (error, result) => {
//        console.log("error", error);
//     console.log("result", result)
//         res.send("hello express")
//     });
// });


app.listen(process.env.PORT || 5000, () => {
    console.log("server is running on port 5000")
})