const matchRegexp = require('./matchRegexp')
const matcher = matchRegexp(require('./manifest'))
const registry = process.env.PKG_REGISTRY
const externalModules = registry ? JSON.parse(require("child_process").execSync(`curl -# ${registry}/${process.env.PKG_INDEX || 'latest.json'}`)) : {}

module.exports = {
    projExts({ name, callback }) {
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