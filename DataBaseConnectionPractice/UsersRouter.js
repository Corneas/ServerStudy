const express = require('express');
const UserDBC = require('./UserDBC');
const router = express.Router();

router.post('/addUser', async (req, res) => {
    try{
        const user = req.body;
        await UserDBC.insertUsers(user);
        res.status(200).send('User added successfully.');
    } catch (error){
        console.error('Error added user', error.message);
        res.status(500).send('Error adding user.');
    }
});

router.get('/getUsers', async(req, res)=>{
    let res_get_users = {
        status_code:500,
        users: []
    };

    try{
        const rows = await UserDBC.getUsers();
        res_get_users.status_code = 200;
        if(rows.length > 0){
            rows.forEach((user)=>{
                res_get_users.users.push({
                    userId: user.userId,
                    userPassword: user.userPassword,
                    userNmae: user.userNmae,
                    userSignUpdate: userSignUpdate
                });
            });
        }
        else{
            console.log("사용자 없음");
        }
    }
    catch(error)
    {
        console.log(error.message);
    }
    finally{
        var result = '';

        for(var i = 0; i < res_get_users.length; ++i){
            result += res_get_users.users[i].userId;
            result += res_get_users.users[i].userPassword;
            result += res_get_users.users[i].userNmae;
            result += res_get_users.users[i].userSignUpdate;

            result += "<br>";
        }

        res.send(result);
    }
});

module.exports = router;