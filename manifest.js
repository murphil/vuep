module.exports = {
    '^~/plugins/TsVue$' (name, m, ms) {
        return 'saasTsVue.' + ms['saasTsVue']
    },
    '^~entry$' (name, m, ms) {
        return false
    },
    '^~/components/v1/(.*).vue$' (n, m, ms) {
        let name = m[1].split('/').join('-')
        return `${name}.${ms[name]}`
    },
    '^[~@]\(.*\)' (name, m, ms) {
        return m[1] + '.' + (ms[m[1]] || '0.0.0')
    },
    '.*' (name, m, ms) {
        return `${name}.0.0.0`
    }
}