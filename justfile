version:=`cat package.json | jq -r '.version'`
build name='JsonComponent' path='src/components/index.vue':
    npx vue-cli-service build --target lib --formats umd --no-clean --dest dist --name "{{name}}.{{version}}" {{path}}

image:
    docker build . -t vuec