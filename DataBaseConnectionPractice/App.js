const express = require('express');
const usersRouter = require('./UsersRouter');

const app = express();
const port = 5000;

app.use(express.json());

app.use(`/Ranks`, usersRouter);

// app.get('/', (req, res)=>
// {
//     res.send(`<h2>welcome to server</h2>`);
// });

app.get('/', (req, res) => {
    
})

app.listen(port, ()=>
{
    console.log(`SERVER 실행됨 ${port}`);
});