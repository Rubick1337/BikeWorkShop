const Router = require("express")
const router = new Router()
const typeServiceController = require("../Controller/TypeServiceController")

router.post("/", typeServiceController.createTypeService)
router.get("/",typeServiceController.getTypeServiceAll)
router.get("/:id",typeServiceController.getTypeServiceOne)
router.delete("/:id",typeServiceController.deleteTypeService)
router.put("/",typeServiceController.editTypeService)

module.exports = router