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

    // 중복체크
    var sql = `select EXISTS (select Name from Ranks where Name = "${body.Name}" limit 1) as success`;
    conn.query(sql, (err, result) => {
        if(err) console.log("query is not excuted : " + err);
        
        // 만약 값이 0개라면
        if(result[0].success == 0){
            var sql = "Select * from ranks";
            // 값 추가
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
        }
        else{   // 만약 Name이 이미 존재한다면
            // 업데이트
            var sql = "select Score From Ranks Where Name = " + body.Name;
            if(conn.query(sql) < body.Score){
                var sql = "Update Ranks Set Score = " + body.Score + " Where Name = " + body.Name;
                conn.query(sql);
            }
        }
        
    });
});

// 값 제거
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