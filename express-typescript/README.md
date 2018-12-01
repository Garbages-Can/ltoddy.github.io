## typescript express 基础配置


#### 每个文件说明

- tsconfig.json typescript(tsc) 编译时所需

- tslint.json tslint配置文件

- src/server.ts 程序入口(只能叫server.ts)

- dependencies.json 第三方依赖

- npm-scripts.json npm script

命令使用:

- npm run start 开发时候所用, 代码更改之后, 会重新编译, 无需手动停止再启动, 相当于DEBUG模式

- npm run build 构建编译

- npm run serve 启动项目服务(前提需要先npm run build)

- npm run lint tslint检查代码风格

### 具体使用

平时开发时候, 使用 `npm run start` 然后编写代码.

部署时候, 先 `npm run build` 编译成 `JavaScript` 代码, 然后运行 `npm run serve` 运行服务.
