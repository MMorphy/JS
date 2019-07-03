module.exports=function (express,jwt,secret,bcrypt) {

    const router = express.Router();

    router.get('/', (req,res) => {
        res.json({msg: 'Hello!'})
    });

    //Login/Register
    router.route('/login').post(async function (req, res) {
    let pool = require('../../db');
        try{
            console.log("api body" + JSON.stringify(req.body));
            let rs = await pool.query('SELECT * FROM user WHERE username=?', req.body.data.username);
            if (rs.length == 0) {
                return res.json({status:400, message:"Invalid username/password"})
            }
            let isPasswdGood = await bcrypt.compare(req.body.data.password, rs[0].password);
            if (!isPasswdGood) {
                return res.json({status:400, message:"Invalid username/password"})
            }
            else {
                const jwtToken = jwt.sign({
                        username:rs[0].username
                    }, secret, {
                    expiresIn:6000
                    });
                return res.json({status:100, token:jwtToken, user:rs[0]});
            }
        } catch (e){
            console.log(e);
            return res.json({status:500, message:"Internal Server Error"})
        }
    });

    router.route('/register').post(async function (req, res) {
        let pool = require('../../db');
        console.log(req.body);
        let username = req.body.data.username;
        let password = await bcrypt.hash(req.body.data.password, 10);
        try {
            let rs = await pool.query('SELECT * FROM user WHERE username=?', username,);
            if (rs.length > 0) {
                res.json({status: 100, message: "Duplicate user"});
            } else {
                let query = await pool.query('INSERT INTO user VALUES (?,?,NOW(),0)', [username, password]);
                res.json({status: 200, message: "Successful registration!"})
            }
        }
        catch (e) {
            console.log(e);
            return res.json({status:500, message:"Internal Server Error"})
        }
    });

    //User management
    router.route('/users')
        .get(async function (req, res) {
        let pool = require('../../db');
        try{
            let rs = await pool.query('SELECT * FROM user');
            res.json({status: 200, users:rs});
        } catch (e){
            console.log(e);
            return res.json({status:500, message:"Internal Server Error"})
        }
    }).put(async function (req,res){
        try{
            let pool = require('../../db');
            let userToUpdate = req.body.data;
            if (userToUpdate.password!= null) {
                userToUpdate.password = await bcrypt.hash(req.body.data.password, 10);
            }
            let rs = await pool.query('UPDATE user SET ? WHERE username = ?', [userToUpdate, userToUpdate.username]);
            return res.json({status: 200, message: "Successful item update!", updateUsername:userToUpdate.username});
        } catch (e) {
            console.log(e);
            return res.json({status: 500, message: "Internal Server Error"})
        }

    });
    router.route('/users/:username')
        .delete(async function (req,res){
        let pool = require('../../db');
        console.log()
        if (req.params.username == null){
            console.log("No params")
            return res.json({status: 400, message: "Bad request"});
        }
        else {
            let rs = await pool.query('DELETE FROM user WHERE username = ?', req.params.username);
            return res.json({status: 200, message: "Successful user delete!", deleteId:req.params.username});
        }
    });

    //Item management
    router.route('/items')
        .get(async function (req, res) {
        let pool = require('../../db');
        try{
            let rs = await pool.query('SELECT i.id, i.name, i.price, i.available, i.category_id, c.categoryName FROM item i JOIN category c on c.categoryId = i.category_id');
            console.log("ItemsGet")
            console.log(rs);
            return res.json({status: 200, items:rs});
        } catch (e){
            console.log(e);
            return res.json({status:500, message:"Internal Server Error"})
        }
    }).post(async function (req,res) {
        console.log(req.body);
        if (req.body.data.name != null && req.body.data.price != null && req.body.data.available != null && req.body.data.category_id != null) {
            let pool = require('../../db');
            try{
                let itemToInsert = {
                    name: req.body.data.name,
                    price: req.body.data.price,
                    available: req.body.data.available,
                    category_id: req.body.data.category_id
                }

                let rs = await pool.query('INSERT INTO item SET ?', itemToInsert);
                return res.json({status: 200, message: "Successful item insert!", insertId:rs[0]});
            } catch (e) {
                console.log(e);
                return res.json({status: 500, message: "Internal Server Error"})
            }
        }
        else {
            return res.json({status: 400, message: "Bad request"});
        }
    }).put(async function (req,res){
        try{
            let pool = require('../../db');
            console.log(req.body.data);
            let itemToUpdate = {
                id: req.body.data.id,
                name: req.body.data.name,
                price: req.body.data.price,
                available: req.body.data.available,
                category_id: req.body.data.category_id
            }
            let rs = await pool.query('UPDATE item SET ? WHERE id = ?', [itemToUpdate, itemToUpdate.id]);
            return res.json({status: 200, message: "Successful item update!", updateId:itemToUpdate.id});
        } catch (e) {
            console.log(e);
            return res.json({status: 500, message: "Internal Server Error"})
        }

    });
    router.route('/items/:id')
        .delete(async function (req,res){
        let pool = require('../../db');
        if (req.params.id == null){
            return res.json({status: 400, message: "Bad request"});
        }
        else {
            let rs = await pool.query('DELETE FROM item WHERE id = ?', req.params.id);
            return res.json({status: 200, message: "Successful item delete!", deleteId:req.params.id});
        }
    });

    //Category management
    router.route('/categories')
        .get(async function (req, res) {
            let pool = require('../../db');
            try{
                let rs = await pool.query('SELECT * FROM category');
                return res.json({status: 200, categories:rs});
            } catch (e){
                console.log(e);
                return res.json({status:500, message:"Internal Server Error"})
            }
        }).post(async function (req,res) {
        if (req.body.data.category.categoryName != null) {
            let pool = require('../../db');
            try{
                let categoryToInsert = {
                    categoryName: req.body.data.categoryName,
                };
                let rs = await pool.query('INSERT INTO category SET ?', categoryToInsert);
                return res.json({status: 200, message: "Successful item insert!", categoryName:categoryToInsert.categoryName});
            } catch (e) {
                console.log(e);
                return res.json({status: 500, message: "Internal Server Error"})
            }
        }
        else {
            return res.json({status: 400, message: "Bad request"});
        }
    }).put(async function (req,res){
        try{
            let pool = require('../../db');
            console.log("CAT PUT")
            console.log(req.body);
            let categoryToUpdate = {
                categoryId: req.body.data.categoryId,
                categoryName: req.body.data.categoryName,
            }
            let rs = await pool.query('UPDATE category SET ? WHERE categoryId = ?', [categoryToUpdate, categoryToUpdate.categoryId]);
            return res.json({status: 200, message: "Successful item update!", updateId:categoryToUpdate.id});
        } catch (e) {
            console.log(e);
            return res.json({status: 500, message: "Internal Server Error"})
        }

    });
    router.route('/categories/:id')
        .delete(async function (req,res){
            let pool = require('../../db');
            if (req.params.id == null){
                return res.json({status: 400, message: "Bad request"});
            }
            else {
                let rs = await pool.query('DELETE FROM category WHERE categoryId = ?', req.params.id);
                return res.json({status: 200, message: "Successful item delete!", deleteId:req.params.id});
            }
        });

    //Order management
    return router;
};