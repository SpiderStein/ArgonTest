const { preHandler } = require('./hooks')

const repoVisChanged = {
    method: 'POST',
    url: '/repoVisChanged',
    preHandler: [preHandler.isReqAuthenticated, preHandler.isVisChangedByUser],
    /**
     * @param {import("fastify").FastifyRequest} req 
     * @param {import('fastify').FastifyReply} reply 
     */
    handler: async function (req, reply) {
        req.log.info('The repo visibility was changed')
        setImmediate(async () => {
            try {
                await req.octokit.request('PATCH /repos/{owner}/{repo}', {
                    private: !req.body.repository.private,
                    owner: req.body.repository.owner.login,
                    repo: req.body.repository.name,
                })
                req.log.info(`Repo is back to its original state`)
            } catch (error) {
                req.log.error(error)
            }
        })
        reply.code(200).send()
    }
}

module.exports = {
    repoVisChanged
}