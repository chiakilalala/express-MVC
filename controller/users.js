const successhandle = require('../service/successhandle');
const errorhandle = require('../service/errorhandle');
const handleErrorAsync = require('../service/handleErrorAsync');
const Users = require('../models/userModel');

const User ={
  getUsers:handleErrorAsync(async (req,res)=>{
    
      const getUser = await Users.find();
      console.log(getUser)
      successhandle(res,'資料讀取成功',getUser);
 
  })

}
module.exports =User;