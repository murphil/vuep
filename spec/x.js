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

console.log('-----projExts------------------------------')
uCase.forEach(name => {
    projExts({
        externalModules, name
    })
})

console.log('-----直接调用------------------------------')

const matcher = matchRegexp(manifest)
uCase.forEach(name => {
    let r = matcher(name, externalModules)
    console.log(r)
})