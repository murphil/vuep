const matchRule = o => {
    const no = []
    Object.keys(o).forEach(k => {
        const nk = new RegExp(k)
        no.push([
            nk, o[k]
        ])
    })
    return (name, ms) => {
        for (let [r, cb] of no) {
            if (r.test(name)) {
                return cb(name, ms)
            }
        }
    }
}
const matcher = matchRule(require('./manifest'))

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