module.exports=function (express,jwt,secret,bcrypt) {

    const router = express.Router();

    router.get('/', (req,res) => {
        res.json({msg: 'Test'})
    });

    router.route('/login').post(async function (req, res) {
    let pool = require('../../db');
        try{
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
        let data = JSON.stringify(req.body.data);
        console.log("Ja sam u api.js: " + data);
        console.log("Ja sam datin passowrd" + JSON.stringify(data.password));
        let username = data.username;
        let password = await bcrypt.hash(data.password, 10);
        try {
            let rs = await pool.query('SELECT * FROM user WHERE username=?', data.username,);
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

    router.route('/items').get(async function (req, res) {
        let pool = require('../../db');
        try{
            let rs = await pool.query('SELECT * FROM item');
            res.json({status: 200, items:rs});
        } catch (e){
            console.log(e);
            return res.json({status:500, message:"Internal Server Error"})
        }
    }).post(async function (req,res) {
        if (req.body.data.item.name != null && req.body.data.item.price != null && req.body.data.item.available != null && req.body.data.item.categoryId != null) {
            let pool = require('../../db');
            try{
                let rs = await pool.query('SELECT id FROM item ORDER BY id desc LIMIT 1');
                let itemId = rs[0].id + 1;
                let itemToInsert = {
                    id: itemId,
                    name: req.body.data.item.name,
                    price: req.body.data.item.price,
                    available: req.body.data.item.price,
                    categoryId: req.body.data.item.category_id
                }

                let rs2 = await pool.query('INSERT INTO item SET ?', itemToInsert);
                return res.json({status: 200, message: "Successful item insert!", insertId:itemToInsert.id});
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
            let itemToUpdate = {
                id: req.body.data.item.id,
                name: req.body.data.item.name,
                price: req.body.data.item.price,
                available: req.body.data.item.price,
                categoryId: req.body.data.item.category_id
            }
            let rs = await pool.query('UPDATE item SET ? WHERE id = ?', [itemToUpdate, itemToUpdate.id]);
            return res.json({status: 200, message: "Successful item update!", updateId:itemToUpdate.id});
        } catch (e) {
            console.log(e);
            return res.json({status: 500, message: "Internal Server Error"})
        }

    });
    router.route('/items/:id').delete(async function (req,res){
        let pool = require('../../db');
        if (req.params.id == null){
            return res.json({status: 400, message: "Bad request"});
        }
        else {
            let rs = await pool.query('DELETE FROM item WHERE id = ?', req.params.id);
            return res.json({status: 200, message: "Successful item delete!", deleteId:req.params.id});
        }
    });
    return router;
};