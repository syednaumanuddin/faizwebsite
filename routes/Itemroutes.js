const ex=require('express');
const {addItem,deleteItem,updateItem,getItems,getItem}=require('../controllers/ItemController');
const {verify,logout} =require('../controllers/login')
const {sendemail} =require('../controllers/sendemailcontroller')
const router=ex.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/equipments/')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname) //Appending .jpg
  }
})

var upload = multer({ storage: storage });




router.post('/additem',upload.array('photos', 6),addItem);
router.post('/updateitem',updateItem);
router.post('/getitems',getItems);
router.post('/getitem',getItem);
router.post('/deleteitem',deleteItem);

router.post('/login',verify)

router.post('/logout',logout)
router.post('/sendemail',sendemail)
module.exports={
    routes:router
}