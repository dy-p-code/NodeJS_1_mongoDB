const express = require("express");
const router = express.Router();
const Comments = require("../schemas/comment.js");



// [댓글 작성 API]
const comments = require("../schemas/comment.js");
router.post("/comments", async (req, res) => {

const { commentId, commentContents, commentDate, commentPassword } = req.body;

if (commentContents === "") {
  return res.json({"messageError":"댓글을 입력해주세요."});
};

const createComments = await comments.create({ commentId, commentContents, commentDate, commentPassword });
  return res.json({"message":"댓글을 작성하였습니다."});
});


// [댓글 목록 조회 API]
router.get("/comments", async (req, res) => {
    const commentList = await comments.find();
    res.json({ commentList });
});


// [댓글 수정 API]
router.put("/comments/:commentId", async(req,res) => {
    const {commentId} = req.params;
    const commentPassword = req.body.commentPassword;
    const commentContents = req.body.commentContents;
    const findComment = await comments.findOne({commentId});

    if (commentPassword !== findComment.commentPassword) {
      return res.status(400).json({
      "errorMessage": "댓글 수정에 실패하였습니다."});
    };

    if (commentContents === "") {
      return res.json({"messageError":"댓글을 입력해주세요."});
    };

    const modifyComments = await comments.updateOne({ commentId: Number(commentId) }, { $set: req.body });
    res.status(200).json({"message":"댓글 수정하였습니다."});
});


// [게시글 삭제 API]
router.delete("/comments/:commentId", async(req,res) => {
    const {commentId} = req.params;
    const commentContents = req.body.commentContents;
    const commentPassword = req.body.commentPassword;
    const findComment = await comments.findOne({commentId});

    if (typeof findComment === 'undefined' || findComment === null) {
      return res.status(400).json({"errorMessage":"데이터 형식이 올바르지 않습니다."});
    };
  
    if (commentPassword !== findComment.commentPassword) {
      await comments.deleteOne({commentId});
      return res.status(200).json({"message":"댓글을 삭제하였습니다."});
    };
  });


module.exports = router;