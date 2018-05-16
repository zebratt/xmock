const Router = require('koa-router')
const router = new Router()

router.get('/all', (ctx, next) => {
    const mockData = [
        {
            id: 1,
            fileName: 'aaa.json',
            content: 123
        },
        {
            id: 2,
            fileName: 'bbb.json',
            content: 234
        },
        {
            id: 3,
            fileName: 'ccc.json',
            content: 789
        }
    ]

    ctx.body = {code: 0, message: '', d: mockData}
})

router.post('/save', (ctx, next) => {
    ctx.body = {code: 0, message: ''}
})

module.exports = router