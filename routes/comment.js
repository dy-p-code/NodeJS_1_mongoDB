const express = require("express");
const router = express.Router();
const comments = require("../schemas/comment.js");
const posts = require("../schemas/post.js")


// [댓글 작성 API]
router.post("/comments/:postId", async (req, res) => {
const {postId} = req.params;
const { commentContents, commentPassword, user } = req.body;
  // console.log(postId)

  const findPost = await posts.findOne({postId: postId})
  // console.log(findPost)

  if (findPost === null) {
    return res.status(400).json({"messageError":"게시글을 찾을 수 없습니다."});
  }
  if (commentContents === undefined || commentContents === "") {
    return res.status(400).json({"messageError":"댓글을 입력해주세요."});
  }
  await comments.create({ commentContents, commentPassword, user, postId });
  return res.json({"message":"댓글을 작성하였습니다."});
});


// [댓글 목록 조회 API]
router.get("/comments/:postId", async (req, res) => {
  const {postId} = req.params;
  const list = await comments.find({postId: postId});
  const findPost = await posts.findOne({postId: postId})

  if (findPost === null) {
    return res.status(400).json({"messageError":"게시글을 찾을 수 없습니다."});
  }

  const data = list.map((comment) => {
      return {
        commentId: comment.commentId, 
        user: comment.user,   
        content: comment.commentContents, 
        createdAt: comment.createdAt
      };
    });
    res.json({ data });  
  });


// [댓글 수정 API]
router.put("/comments/:commentId", async(req,res) => {
    const {commentId} = req.params;
    const commentPassword = req.body.commentPassword;
    const commentContents = req.body.commentContents;
    const findComment = await comments.findOne({commentId});

    // console.log(findComment)
    if (findComment === null) {
      return res.status(404).json({"messageError":"댓글을 찾을 수 없습니다."});
    }
    if (commentPassword !== findComment.commentPassword) {
      return res.status(400).json({
      "errorMessage": "댓글 수정에 실패하였습니다."});
    };
    if (commentContents === undefined || commentContents === "") {
      return res.status(400).json({"messageError":"댓글을 입력해주세요."});
    }
    await comments.updateOne({ commentId: Number(commentId) }, { $set: req.body });
    res.status(200).json({"message":"댓글 수정하였습니다."});
});


// [게시글 삭제 API]
router.delete("/comments/:commentId", async(req,res) => {
    const {commentId} = req.params;
    const commentPassword = req.body.commentPassword;
    const findComment = await comments.findOne({commentId});

    if (findComment === null) {
      return res.status(404).json({"messageError":"댓글을 찾을 수 없습니다."});
    }
    if (commentPassword !== findComment.commentPassword) {
      return res.status(400).json({
      "errorMessage": "댓글 삭제에 실패하였습니다."});
    }

    await comments.deleteOne({commentId});
    return res.status(200).json({"message":"댓글을 삭제하였습니다."});
  });


module.exports = router;