const Router = require("express")
const router = new Router()
const serviceRouter = require('../Controller/ServiceController')

router.post("/",serviceRouter.creatService)
router.get("/",serviceRouter.getServiceAll)
router.get("/:id",serviceRouter.getServiceOne)
router.delete("/:id",serviceRouter.deleteService)
router.put("/:id",serviceRouter.editService)

module.exports = router