const Router = require('koa-router')
const router = new Router()
const fileRouter = require('./fileRouter')
const StorageService = require('../service/StorageService')

router.all('*', async (ctx, next) => {
    if (ctx.app.env === 'dev') {
        ctx.response.set('Access-Control-Allow-Origin', '*')
        ctx.response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    }

    await next()
})

router.use('/api/files', fileRouter.routes())
router.use('/mock', (ctx, next) => {
    const subPath = ctx.path.substring(5)
    const files = StorageService.get('files').value()
    let content = ''

    for(let i=0; i< files.length; i++){
        if(files[i].url === subPath){
            content = files[i].content

            break
        }
    }

    if(content){
        ctx.body = content
    }else{
        next()
    }
})

module.exports = router