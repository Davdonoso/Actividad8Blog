const Post = require("../models/posts.model");
const Autor = require("../models/autores.model");


const getAllPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const posts = await Post.selectAllPosts(Number(page), Number(limit));
  res.json({
    page: Number(page),
    limit: Number(limit),
    total: posts.length,
    data: posts,
  });
};

const getPostsById = async (req, res) => {
  const { postId } = req.params;
  const posts = await Post.selectByPostId(postId);
  res.json(posts);
};


const getPostsAndAutor = async (req, res) => {
  const posts = await Post.selectAllPosts(1, 500);

  for (const post of posts) {
    const autor = await Autor.selectById(post.autor_id);
    if (autor) {
      post.autor = {
        nombre: autor.nombre,
        email: autor.email,
        imagen: autor.imagen,
      };
    } else {
      post.autor = null;
    }
    
  }

  res.json(posts);
};

const getPostsAndAutorById = async (req, res) => {
  const { autorId } = req.params;
  const autor = await Autor.selectById(autorId);
  if (!autor) {
    return res.status(404).json({ message: "Autor no encontrado"});
  }
  const posts = await Post.selectByAutorId(autorId);
  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    return res.status(404).json({ message: "No se encontraron posts para este autor" });
  }

  for (const post of posts) {
    post.autor = {
      nombre: autor.nombre,
      email: autor.email,
      imagen: autor.imagen,
    };
  }

  res.json(posts);
}
const createPost = async (req, res) => {
  
  const { titulo, descripcion, categoria, autor_id } = req.body;
  const autor = await Autor.selectById(autor_id);
  if (!autor) {
    return res.status(400).json({ mensaje: 'El autor no existe.' });
  }
  const result= await Post.insert(titulo, descripcion, categoria, autor_id);
  const post = await Post.selectByPostId(result.insertId);
  

  res.json(post);
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  
  const { titulo, descripcion, categoria, autor_id } = req.body;
  const autor = await Autor.selectById(autor_id);
  if (!autor) {
    return res.status(400).json({ mensaje: 'El autor no existe.' });
  }
  const result = await Post.update(postId, req.body);
  const post = await Post.selectByPostId(postId);

  if (JSON.stringify(post) === JSON.stringify(req.posts)) {
    return res.status(400).json({ message: "No se han realizado cambios" });
  }
    res.json(post);
};

const removePost = async (req, res) => {
  const { postId } = req.params;
  const result = await Post.remove(postId);
  const posts = await Post.selectAllPosts(1, 1000);

  res.json({ message: "Post eliminado", data: posts });
};

module.exports = {
  getPostsById,
  getAllPosts,
  createPost,
  updatePost,
  removePost,
  getPostsAndAutor,
  getPostsAndAutorById
};
