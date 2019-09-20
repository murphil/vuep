const matchRule = o => {
    const no = []
    Object.keys(o).forEach(k => {
        const nk = new RegExp(k)
        no.push([
            nk, o[k]
        ])
    })
    return (name, version) => {
        for (let [r, cb] of no) {
            if (r.test(name)) {
                return cb(name, version)
            }
        }
    }
}
const matcher = matchRule({
    '^~/plugins/TsVue$' (name, version) {
        return
    },
    '.*' (name, version) {
        return `${name}.${version}`
    }
})

module.exports = {
    isExt(name) {
        return name.startsWith('@') || name.startsWith('~')
    },
    projExts({externalModules, name}) {
        let comp = matcher(name, externalModules[name])
        console.log(`match component: ${comp}`)
        return comp
    }
}