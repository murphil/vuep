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

function mkImport (registry, loader) {
    return (name, reg, ld) => {
        let rv = `() => ${ld || loader}('${reg || registry}','${name}')`
        console.log('[importStmt] ', rv)
        return rv
    }
}


module.exports = function mkProjExts (matchlist, externalModules, registry) {
    const matcher = matchRegexp(matchlist)
    const importStmt = mkImport(registry, 'externalComponent')
    return ({ name, callback }) => {
        if (['vue', 'vuex', 'vue-router'].includes(name)) {
            callback()
        } else if (name in externalModules) {
            console.log(`[used] ${name}`)
            callback(null, importStmt(`${name}.${externalModules[name]}`))
        } else {
            let comp = matcher(name)
            if (comp) {
                if (comp in externalModules) {
                    console.log(`[used] ${name} --> ${comp}`)
                    callback(null, importStmt(`${comp}.${externalModules[comp]}`))
                } else {
                    console.log(`[matched] ${name} --> ${comp}`)
                    callback(null, importStmt(`${comp}`))
                }
            } else {
                callback()
            }
        }
    }
}
