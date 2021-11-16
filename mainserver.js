
const path = require('path')
const fs=require('fs')
const ex=require("express");
const hbs=require("hbs");
const app=ex()

const cookieParser=require('cookie-parser')
const routes=require('./routes/Itemroutes')
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')
const bparser=require('body-parser');

var session = require('express-session')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(ex.static(publicDirectoryPath))

app.use(cookieParser());
app.use(session({secret: 'obydul', saveUninitialized: false, resave: false}));
app.use(ex.urlencoded({ extended: false }));


app.use(ex.json())
app.use('/api',routes.routes);
console.log(partialsPath)


  
 



app.get('',async (req,res)=>{

    var filebytesdata=await fs.readFileSync("items.txt");
    var stringdata=filebytesdata.toString();
var jsondata= JSON.parse(stringdata);
console.log(jsondata)
    res.render('index',{ItemList:jsondata})
})

app.get('/login',(req,res)=>{
    res.render('login',{success:req.session.success,errors:req.session.errors});
    req.session.errors=null;
})
app.get('/additem',(req,res)=>{
val= req.session.success;
    if(val=="Intern@lC@ll")
    res.render('additem')
    else
    res.render('login')
})

app.get('/contactus',(req,res)=>{

    res.render('contactus')
})
app.get('/aboutus',(req,res)=>{

    res.render('aboutus')
})


app.get('/index',async (req,res)=>{
    var filebytesdata=await fs.readFileSync("items.txt");
    var stringdata=filebytesdata.toString();
var jsondata= JSON.parse(stringdata);
console.log(jsondata)
    res.render('index',{ItemList:jsondata})
})
app.get('/emailerror',(req,res)=>{

    res.render('emailerror')
})
app.get('/getitem',(req,res)=>{
    val= req.session.success;
    if(val=="Intern@lC@ll")
    res.render('getitem')
    else
    res.redirect('/index')
})
app.get('/emailsent',(req,res)=>{

    res.render('emailsent')
})



app.get('/RentalEquipments',(req,res)=>{

    res.render('RentalEquipments')
})
app.get('/serviceandmaintainance',(req,res)=>{

    res.render('serviceandmaintainance')
})
app.get('/ForkliftSafetyGears',(req,res)=>{

    res.render('ForkliftSafetyGears')
})


// app.post('/updateitem',async(req,res)=>{

//     var name=req.body.name
//     var filebytesdata=await fs.readFileSync("items.txt");
//     var stringdata=filebytesdata.toString();
// var jsondata= JSON.parse(stringdata);


// var item=jsondata.filter(value=>{

// return value.name==name

// })
// console.log(item)


//     res.render('updateitem',...item)


// })

app.get('/updateerror',(req,res)=>{
    val= req.session.success;
    if(val=="Intern@lC@ll")
    res.render('updateerror')
    else
    res.redirect('/index')
})
app.get('/updatesuccess',(req,res)=>{
    val= req.session.success;
    if(val=="Intern@lC@ll")
    res.render('updatesuccess')
    else
    res.redirect('/index')
})





app.listen(3000,()=>{console.log("Server Started")});

