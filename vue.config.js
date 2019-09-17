const registry = 'http://172.178.1.204:2015/vue-components'
const externalModules = JSON.parse(require("child_process").execSync(`curl -# ${registry}/latest.json`))
//delete externalModules['vue']
console.log(externalModules)

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
        if (!process.env.dev) return
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
            if (request === 'vue') {
                //callback(null, 'Vue');
                callback();
            } else if (request in externalModules) {
                callback(null, `() => externalComponent('${registry}','${request}.${externalModules[request]}')`)
            } else {
                callback();
            }
        }
    }
};