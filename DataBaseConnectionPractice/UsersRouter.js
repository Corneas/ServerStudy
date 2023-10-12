const express = require('express');
const UserDBC = require('./UserDBC');
const router = express.Router();

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