const path = require('path')
const registry = process.env.PKG_REGISTRY || 'vue.d'
const manifest = path.resolve(path.join(__dirname, './manifest'))
const externalModules = registry ? JSON.parse(require("child_process").execSync(`curl -# ${registry}/${process.env.PKG_INDEX || 'latest.json'}`)) : {}
console.log(externalModules)

const projExts = require('./projExts.js')(require(manifest), externalModules)
function mkImport(registry, loader) {
    return (name, ori, reg, ld) => {
        let rv = `() => ${ld || loader}('${reg || registry}','${name}')`
        console.log('[importStmt] ', rv)
        return rv
    }
}
const impStmt = mkImport(registry, 'externalComponent')

module.exports = {
    chainWebpack: config => {
        config.module
            .rule("yaml")
            .test(/\.ya?ml$/)
            .use("json-loader")
            .loader("json-loader")
            .end()
            .use("yaml-loader")
            .loader("yaml-loader");
        if (!process.env.WITH_HTML) return
        config
            .plugin('html')
            .tap(args => {
                if (!args[0]) return args
                args[0].chunksSortMode = 'dependency'
                args[0].inject = true
                args[0].template = 'index.html'
                return args
            })
    },
    configureWebpack: config => {
        config.externals = (context, request, callback) => {
            let r = projExts(request)
            if (r) {
                callback(null, impStmt(r, request))
            } else {
                callback()
            }
        }
    }
};
