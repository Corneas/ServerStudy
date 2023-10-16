const express = require('express');
const db = require('./mysql.js');

const app = express();
const conn = db.init();
const port = 3030;

app.use(express.json());

app.get("/", (req, res)=>
{
    var sql = "Select * From Ranks";
    conn.query(sql, function (err, result) {
        if(err) console.error("query is not excuted : " + err);
        else res.send(result);
    });
});

app.post('/score', (req, res) =>{
    var body = req.body;  
    var sql = "Select * from ranks";
    conn.query(sql, (err, result) =>{
        if(err) console.log("query is not excuted : " + err);
        else{
            var sql = "insert into ranks(Name, Score) Values(?,?)";
            var param = [body.Name, body.Score];
            conn.query(sql, param, (err) =>{
                if(err) console.log("query is not excuted : " + err);
                else res.sendStatus(200);
            });
        }
    });
});

app.post('/delete', (req, res) => {
    var body = req.body;
    var sql = "Select * from Ranks";
    conn.query(sql, (err, result) => {
        if(err) console.log("query is not excuted : " + err);
        else{
            var sql = "Delete From Ranks where Name = " + body.Name;

            conn.query(sql, (err) => {
                if(err) console.log("query is not excuted : " + err);
                else res.sendStatus(200);
            });
        }
    });
});

app.listen(port, ()=>
{
    console.log(`SERVER 실행됨 ${port}`);
});