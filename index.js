const run = require('./server')

function getServerDependencies() {
    const fastify = require('fastify')()
    const ctrlFuncs = require('./ctrlFuncs')

    return {
        fastify,
        ctrlFuncs: ctrlFuncs,
    }
}

(async function EntryPoint() {
    await run(getServerDependencies())
})()