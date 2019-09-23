const matchRegexp = require('./matchRegexp')
const matcher = matchRegexp(require('./manifest'))

module.exports = {
    projExts({ externalModules, name, callback, registry }) {
        if (name === 'vue') {
            callback()
        } else if (name in externalModules) {
            callback(null, `() => externalComponent('${registry}','${request}.${externalModules[request]}')`)
        } else {
            let comp = matcher(name)
            if (comp && comp in externalModules) {
                callback(null, `() => externalComponent('${registry}','${externalModules[comp]}')`)
            } else {
                callback()
            }
        }
    }
}