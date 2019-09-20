module.exports = {
    '^~/plugins/TsVue$' (name, ms) {
        return 'saasTsVue.' + ms['saasTsVue']
    },
    '.*' (name, ms) {
        return `${name}.0.0.0`
    }
}