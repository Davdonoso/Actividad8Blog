const router = require("express").Router();
const {
  getPostsById,
  getAllPosts,
  createPost,
  updatePost,
  removePost,
  getPostsAndAutor,
  getPostsAndAutorById
} = require("../../controllers/posts.controller");

const { checkpostId, checkdataPost } = require("../../middleware/posts.middleware");

router.get("/", getAllPosts);
router.get("/autor", getPostsAndAutor);
router.get("/autor/:autorId", getPostsAndAutorById);
router.get("/:postId",checkpostId,getPostsById);
router.post("/",checkdataPost, createPost);
router.put("/:postId", checkpostId,checkdataPost,updatePost);
router.delete("/:postId",checkpostId, removePost);
module.exports = router;
