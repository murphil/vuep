const matchRegexp = require('./matchRegexp')
const matcher = matchRegexp(require('./manifest'))

module.exports = {
    isExt(name) {
        return name.startsWith('@') || name.startsWith('~')
    },
    projExts({externalModules, name}) {
        let comp = matcher(name, externalModules)
        console.log(`match component '${name}' as '${comp}'`)
        return comp
    }
}