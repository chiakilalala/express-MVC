const successhandle = require('../service/successhandle');
const errorhandle = require('../service/errorhandle');

const Users = require('../models/userModel');

const User ={
  async getUsers(req,res){
      const getUser = await Users.find();
      successhandle(res,getUser);

  }
};

module.exports =User;