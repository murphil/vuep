build version path="src/index.vue":
    npx vue-cli-service build --modern --target lib --formats umd --no-clean --dest dist --name "${PKG_NAME}.{{version}}" {{path}}

publish dist:
    scp "dist/${PKG_NAME}.umd.min.js" \
        "dist/${PKG_NAME}.umd.min.js.map" \
        {{dist}}/${PKG_NAME}


image:
    docker build . -t vuep