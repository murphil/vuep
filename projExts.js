const matchRegexp = require('./matchRegexp')
const matcher = matchRegexp(require('./manifest'))

const registry = 'http://172.178.1.204:2015/vue-components'
const externalModules = registry ? JSON.parse(require("child_process").execSync(`curl -# ${registry}/${process.env.PKG_INDEX || 'latest.json'}`)) : {}
console.log(externalModules)


module.exports = {
    projExts({ name, callback }) {
        if (name === 'vue') {
            callback()
        } else if (name in externalModules) {
            callback(null, `() => externalComponent('${registry}','${name}.${externalModules[name]}')`)
        } else {
            let comp = matcher(name)
            if (comp && comp in externalModules) {
                console.log(`--> match ${name} as ${comp}`)
                callback(null, `() => externalComponent('${registry}','${comp}.${externalModules[comp]}')`)
            } else {
                callback()
            }
        }
    }
}