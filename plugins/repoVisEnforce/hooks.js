function preHandler() {

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

// const mac = CryptoJS.HmacSHA256(JSON.stringify(req.body), 'abcd')
// if (mac === req.headers['x-hub-signature-256']) {
//     console.log('Hello World')
// }


module.exports = {
    preHandler: preHandler()
}