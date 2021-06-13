const fastify = require('fastify')({
    logger: true
})
const repoVizEnforce = require('./plugins/repoVisEnforce/plugin')

/**
 * 
 * @param {object} param0
 * @param {import("fastify").FastifyInstance} param0.fastify
 */
async function run({ ...deps }) {
    fastify.register(repoVizEnforce, {
        'deps': {
            octokit: deps.octokit,
            CryptoJS: deps.CryptoJS,
            sharedSecret: deps.sharedSecret,
            secureCompare: deps.secureCompare
        }
    })
    console.log(`Listening on the following port: ${deps.port}`)
    await fastify.listen(Number.parseInt(deps.port))
}

module.exports = run