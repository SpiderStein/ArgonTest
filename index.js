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

// (async () => {
//     const githubAccountSecret = process.env.GITHUB_ACCOUNT_SECRET
//     const octokit = new Octokit({ auth: githubAccountSecret });
//     try {
//         let res = await octokit.request('PATCH /repos/{owner}/{repo}', {
//             private: false,
//             owner: 'argon-challenge-10',
//             repo: 'sensitive-repo',
//         })
//         console.log(res)
//     } catch (err) {
//         console.log(err)
//     }
// })()