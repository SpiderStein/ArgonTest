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

        isVisChangedByServer = true
        done()
    }
}

module.exports = {
    preHandler: preHandler()
}