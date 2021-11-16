const fs=require('fs')


const addItem=(req,res)=>{
try{
    val= req.session.success;
    if(val=="Intern@lC@ll")
    {
    console.log(req.body)
    
    var filebytesdata=fs.readFileSync("items.txt");

    if(filebytesdata.length>2)
    {
    var stringdata=filebytesdata.toString();
    var jsondata=JSON.parse(stringdata)
    jsondata.push(
        req.body
    )
    
    fs.writeFileSync("items.txt",JSON.stringify(jsondata))
    res.status(201).send(
        {
            Message:"ItemAdded",
            name:req.body.name
        }
    )
    
    }
    else{
        fs.writeFileSync("items.txt","["+(JSON.stringify(req.body))+"]")
        res.status(201).send(
            {
                Message:"Item",
                With_name:req.body.name
            }
        )
    
    }
}
else
{
    res.status(400).send("not authenticvated")

}
    
}
catch(error){

res.status(400).send(error.message)

}



}


const getItems=(req,res,next)=>{


    var filebytesdata=fs.readFileSync("items.txt");

if(filebytesdata.length==0)
{
res.status(200).send(
    {
        message:"No Data Available"
    }
)


}
else{
var stringdata=filebytesdata.toString();
var jsondata=JSON.parse(stringdata);

res.status(200).send(jsondata);
}
    

    
}


const updateItem=(req,res,next)=>{


    var filebytesdata=fs.readFileSync("items.txt");
    var stringdata=filebytesdata.toString();
var jsondata=JSON.parse(stringdata)
    var name=req.body.name
      
      var item=jsondata.filter(x=>{

return x.name==name

      })

    if(filebytesdata.length>2)
    {

if(item.length>0)
    {
       
        item.name=req.body.name
        item.model=req.body.model
        item.capacity=req.body.capacity
        item.motor=req.body.motor
        item.transmission=req.body.transmission
        item.yearofmanufacture=req.body.yearofmanufacture
        item.mast=req.body.mast
        item.maxlifting=req.body.maxlifting
        item.loweredheight=req.body.loweredheight
        item.details=req.body.details
        item.img1=req.body.img1
        item.img2=req.body.img2
        item.img3=req.body.img3
        item.img4=req.body.img4
        item.img5=req.body.img5
        item.img6=req.body.img6

        for(let s in jsondata)
        {

if(jsondata[s].name==name)
{
jsondata.splice(s,1)

console.log(item.name)
jsondata.push({
  name:item.name,
  model: item.model,
  capacity:  item.capacity,
  motor:  item.motor,
  transmission:  item.transmission,
  yearofmanufacture:   item.yearofmanufacture,
  mast: item.mast,
  maxlifting: item.maxlifting,
  loweredheight:  item.loweredheight,
  details: item.details,
  img1: item.img1,
  img2: item.img2,
  img3:  item.img3,
  img4: item.img4,
  img5:  item.img5,
  img6: item.img6,
   
})

fs.writeFileSync("items.txt",JSON.stringify(jsondata))

res.redirect('/getitem',{});


}

        }
        






    }
    else{

        res.redirect('/updateerror')
    }


    }
    else{

        res.status(404).send({
            message:"No Data Available",
        
        })
    }







}

const deleteItem=(req,res,next)=>{
    val= req.session.success;
    if(val=="Intern@lC@ll")
{
var filebytesdata=fs.readFileSync("items.txt");
if(filebytesdata.length>2)
{
    console.log(filebytesdata.length)
    var stringdata=filebytesdata.toString();
    var jsondata=JSON.parse(stringdata);
    var name=req.body.name
    
    var item=jsondata.filter(x=>{

return x.name==name

    })
if(item.length>0)
{

  for(let s in jsondata)
  {
      if(jsondata[s].name==name)
      {
jsondata.splice(s,1)


      }

  }
   


    fs.writeFileSync("items.txt",JSON.stringify(jsondata))


    //index,number of item
    res.redirect('/updatesuccess')

}
else{
    res.redirect('/updateerror')
}

}
else{


    res.redirect('/updateerror')
}
}
else{

    {
        res.status(400).send("not authenticvated")
    
    }
}
}


const getItem=(req,res,next)=>{
    var name=req.body.name
    var filebytesdata=fs.readFileSync("items.txt");
    var stringdata=filebytesdata.toString();
var jsondata=JSON.parse(stringdata);


var item=jsondata.filter(value=>{

return value.name==name

})
if(item.length>0)
{

    res.send(...item)
}
else{

    res.send({

            message:"no Item found"
         })
}
}





module.exports={

addItem,
getItems,
updateItem,
deleteItem,
getItem
}