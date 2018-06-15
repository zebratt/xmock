const Router = require('koa-router')
const router = new Router()
const StorageService = require('../../service/StorageService')

router.get('/list', (ctx, next) => {
    const files = StorageService.get('files').value() 

    ctx.body = {
        code: 0,
        d: files.map(d => {
            return {
                id: d.id,
                fileName: d.fileName
            }
        })
    }
})

router.get('/:id', (ctx, next) => {
    const id = ctx.params.id
    const file = StorageService.get('files').find(['id', parseInt(id)]).value()

    if(file){
        ctx.body = {
            code: 0,
            d: file.content
        }
    }else{
        ctx.body = {
            code: -1,
            message: '文件不存在！'
        }
    }
})

router.post('/:id/save', (ctx, next) => {
    const id = ctx.params.id
    const {content} = ctx.request.body
    const file = StorageService.get('files').find(['id', parseInt(id)])

    if(file.value()){
        file.set('content', content).write()

        ctx.body = {
            code: 0,
            message: 'success'
        }
    }else{
        ctx.body = {
            code: -1,
            message: '文件不存在！'
        }
    }
})

module.exports = router
