

## 简介

- git多仓库管理
- Monorepo 是管理项目代码的一个方式，指在一个项目仓库(repo)中管理多个模块/包(package)
- monorepo 最主要的好处是统一的工作流和代码共享
- [Lerna](https://github.com/lerna/lerna)是一个管理多个 npm 模块的工具,优化维护多包的工作流，解决多个包互相依赖，且发布需要手动维护多个包的问题
- [yarn](https://classic.yarnpkg.com/en/docs/cli/)



### git多仓库管理

适用于小型项目，团队项目下的问题：

- 分支管理混乱

### MultiRepo

#### 优点

- 各模块的管理自由度较高，可以自行选择构建工具、依赖管理、单元测试等配套设施
- 各模块的体积也不会太大

#### 缺点

- 仓库分散不好找，分支管理混乱
- 版本更新繁琐，如果公共模块发生了变化，需要对所有的模块进行依赖更新
- CHANGELOG不好梳理，无法自动关联各个模块的变动

### MonoRepo

Babel, React, Angular, Ember, Meteor, Jest 在使用

#### 优点

- 一个仓库维护多个模块，方便好找
- 方便版本管理和依赖管理，模块之间的引用调试都比较方便
- 方便统一生成CHANGELOG

#### 缺点

- 统一构建工具, 需要构建工具能构建所的模块
- 仓库体积变大

### 使用lerna

#### 安装lerna

```js
npm i lerna -g
```

#### 初始化项目

```js
mkdir lerna-project
cd lerna-project

lerna init
lerna notice cli v4.0.0
lerna info Initializing Git repository
lerna info Creating package.json
lerna info Creating lerna.json
lerna info Creating packages directory
lerna success Initialized Lerna files
```

![lerna-init](https://img.zhufengpeixun.com/1609568698164)

#### package.json

package.json

```json
{
  "name": "root",
  "private": true, // 私有的,用来管理整个项目,不会被发布到npm
  "devDependencies": {
    "lerna": "^4.0.0"
  }
}
```

####  lerna.json

lerna.json

```json
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0"
}
```

### yarn workspace

- `yarn workspace`允许我们使用 `monorepo` 的形式来管理项目
- 在安装 node_modules 的时候它不会安装到每个子项目的 node_modules 里面，而是直接安装到根目录下面，这样每个子项目都可以读取到根目录的 node_modules
- 整个项目只有根目录下面会有一份 `yarn.lock` 文件。子项目也会被 `link` 到 `node_modules` 里面，这样就允许我们就可以直接用 import 导入对应的项目
- `yarn.lock`文件是自动生成的,也完全Yarn来处理.`yarn.lock`锁定你安装的每个依赖项的版本，这可以确保你不会意外获得不良依赖

#### 开启workspace

package.json

```diff
{
  "name": "root",
  "private": true, 
+  "workspaces": [
+    "packages/*"
+  ],
  "devDependencies": {
    "lerna": "^3.22.1"
  }
}
```

#### 创建子项目

- react是React核心，包含了`React.createElement`等代码
- shared 存放各个模块公用的全局变量和方法
- scheduler 实现了优先级调度功能
- react-reconciler 提供了协调器的功能
- react-dom 提供了渲染到DOM的功能

```js
lerna create react
lerna create shared
lerna create scheduler
lerna create react-reconciler
lerna create react-dom
```

#### 添加依赖

- [yarnpkg](https://classic.yarnpkg.com/en/docs/cli)
- [lerna](https://github.com/lerna/lerna#readme)

##### 设置加速镜像

```js
yarn config get registry
yarn config set registry http://registry.npm.taobao.org/
yarn config set registry http://registry.npmjs.org/
```

#### 常用命令

##### 根空间添加依赖

```js
yarn add chalk --ignore-workspace-root-check
```

##### 给某个项目添加依赖

```js
yarn workspace react add object-assign
```

##### 安装和link

```js
yarn install
lerna bootstrap --npm-client yarn --use-workspaces
```

##### 其它命令

| 作用                        | 命令                                       |
| :-------------------------- | :----------------------------------------- |
| 查看工作空间信息            | yarn workspaces info                       |
| 删除所有的 node_modules     | lerna clean 等于 yarn workspaces run clean |
| 重新获取所有的 node_modules | yarn install --force                       |
| 查看缓存目录                | yarn cache dir                             |
| 清除本地缓存                | yarn cache clean                           |