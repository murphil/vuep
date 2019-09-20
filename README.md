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
docker run \
    -v $(pwd)/src:/app/src \
    -v $(pwd)/dist:/app/dist \
    -e PKG_NAME=xxx \
    vuepkg \
    1.2.3 [src/index.vue]
```

批量构建示例:
```bash
mod prefix="components/v1":
    #!/bin/bash
    prefix={{prefix}}
    for f in $(find $prefix -name '*.vue'); do
        x1=${f/$prefix\//}
        x2=${x1%.vue}
        n=${x2//\//-}
        echo $n $(dirname $f) $(basename $f)
        docker run \
            -v $(pwd)/$(dirname $f):/app/src \
            -v $(pwd)/dist:/app/dist \
            -e PKG_NAME=$n \
            vuep \
            0.0.1 src/$(basename $f)
    done
```

### 使用
项目入口添加
```js
window.externalComponent = require('externalcomponent')
```