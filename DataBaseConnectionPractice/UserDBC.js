const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults.
// 연결 풀을 생성한다. 풀의 세팅은 디폴트이다.
const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        database: 'test',
        password: 'q1w2e3r4',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
)

const getUsers = async () => {
    const promisePool = pool.promise();
    const [rows] = await promisePool.query('select * from users');
    console.log(rows);
    return rows;
};

module.exports =
{
    getUsers
}