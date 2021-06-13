const run = require('./server')
const { Octokit } = require("@octokit/core")
const CryptoJS = require('crypto-js')
const secureCompare = require('secure-compare');

function getServerDependencies() {
    const githubAccountSecret = process.env.GITHUB_ACCOUNT_SECRET
    const octokit = new Octokit({ auth: githubAccountSecret });
    const port = process.env.PORT
    const sharedSecret = process.env['SHARED_SECRET']

    return {
        octokit,
        port,
        CryptoJS,
        sharedSecret,
        secureCompare
    }
}

(async function EntryPoint() {
    await run(getServerDependencies())
})()