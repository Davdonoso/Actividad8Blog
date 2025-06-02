const router = require("express").Router();

const {
  getAll,
  getById,
  getAutoresAndPost,
  create,
  update,
  remove,
} = require("../../controllers/autores.controller");

const { checkautoresId, checkdataAutor} = require("../../middleware/autores.middleware");

router.get("/", getAll);
router.get("/posts", getAutoresAndPost);
router.get("/:autorId", checkautoresId, getById);
router.post("/", checkdataAutor, create);
router.put("/:autorId", checkdataAutor, checkautoresId, update);
router.delete("/:autorId", checkautoresId, remove);

module.exports = router;
