

const successhandle = (res,data)=>{
   
    res.status(200).send({
      "status": "success",
      data
    })
    console.log(res,data)
    res.end();
  
}
module.exports =successhandle;