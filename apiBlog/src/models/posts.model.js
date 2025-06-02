const db = require("../config/db");

const selectByAutorId = async (autorId) => {
  const [result] = await db.query("select * from posts where autor_id = ?", [
    autorId,
  ]);
  return result;
};

const selectByPostId = async (postId) => {
  const [result] = await db.query("select * from posts where id = ?", [postId]);
  if (result.length === 0) {
    throw new Error("Post not found");
  }
  return result;
};

const selectAllPosts = async (page, limit) => {
  const [result] = await db.query(
    "select * from posts order by id desc limit ? offset ?",
    [limit, (page - 1) * limit]
  );
  return result;
};

const selectAllPostsAndAutor = async (page, limit) => {
  const [result] = await db.query(
    "select posts.*, autores.nombre, autores.email, autores.imagen from posts inner join autores on posts.autor_id = autores.id order by posts.id desc limit ? offset ?",
    [limit, (page - 1) * limit]
  );
  return result;
}

const insert = async (titulo, descripcion, categoria, autor_id) => {
  const [result] = await db.query(
    "insert into posts (titulo, descripcion,categoria,autor_id) values (?, ?, ?, ?)",
    [titulo, descripcion, categoria, autor_id]
  );
  return result;
};

const update = async (postId, { titulo, descripcion, categoria, autor_id }) => {
  const [result] = await db.query(
    "update posts set titulo = ?, descripcion = ?, categoria = ?, autor_id = ? where id = ?",
    [titulo, descripcion, categoria, autor_id, postId]
  );
  return result;
};

const remove = async (postId) => {
  const [result] = await db.query("delete from posts where id = ?", [postId]);
  return result;
};

module.exports = {
  selectByAutorId,
  selectByPostId,
  selectAllPosts,
  selectAllPostsAndAutor,
  insert,
  update,
  remove,
};
