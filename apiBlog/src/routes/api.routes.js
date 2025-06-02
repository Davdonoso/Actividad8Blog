const router = require("express").Router();

router.use("/autores", require("./api/autores.routes"));
router.use("/posts", require("./api/posts.routes"));

module.exports = router;
