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
            let m = name.match(r)
            if (m) {
                return cb(name, ms, m)
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