const Router = require("express")
const router = new Router()
const typePartController = require("../Controller/TypePartController")

router.post("/", typePartController.createTypePart)
router.get("/",typePartController.getTypePartAll)
router.get("/:id",typePartController.getTypePartOne)
router.delete("/:id",typePartController.deleteTypePart)
router.put("/",typePartController.editTypePart)

module.exports = router