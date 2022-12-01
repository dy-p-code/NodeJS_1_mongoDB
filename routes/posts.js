const express = require("express");
const router = express.Router();
const posts = require("../schemas/post.js");


// [게시글 작성 API]
router.post("/posts", async (req, res) => {
try{
  // const postsDate = new Date(postsDate);
	const { title, name, password, contents } = req.body;

  await posts.create({ title, name, password, contents });
  res.json({"message":"게시글을 작성하였습니다."});
}catch(error){
res.status(500).json({error})
}
});



// [전체 게시글 목록 조회 API]
router.get("/posts", async (req, res) => {
try{
  const list = await posts.find().sort({createdAt: -1})
  const data = list.map((post) => {
	return {
    postId: post.postId,  //post 폴더에 저장된거
    user: post.name,   
    title: post.title,
    createdAt: post.createdAt
    };
  });
  res.json({ data });
}catch(error){
res.status(500).json({error})
}
});



// [게시글 상세 조회 API]
router.get("/posts/:postId", async (req, res) => {
try{
  const {postId} = req.params;
  const detail = await posts.find({postId:postId});
    // console.log(detail)
    if (detail.length === 0) {
      return res.status(400).json({
        "errorMessage": "데이터가 형식이 올바르지 않습니다."});
    };
  const data = detail.map((post) => {
    return {
      postId: post.postId,
      user: post.name,   
      title: post.title,
      content: post.contents,
      createdAt: post.createdAt
    };
  });
  res.json({data});
}catch(error){
res.status(500).json({error})
}
});


// [게시글 수정 API]
router.put("/posts/:postId", async(req,res) => {
try{
  const {postId} = req.params;
  const password = req.body.password;
  const findPosts = await posts.findOne({postId});

  if (password !== findPosts.password) {
    return res.status(400).json({
    "errorMessage": "게시글 수정에 실패하였습니다."});
  };

  await posts.updateOne({ postId: Number(postId) }, { $set: req.body });
  res.status(200).json({"message":"게시글을 수정하였습니다."});
}catch(error){
res.status(500).json({error})
}
});



// [게시글 삭제 API]
router.delete("/posts/:postId", async(req,res) => {
try{
  const {postId} = req.params;
  const password = req.body.password;
  const findPosts = await posts.findOne({postId});
 
  // console.log(findPosts)
  if (findPosts === null){
    return res.status(400).json({"messageError":"형식이 일치하지 않습니다."});
    };

  if (password !== findPosts.password) {
      return res.status(400).json({"messageError":"비밀번호가 일치하지 않습니다."});
    };

  await posts.deleteOne({ postId: Number(postId) }); 
  res.status(200).json({"message":"게시글을 삭제하였습니다."});
}catch(error){
  res.status(500).json({error})
}
});



module.exports = router;