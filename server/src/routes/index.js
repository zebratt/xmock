const Router = require('koa-router')
const router = new Router()
const fileRouter = require('./fileRouter')

router.all('*', async (ctx, next) => {
    if (ctx.app.env === 'dev') {
        ctx.response.set('Access-Control-Allow-Origin', '*')
        ctx.response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    }

    await next()
})

router.use('/api/files', fileRouter.routes())

module.exports = router