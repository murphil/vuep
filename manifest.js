module.exports = {
    '^~/plugins/TsVue$' (name, ms, m) {
        return 'saasTsVue.' + ms['saasTsVue']
    },
    '^[~@]\(.*\)' (name, ms, m) {
        return m[1] + '.' + (ms[m[1]] || '0.0.0')
    },
    '.*' (name, ms) {
        return `${name}.0.0.0`
    }
}