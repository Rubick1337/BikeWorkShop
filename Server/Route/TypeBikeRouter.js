const Router = require("express")
const router = new Router()
const typeBikeController = require("../Controller/TypeBikeController")

router.post("/", typeBikeController.createTypeBike)
router.get("/",typeBikeController.getTypeBikeAll)
router.get("/:id",typeBikeController.getTypeBikeOne)
router.delete("/:id",typeBikeController.deleteTypeBike)
router.put("/",typeBikeController.editTypeBike)

module.exports = router