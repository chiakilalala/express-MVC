

const successhandle = (res,data)=>{
   
    res.status(200).send({
      "status": "success",
      data
    })
    res.end();
  
}
module.exports =successhandle;