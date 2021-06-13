const { preHandler } = require('./hooks')

const repoVisChanged = {
    method: 'POST',
    url: '/repoVisChanged',
    preHandler: preHandler,
    /**
     * @param {import("fastify").FastifyRequest} req 
     * @param {import('fastify').FastifyReply} reply 
     */
    handler: async function (req, reply) {
        req.log.info('The repo visibility was changed')
        reply.code(200).send()
    }
}

module.exports = {
    repoVisChanged
}