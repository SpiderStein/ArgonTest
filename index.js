const run = require('./server')
const { Octokit } = require("@octokit/core");

function getServerDependencies() {
    const githubAccountSecret = process.env.GITHUB_ACCOUNT_SECRET
    const octokit = new Octokit({ auth: githubAccountSecret });
    const port = process.env.PORT

    return {
        octokit,
        port
    }
}

(async function EntryPoint() {
    await run(getServerDependencies())
})()