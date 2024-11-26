const Router = require("express")
const router = new Router()
const bookRouter = require("./bookRoute")
const issueRouter = require("./issueRoute")
const publisherRouter = require("./publisherRoute")
const readerRouter = require("./readerRoute")

router.use('/book',bookRouter)
router.use('/issue',issueRouter)
router.use('/publisher',publisherRouter)
router.use('/reader',readerRouter)

module.exports = router