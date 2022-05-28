
const successhandle = require('../service/successhandle');
const errorhandle = require('../service/errorhandle');
const handleErrorAsync = require('../service/handleErrorAsync');
const appError = require('../service/appError');
const Posts = require('../models/postsModel');
const Users = require('../models/userModel');

const posts ={

 getPost:handleErrorAsync(async(req,res)=>{

    const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
    const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
    const AllPost = await Posts.find(q).populate({
          path: 'user',
          select: 'name photo '
          }).sort(timeSort);
    successhandle(res,'資料讀取成功',AllPost)
 }),
 creatPosts:handleErrorAsync(async(req,res,next)=>{
  const { body } = req;
  const { name,content,image,user } =body;

      if (content == undefined) {
        console.log(req.body)
        return appError(400, '沒有填寫 content 資料', next);
      }else if(user == undefined){
      
        return appError(400, '此 User 不存在', next);
      }
        const getAllPosts = await Posts.create({
          name,content,image,user
        });
   
      console.log(getAllPosts);
      successhandle(res,200,getAllPosts);

 }),
 patchPost: handleErrorAsync(async(req,res,next)=>{
    const id = req.params.id;
    const { body } = req;
    const { name,content,image } =body;
    console.log(body)
    // const UserExist = await Users.findById(user).exec();
    const UserId = await Posts.findById(id).exec();
    const editContent ={
      name,content ,image
    };
    console.log(editContent)
    if(UserId ==null){
      appError(400, '無此貼文ID', next)
    }else if(!content && content.trim() == ''){
      appError(400, '內文不得空白', next)
    }else{
      
      const updatePost = await Posts.findByIdAndUpdate(id,
        editContent,
        {   new: true ,
            runValidators: true
            // 可以跑 Schema 驗證規則
        } 
      )
      successHandle(res,200,updatePost) ;
    }
 }),
 deletePost:handleErrorAsync(async(req,res,next)=>{
     if(req.originalUrl === '/posts/'){
      appError(400, '無此路由', next)
     }else{
      const AllPosts = await  Posts.deleteMany({})
      successhandle(res,'刪除成功',AllPosts,200)
     }
 }),
 deleteOnePost:handleErrorAsync(async(req,res,next)=>{
    
      const id = req.params.id;
      const delPost = await Posts.findByIdAndDelete(id);
      if(delPost !== null){
        const posts = await Posts.find();
        successhandle(res,'刪除成功',delPost,200);
      }else{
        appError(400, '無此ID', next);

      }
  
 })
}

module.exports =posts;