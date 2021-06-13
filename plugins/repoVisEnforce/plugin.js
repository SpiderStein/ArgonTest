const { repoVisChanged } = require("./routes")

/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {*} opts 
 * @param {Function} done 
 */
module.exports = function (fastify, opts, done) {

    fastify.decorateRequest('octokit', opts.deps.octokit)
    fastify.decorateRequest('CryptoJS', opts.deps.CryptoJS)
    fastify.decorateRequest('secureCompare', opts.deps.secureCompare)
    fastify.decorateRequest('sharedSecret', opts.deps.sharedSecret)
    fastify.route(repoVisChanged)

    done()
}