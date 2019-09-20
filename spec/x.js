const { projExts } = require('../projExts')
const matchRegexp = require('../matchRegexp')
const manifest = require('../manifest')
    ;
const uCase = ['~/plugins/TsVue'
    , '~sadf-x'
    , '@xxx'
    , 'asdf'
]
const externalModules = {
    saasTsVue: '1.2.3'
}
uCase.forEach(name => {
    projExts({
        externalModules, name
    })
})

console.log('-----------------------------------')

const matcher = matchRegexp(manifest)
uCase.forEach(name => {
    let r = matcher(name, externalModules)
    console.log(r)
})