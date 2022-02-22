const Comment= require('../models/comment');
 const Post=require('../models/post');




 module.exports.create=function(req,res)
{
    // we need to create comment over a post
    Post.findById(req.body.post,function(err,post){
        // if post is found then we create the comment
        if(post)
        {
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                // if the comments gets created
                post.comments.push(comment);
                post.save();

                return res.redirect('/');
            })
        }
    })

}