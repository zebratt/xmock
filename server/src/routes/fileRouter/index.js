const Router = require('koa-router')
const router = new Router()
const find = require('lodash/find')

// mock data
const data = require('./data')

router.get('/list', (ctx, next) => {
    ctx.body = {
        code: 0,
        d: data.map(d => {
            return {
                id: d.id,
                fileName: d.fileName
            }
        })
    }
})

router.get('/:id', (ctx, next) => {
    const id = ctx.params.id
    const file = find(data, ['id', parseInt(id)])

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
    const file = find(data, ['id', parseInt(id)])

    if(file){
        file.content = content

        ctx.body = {
            code: 0
        }
    }else{
        ctx.body = {
            code: -1,
            message: '文件不存在！'
        }
    }
})

module.exports = router
