const Koa = require('koa')
const app = new Koa()
const rootRouter = require('./routes')
const bodyParser = require('koa-bodyparser')


app.use(bodyParser())

// access log
app.use(async (ctx, next) => {
    const date = new Date().toLocaleString()
    const body = ctx.method.toLowerCase() === 'get' ? ctx.querystring : JSON.stringify(ctx.request.body)

    console.log(`[${date}]:::${ctx.method}:::${ctx.url}:::${body}`)

    await next()
})

// router entry
app.use(rootRouter.routes())
app.use(rootRouter.allowedMethods())

// final router
app.use(async ctx => {
    ctx.body = { code: -1, message: '您所请求的接口不存在' }
})

module.exports = app
