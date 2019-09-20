const { projExts } = require('../projExts')

    ;
[ '~/plugins/TsVue'
, '~sadf-x'
, '@xxx'
, 'asdf'
].forEach(name => {
    projExts({
        externalModules: {
            saasTsVue: '1.2.3'
        }, name
    })
})
