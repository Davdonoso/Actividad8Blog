const db = require("../config/db");

const selectAll = async (page, limit) => {
  const [result] = await db.query("select * from autores limit ? offset ?", [
    limit,
    (page - 1) * limit,
  ]);
  return result;
};

const selectById = async (autorId) => {
  const [result] = await db.query("select * from autores where id = ?", [
    autorId,
  ]);
  if (result.length === 0) {
    return null;
  }
  
  return result[0];
};
const selectByAutorId = async (autorId) => {
  const [result] = await db.query("select * from posts where autor_id = ?", [
    autorId,
  ]);
  return result;
};
const selectByPostId = async (postId) => {
  const [result] = await db.query("select * from posts where id = ?", [postId]);
  return result;
};

const insert = async ({ nombre, email, imagen }) => {
  const [result] = await db.query(
    "insert into autores (nombre, email, imagen) values (?, ?, ?)",
    [nombre, email, imagen]
  );
  return result;
};

const update = async (autorId, { nombre, email, imagen }) => {
  const [result] = await db.query(
    "update autores set nombre = ?, email = ?, imagen = ? where id = ?",
    [nombre, email, imagen, autorId]
  );
  return result;
};

const remove = async (autorId) => {
  const [result] = await db.query("delete from autores where id = ?", [
    autorId,
  ]);
  return result;
};

module.exports = {
  selectAll,
  selectById,
  selectByAutorId,
  selectByPostId,
  insert,
  update,
  remove,
};
