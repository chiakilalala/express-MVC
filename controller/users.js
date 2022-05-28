const successhandle = require('../service/successhandle');
const errorhandle = require('../service/errorhandle');

const Users = require('../models/userModel');

const User ={
  async getUsers(req,res){
    try {
      const getUser = await Users.find();
      console.log(getUser)
      successhandle(res,getUser);
    } catch (error) {
      errorhandle(res);
    }
    


  }
};

module.exports =User;