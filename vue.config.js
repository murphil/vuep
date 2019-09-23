const registry = process.env.PKG_REGISTRY
const externalModules = registry ? JSON.parse(require("child_process").execSync(`curl -# ${registry}/${process.env.PKG_INDEX || 'latest.json'}`)) : {}

const { projExts } = require('./projExts.js')

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
            projExts({ externalModules, name: request, callback, registry })
        }
    }
};