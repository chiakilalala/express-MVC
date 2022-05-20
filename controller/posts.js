
const successhandle = require('../service/successhandle');
const errorhandle = require('../service/errorhandle');
const Posts = require('../models/postsModel');
const Users = require('../models/userModel');

const posts ={

  async getPost(req,res){

    const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
    const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
    const AllPost = await Posts.find(q).populate({
          path: 'user',
          select: 'name photo '
          }).sort(timeSort);
  // asc 遞增(由小到大，由舊到新) createdAt ; 
  // desc 遞減(由大到小、由新到舊) "-createdAt"
   
    successhandle(res,AllPost)
  },
  async creatPosts(req,res,next){
    const { body } = req;
    const { user,content  } =body;
  
    try {
      if (user && content) {
        console.log(user,content)
          const UserExist = await Users.findById(user).exec();
          
        if (UserExist !== null ) {
        
          const newPost = await Posts.create({
            content,  user
          });
          successhandle(res,newPost)
        
        } else {
          errorhandle(res);
          

        }
      }else{
       errorhandle(res);
      }
      } catch (err) {
          errorhandle(res,err)
    
        
    }  
  },
  async patchPost(req,res,next){
    const id = req.params.id;
    const { body } = req;
    const { user,content } =body;
   
     const editContent ={
      user,content 
    };
    if(content && content.trim() !== ''){//避免輸入空白的防呆
        try {
          console.log(editContent)
          const updatePost = await Posts.findByIdAndUpdate(id,
            editContent,
          {   new: true ,// 回傳更新後的資料, default: false

          } 
         )
         updatePost !==null ?  successhandle(res,updatePost) :errorhandle(res);
      } catch (err) {
            errorhandle(res,err)
      }      
      }else{
        errorhandle(res);
    }

    
  },
  async deletePost(req,res,next){
    const AllPosts = await  Posts.deleteMany({})
    successhandle(res,AllPosts)
  },
  async deleteOnePost(req,res,next){
    try {
      const id = req.params.id;
      const delPost = await Posts.findByIdAndDelete(id);
      if(delPost !== null){
        const posts = await Posts.find();
        successhandle(res,delPost);
      }else{
        errorhandle(err)

      }
      } catch (err) {
          errorhandle(res,err)
    }
  }
}

module.exports =posts;