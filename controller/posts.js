
const successhandle = require('../service/successhandle');
const errorhandle = require('../service/errorhandle');
const Posts = require('../models/posts');


const posts ={

  async getPost(req,res){
    const AllPost =  await Posts.find({});
    successhandle(res,AllPost)
  
  },
  async creatPosts(req,res,next){
    const { body } = req;
    const { name, tags, type, image, content, likes, comments  } = body

  
    if (content && content.trim() !== '') {
        //
        try {
          const newPost = await Posts.create({
            name, tags, type, image, content, likes, comments
          });
           
          successhandle(res,newPost)
              console.log(newPost)

        } catch (err) {
              errorhandle(res,err)
            
        } 
  }else{
        errorhandle(res);
    }
   
   
  },
  async patchPost(req,res,next){
    const id = req.params.id;
    const { body } = req;
    const { name, tags, type, image, content, likes, comments  } = body
   
     const editContent ={
      name, tags, type, image, content, likes, comments
    };
    if(content && content.trim() !== ''){//避免輸入空白的防呆
        try {
          console.log(editContent)
          const updatePost = await Posts.findByIdAndUpdate(id,
            editContent
          ,
          {   new: true ,// 回傳更新後的資料, default: false
              returnDocument: 'after', //返回更新後的資料，否則為更新前的資料。
           
          } 
         )
         if (updatePost !== null){
               successhandle(res,updatePost)
          }else{  
              errorhandle(res);
          }
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