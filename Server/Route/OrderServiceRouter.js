const Router = require("express")
const router = new Router()
const orderServiceRouter = require('../Controller/OrderServiceController')

router.post("/",orderServiceRouter.createOrderService)
router.get("/",orderServiceRouter.getOrderServiceAll)
router.get("/:id",orderServiceRouter.getOrderServiceOne)

module.exports = router