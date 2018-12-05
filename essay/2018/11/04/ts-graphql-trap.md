## 使用typescript写graphql服务的一个大坑

今天在公司新开了一个后端服务, 技术选择: 语言使用`typescript`, 框架使用`graphql-yogo`.

关于 typescript 的配置以及配置文件用的是: [https://github.com/ltoddy/ltoddy.github.io/tree/master/express-typescript](https://github.com/ltoddy/ltoddy.github.io/tree/master/express-typescript)

项目为了日后模块化方便, 将 `resolvers` 与 `graphql types` 模块化. 具体做法例子是: [https://github.com/prisma/graphql-yoga/tree/master/examples/modular-resolvers](https://github.com/prisma/graphql-yoga/tree/master/examples/modular-resolvers)

    src
    ├── resolvers
    │   ├── index.ts
    │   ├── user.resolvers.ts
    │   └── welcome.resolvers.ts
    └── typeDefs
        ├── index.ts
        ├── user.typedefs.graphql
        └── welcome.typedefs.graphql

目录结构大概是这样的, 通过 tsc 编译之后会生成一个 `dist/` 文件夹.

`example` 中给出的代码(在`src/typeDefs/index.ts`)是通过相对路径读取的`.graphql` 文件.
但是 `tsc` 不会编译 `.graphql` 文件. 你可以看一下编译生成的 `dist` 文件夹, 没有 `.graphql` 文件.

所以就会导致一直报一个错: 类似 Query not in DOM 之类的.

我们解决的是:

    src
    ├── resolvers
    │   ├── index.ts
    │   ├── user.resolvers.ts
    │   └── welcome.resolvers.ts
    └── typeDefs
        ├── index.ts
    schemas
    ├── user.typedefs.graphql
    └── welcome.typedefs.graphql

把 `.graphql` 文件提到顶层目录, 然后改一下`src/typeDefs/index.ts` 中的导入路径就可以了.

当时搞了一中午, 一直在自己代码本身找错.......
