build name version path='src/index.vue':
    npx vue-cli-service build --modern --target lib --formats umd --no-clean --dest dist --name "{{name}}.{{version}}" {{path}}

image:
    docker build . -t vuep