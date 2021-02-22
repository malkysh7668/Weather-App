const router=require("express").Router();
const bodyParser = require('body-parser')

const {getUser,getAllUsers,getAll,saveUser,getUserLogin,getUserByEmail}=require("../controllers/user")
const {getHistory,saveHistory,getAllHistory,getHistoryForUser}=require("../controllers/history")
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()
router.get('/getUserById/:id',getUser);
router.get('/getUserByEmail/:email',getUserByEmail);
router.get('/getUserLogin/:email/:pass',getUserLogin);
router.get('/getAll',getAll);
router.get('/getAllUsers',getAllUsers);
router.post('/newUser',saveUser);
router.post('/saveHistory',saveHistory);
router.get('/getHistory',getHistory);
router.get('/getAllHistory',getAllHistory);
router.get('/getHistoryForUser/:userId',getHistoryForUser);

module.exports=router;
