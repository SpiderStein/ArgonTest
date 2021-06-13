function isVisChangedByUser() {

    let isVisChangedByServer = false

    return function (req, reply, done) {
        if (req.body.action !== 'publicized' && req.body.action !== 'privatized') {
            reply.code(418).send('Only repo visibility change notifications are allowed to be sent')
            return
        }
        if (isVisChangedByServer) {
            isVisChangedByServer = false
            reply.code(418).send("The latest repo visibility change wasn't done by a user")
            return
        }

        isVisChangedByServer = true
        done()
    }
}

/**
 * 
 * @param {import("fastify").FastifyRequest} req 
 * @param {import("fastify").FastifyReply} reply 
 * @param {Function} done 
 */
function isReqAuthenticated(req, reply, done) {
    let mac = 'sha256=' + req.CryptoJS.enc.Hex.stringify(req.CryptoJS.HmacSHA256(JSON.stringify(req.body), req.sharedSecret))
    let a = req.secureCompare(mac, req.headers['x-hub-signature-256'])
    if (!a) {
        reply.code(401).send(`request isn't authenticated`)
        req.log.info(`authentication failed`)
        return
    }
    done()
}


module.exports = {
    preHandler: {
        isVisChangedByUser: isVisChangedByUser(),
        isReqAuthenticated
    }
}