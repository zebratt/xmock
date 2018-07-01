const Flow = require('step-flow')
const flow = new Flow()

const context = {
    name: 'callie'
}

flow.use('fn1', (context, next) => {
    console.log('fn1 context: ', context);
    context.fn1 = 'hello'

    next()
}).use('fn2', (context, next) => {
    console.log('fn2 context: ', context);
    context.fn2 = 'world'
    console.log(a * 10);

    next()
}).catch((err) => {
    console.log('error');
    console.log(err);
})

flow.run(context)