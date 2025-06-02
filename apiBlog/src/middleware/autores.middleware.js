const Autores = require("../models/autores.model");

const checkautoresId = async (req, res, next) => {
  const { autorId } = req.params;

  if (isNaN(autorId)) {
    return res.status(400).json({ message: "El id debe ser un número" });
  }

  const autores = await Autores.selectById(autorId);
  if (!autores) {
    return res.status(404).json({ message: "El actor no existe" });
  }

  req.autores = autores;

  next();
};

const checkdataAutor = (req, res, next) => {
  const { nombre, email, imagen } = req.body;

  if (!nombre || !email || !imagen) {
    return res
      .status(400)
      .send("El nombre, email y la imagen son obligatorios");
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({ message: "El email no es válido"});
  }
  if (!/^(http|https):\/\/[^ "]+$/.test(imagen)) {
    return res.status(400).json({ message: "La url de la imagen no es válida"});
  }
   

  next();
};

module.exports = { checkautoresId, checkdataAutor };
