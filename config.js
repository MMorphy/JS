module.exports={
    port: process.env.PORT || 8002,
    pool: {
        connectionLimit: 50,
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'jsbaza',
        debug: 'false',
        waitForConnections : 'false'
    },
    secret: 'qwertzasdfgyxcvqwertasdfgyxcv'
}