## ENV
#### PKG_REGISTRY
组件仓库地址,如: `http://172.178.1.204:2015/vue-components`

> 当前组件依赖远程组件时使用

#### PKG_INDEX
组件索引,默认为 `latest.json`

#### PKG_NAME
包名
> 打包/上传时使用

#### WITH_HTML

## VOLUME
#### /app/src

#### /app/dist

#### /root/.ssh

## run
``` bash
build name dir file version="0.0.0":
    echo "build...   " {{name}} {{dir}} {{file}}
    docker run \
        -v $(pwd)/{{dir}}:/app/src \
        -v $(pwd)/dist:/app/dist \
        -v $(pwd)/manifest.js:/app/manifest.js \
        -e PKG_REGISTRY=http://172.178.1.204:2015/vue-components \
        -e PKG_NAME={{name}} \
        nnurphy/vuep \
        {{version}} src/{{file}}
```

批量构建示例:
```bash
batch prefix="components/v1":
    #!/bin/bash
    prefix={{prefix}}
    for f in $(find $prefix -name '*.vue'); do
        x1=${f/$prefix\//}
        x2=${x1%.vue}
        n=${x2//\//-}
        just build $n $(dirname $f) $(basename $f) 0.0.0
    done
```

### 使用
项目入口添加
```js
global.externalComponent = require('externalcomponent')
```