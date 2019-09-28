function matchRegexp(o) {
    const no = []
    Object.keys(o).forEach(k => {
        const nk = new RegExp(k)
        no.push([
            nk, o[k]
        ])
    })
    return (pattern, ...rest) => {
        for (let [r, cb] of no) {
            let m = pattern.match(r)
            if (m) {
                return cb(pattern, m, ...rest)
            }
        }
    }
}


module.exports = function mkProjExts(matchlist, externalModules) {
    const matcher = matchRegexp(matchlist)
    return name => {
        if (['vue', 'vuex', 'vue-router'].includes(name)) {
            return
        } else if (name in externalModules) {
            console.log(`[used] ${name}`)
            return `${name}.${externalModules[name]}`
        } else {
            let comp = matcher(name)
            if (comp) {
                if (comp in externalModules) {
                    console.log(`[used] ${name} --> ${comp}`)
                    return `${comp}.${externalModules[comp]}`
                } else {
                    console.log(`[matched] ${name} --> ${comp}`)
                    return comp
                }
            } else {
                return
            }
        }
    }
}
