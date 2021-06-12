/**
 * 
 * @param {object} param0
 * @param {import("fastify").FastifyInstance} param0.fastify
 */
async function run({ fastify, ...deps }) {
    fastify.route(deps.ctrlFuncs.visibilityChange)
    // const port = process.env.PORT
    const port = 9999
    console.log(`Listening on the following port: ${port}`)
    await fastify.listen(Number.parseInt(port))
}

module.exports = run