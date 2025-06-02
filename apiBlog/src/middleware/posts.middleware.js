const Posts = require("../models/posts.model");

const checkpostId = async (req, res, next) => {
  const { postId } = req.params;

  if (isNaN(postId)) {
    return res.status(400).json({ message: "El id debe ser un número" });
  }

  const posts = await Posts.selectByPostId(postId);
  if (!posts) {
    return res.status(404).json({ message: "El post no existe" });
  }

  req.posts = posts;

  next();
};

const checkdataPost = (req, res, next) => {
  const { titulo, descripcion, categoria, autor_id } = req.body;

  if (!titulo || !descripcion || !categoria || !autor_id) {
    return res
      .status(400)
      .send.json({message: "El titulo, descripcion, categoria y el autor_id son obligatorios"});
  }

  next();
}

module.exports = { checkpostId, checkdataPost };
