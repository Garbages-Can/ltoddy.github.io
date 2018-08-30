## webpack 配置React (最小化)


    react-webpack
    ├── dependencies.json
    ├── index.html
    ├── index.js
    ├── npm-scripts.json
    ├── .babelrc
    └── webpack.config.js


### 各文件说明:

- dependencies.json: 第三方库的依赖,通过npm install安装, 这里说明一下,关于babel-loader,暂时最好不要用v8.x.x的版本,用v7.x.x的版本,因为我用最新版的出现了bug,目前我还不知道怎么解决.

- [index.html](./index.html): html模板文件.

- [index.js](./index.js): webpack打包的入口文件.

- [npm-scripts.json](./npm-scripts.json): npm scripts,用于npm快速启动项目和构建项目.

- [.babelrc](./.babelrc): babel的配置文件.

- [webpack.config.js](./webpack.config.js): webpack的配置文件.
