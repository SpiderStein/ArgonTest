/**
 * 
 * @param {object} param0
 * @param {import("fastify").FastifyInstance} param0.fastify
 */
async function run({ fastify, ...deps }) {
    // fastify.route(deps.ctrlFuncs.bruteForce)

    const port = process.env.PORT
    console.log(`Listening on the following port: ${port}`)
    await fastify.listen(port)
}

module.exports = run