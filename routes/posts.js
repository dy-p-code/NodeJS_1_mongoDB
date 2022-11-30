const express = require("express");
const router = express.Router();
const posts = require("../schemas/post.js");



// [게시글 작성 API]
const Posts = require("../schemas/post.js");
router.post("/posts", async (req, res) => {

  // const postsDate = new Date(postsDate);
	const { postId, title, name, postsDate, password, contents } = req.body;
  const posts = await Posts.find({ postId });
  if (posts.length) {
    return res.status(400).json({
    "errorMessage": "데이터 형식이 올바르지 않습니다."});
  };

  const createdPosts = await Posts.create({ postId, title, name, postsDate, password, contents });
  res.json({"message":"게시글을 작성하였습니다."});
});



///// 날짜순서 내림차순 정렬 /////
// [전체 게시글 목록 조회 API]
router.get("/posts", async (req, res) => {
  const list = await posts.find();
  res.json({ list });
  });



// [게시글 상세 조회 API]
router.get("/posts/:postId", async (req, res) => {
    const {postId} = req.params;
    const detail = await posts.findOne({postId:postId});

    if (typeof detail === 'undefined' || detail === null) {
      return res.status(400).json({
        "errorMessage": "데이터가 없습니다."});
    };

    const detailPost = detail
    res.json({detailPost});
});



// [게시글 수정 API]
router.put("/posts/:postId", async(req,res) => {
    const {postId} = req.params;
    const password = req.body.password;
    const contents = req.body.contents;
    const findPosts = await posts.findOne({postId});

  if (password !== findPosts.password) {
    return res.status(400).json({
    "errorMessage": "게시글 수정에 실패하였습니다."});
  };

  const modifyPosts = await posts.updateOne({ postId: Number(postId) }, { $set: req.body });
  res.status(200).json({"message":"게시글을 수정하였습니다."});
});



// [게시글 삭제 API]
router.delete("/posts/:postId", async(req,res) => {
  const {postId} = req.params;
  const password = req.body.password;
  const findPosts = await posts.findOne({postId});

    if (typeof findPosts === 'undefined' || findPosts === null) {
      return res.status(400).json({"errorMessage":"데이터 형식이 올바르지 않습니다."});
    };
  
    if (password === findPosts.password) {
      await posts.deleteOne({postId});
      return res.status(200).json({"message":"게시글을 삭제하였습니다."});
    };
  });




module.exports = router;