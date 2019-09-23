module.exports = {
    '^~/plugins/TsVue$' (name, m) {
        return 'saasTsVue'
    },
    '^~entry$' (name, m) {
        return false
    },
    '^~/components/v1/(.*).vue$' (n, m) {
        let name = m[1].split('/').join('-')
        return name
    },
    '^~/request/v1/(.+)\.js$' (n, m) {
        let name = m[1].split('/').join('-')
        return name
    }
}