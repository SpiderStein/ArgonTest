const { repoVisChanged } = require("./routes")
const { onResponse } = require('./hooks')

/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {*} opts 
 * @param {Function} done 
 */
module.exports = function (fastify, opts, done) {

    fastify.decorateRequest('octokit', opts.deps.octokit)
    fastify.route(repoVisChanged)

    done()
}