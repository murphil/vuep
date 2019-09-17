FROM node:12-buster-slim

ENV NPM_PKGS \
        cross-env chokidar rimraf \
        @babel/core @babel/plugin-syntax-dynamic-import @babel/preset-env \
        webpack webpack-cli webpack-dev-middleware webpack-hot-middleware webpack-merge \
        extract-text-webpack-plugin webpack-node-externals friendly-errors-webpack-plugin \
        babel-loader file-loader url-loader \
        autoprefixer css-loader stylus stylus-loader \
        vue-cli vue-loader vue-template-compiler vue-style-loader vue-server-renderer \
        vue vuex vue-router vuex-router-sync axios \
        git+https://github.com/murphil/externalcomponent.git

RUN set -eux \
  ; apt-get update -y \
  ; apt-get install -yq \
  # Puppeteer/Chrome headless deps
    gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 \
    libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 \
    libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
    libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
    libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 \
    lsb-release xdg-utils wget curl \
  # webpack
  ; npm -g install node-gyp \
    $NPM_PKGS \
  # clean
  ; npm cache clean -f \
  ; npm config set registry https://registry.npm.taobao.org \
  ; apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

ENV just_version=0.4.4 watchexec_version=1.10.3
RUN set -ex \
  ; wget -q -O- https://github.com/casey/just/releases/download/v${just_version}/just-v${just_version}-x86_64-unknown-linux-musl.tar.gz \
    | tar zxf - -C /usr/local/bin just \
  ; wget -q -O- https://github.com/watchexec/watchexec/releases/download/${watchexec_version}/watchexec-${watchexec_version}-x86_64-unknown-linux-musl.tar.gz \
    | tar zxf - --strip-components=1 -C /usr/local/bin watchexec-${watchexec_version}-x86_64-unknown-linux-musl/watchexec

WORKDIR /app
COPY vue.config.js .

RUN npm link $NPM_PKGS .
CMD [ "npx", "vue-cli-service", "build", \
        "--target", "lib", \
        "--formats", "umd-min", \
        "--no-clean", \
        "--dest", "dist", \
        "--name", "\"JsonComponent.[hash]\"", \
        "src/App.vue" ]

