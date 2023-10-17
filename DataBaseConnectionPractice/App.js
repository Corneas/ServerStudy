const express = require('express');
const db = require('./mysql.js');

const app = express();
const conn = db.init();
const port = 3030;

app.use(express.json());

const RANKS_TABLE = 'Ranks';

app.get("/", (req, res)=>
{
    var sql = "Select * From Ranks";
    conn.query(sql, function (err, result) {
        if(err) console.error("query is not excuted : " + err);
        else res.send(result);
    });
});

app.post('/score', (req, res) =>{
    const {Name, Score} = req.body;

    const checkDuplicateQuery = `SELECT EXISTS (SELECT Name FROM ${RANKS_TABLE} WHERE Name = ? LIMIT 1) AS success`;
    const insertQuery = `INSERT INTO ${RANKS_TABLE} (Name, Score) VALUES (?, ?)`;
    const updateQuery = `UPDATE ${RANKS_TABLE} SET Score = ? WHERE Name = ?`;   

    conn.query(checkDuplicateQuery, [Name], (err, result) => {
        if(err) console.log("query is not excuted : " + err);

        if(result[0].success === 0){
            conn.query(insertQuery, [Name, Score], (err) => {
                if(err) console.log("query is not excuted : " + err);
                else res.sendStatus(200);
            });
        }
        else{
            conn.query(`Select Score From ${RANKS_TABLE} where Name = ?`, [Name], (err, rows) => {
                if(err) console.log('query is not excuted : ' + err);
                else{
                    const existingScore = rows[0].Score;
                    if(existingScore < Score){
                        conn.query(updateQuery, [Score], (err) => {
                            if(err) console.log("query is not excuted : " + err);
                            else res.sendStatus(200);
                        });
                    }
                }
            });
        }
    });
});

// 값 제거
app.post('/delete', (req, res) => {
    const {Name} = req.body;
    const deleteQuery = `Delete From ${RANKS_TABLE} where Name = ?`;

    conn.query(deleteQuery, [Name], (err) =>{
        if(err) console.log("query is not excuted : " + err);
        else res.sendStatus(200);
    });
});

app.get('/score/:Name', (req, res) => {
    const findScoreByIdQuery = `Select Score From ${RANKS_TABLE} where Name = ?`;

    conn.query(findScoreByIdQuery, [req.params.Name], (err, result) => {
        if(err) console.log("query is not excuted : " + err);
        else res.send({cmd : 1101, result});
    });
});

app.listen(port, ()=>
{
    console.log(`SERVER 실행됨 ${port}`);
});