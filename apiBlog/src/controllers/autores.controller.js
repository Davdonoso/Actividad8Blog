const Autor = require("../models/autores.model");
const Post = require("../models/posts.model");

// Autor Controller
const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const autor = await Autor.selectAll(Number(page), Number(limit));
  res.json({
    page: Number(page),
    limit: Number(limit),
    total: autor.length,
    data: autor,
  });
};

const getById = async (req, res) => {
  /*const { autorId } = req.params;
  const autor = await Autor.selectById(autorId);
 
  res.json(autor);*/
  res.json(req.autores);
};

const getAutoresAndPost = async (req, res) => {
  const autores = await Autor.selectAll(1, 500);

  for (const autor of autores) {
    const posts = await Post.selectByAutorId(autor.id);
    autor.posts = posts;
  }
  if (autores.length === 0) {
    return res.status(404).json({ message: "No se encontraron autores" });
  }
  if (autores.length === 1 && autores[0].posts.length === 0) {
    return res.status(404).json({ message: "No se encontraron posts para este autor" });
  }

  res.json(autores);
};

const create = async (req, res) => {
  const result = await Autor.insert(req.body);
  const { nombre, email, imagen } = req.body;
  const autor = await Autor.selectById(result.insertId);

  res.json(autor);
};

const update = async (req, res) => {
  const { autorId } = req.params;
  await Autor.update(autorId, req.body);
  const autor = await Autor.selectById(autorId);
  if (JSON.stringify(autor) === JSON.stringify(req.autores)) {
    return res.status(400).json({ message: "No se han realizado cambios" });
  }
  res.json(autor);
};

const remove = async (req, res) => {
  const { autorId } = req.params;
  const result = await Autor.remove(autorId);
  const autores = await Autor.selectAll(1, 1000);

  res.json({ message: "Autor eliminado", data: autores });
};

module.exports = { getAll, getById, create, getAutoresAndPost, update, remove };
