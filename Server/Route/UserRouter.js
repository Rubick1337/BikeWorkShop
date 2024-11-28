const Router = require('express')
const router = new Router()
const {body} = require('express-validator')
// const authMiddleware = require('../middleware/authMiddleware') //второй параметр
// const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/registration', body('password').isLength({min: 2, max: 32}),)
router.post('/login', )
router.post('/logout',)
router.get('/refresh',)
router.get('/',)
router.get('/:id',)

module.exports = router