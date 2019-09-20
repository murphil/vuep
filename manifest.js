module.exports = {
    '^~/plugins/TsVue$' (name, m, ms) {
        return 'saasTsVue.' + ms['saasTsVue']
    },
    '^[~@]\(.*\)' (name, m, ms) {
        return m[1] + '.' + (ms[m[1]] || '0.0.0')
    },
    '.*' (name, m, ms) {
        return `${name}.0.0.0`
    }
}