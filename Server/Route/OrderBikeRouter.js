const Router = require("express")
const router = new Router()
const orderBikeRouter = require('../Controller/OrderBikeController')

router.post("/",orderBikeRouter.createOrderBike)
router.get("/",orderBikeRouter.getOrderBikeAll)
router.get("/:id",orderBikeRouter.getOrderBikeOne)

module.exports = router