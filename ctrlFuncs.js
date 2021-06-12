const visibilityChange = {
    method: 'GET',
    url: '/visibilityChange',
    handler: async function (req, reply) {
        console.log('Visiblity is changed.')
    }
}

module.exports = {
    visibilityChange
}