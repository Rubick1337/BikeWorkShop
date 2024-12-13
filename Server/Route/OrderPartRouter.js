const Router = require("express")
const router = new Router()
const orderPartRouter = require('../Controller/OrderPartController')

router.post("/",orderPartRouter.createOrderPart)
router.get("/",orderPartRouter.getOrderPartAll)
router.get("/:id",orderPartRouter.getOrderPartOne)
router.delete("/:id",orderPartRouter.deleteOrderPart)
module.exports = router