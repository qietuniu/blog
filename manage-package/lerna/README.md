# Lerna

## 简介

项目的一个优化点就是将大型的代码库拆分成相互独立的版本包，用多包库（monorepos）的方式进行组织，类似Babel，React等，这样提高了代码的共享。

Lerna是一个使用git和npm优化多包库管理工作流程的工具，可以为多份复制的package减少构建时间和空间。lerna boostrap:  把库的依赖链接在一起

- lerna publish： 会把任何一个有变更的package发布

> 总结：lerna将项目中ABC三个包进行依赖关联，不需要再去单独发包，减少空间和时间

## 安装

```bash
$ npm install --global lerna
$ mkdir lerna-repo
$ cd lerna-repo
$ lerna init

```

### 目录结构

```
lerna-repo/
  package.json
  lerna.json
  packages/
    package-1/
      package.json
    package-2/
      package.json
```



## 模式

### 固定模式

通过lerna.json的version来判断，执行 `lerna publish`时，如果一个模块自上次发布以来有更新，它将会更新为你要发布的新的版本，这意味着你只需在需要时发布新版本的package。

适合场景：

- 需要自动把所有依赖包版本捆版在一起。
- 可以忽略任何package的一个重大改动，都会导致所有的package会有一个新的主要版本这个问题。



### 相互独立模式

允许维护者相互独立地变更package的版本，允许你更具体地更新各个package的版本，并对一组组件更加有意义。你会得到每个已变更的package的提示，以指定它的自定义的修改：

- 补丁
- 次要的
- 重要的

> 在独立模式中 `lerna.json`文件中的`version`字段会被忽略



## 命令

### init

```bash
$ lerna init 
$ lerna init --independent # 设置Lerna用独立版本模式
$ lerna init --exact # 保留lerna 1.x的"exact"行为

```

### bootstrap

1. `npm install`:  安装每个包的所有外部依赖项。
2. 将所有相互依赖的Lerna包链接在一起。
3. `npm run prepublish`：所有有联系的包中执行预发布
4. `npm run prepare` : 所有包有联系的包中执行

```bash
$ lerna bootstrap -- --production --no-optional # 通过将它们放在‘--’后面，将额外的参数传递给npm客户端 
```

### add

1. 添加`pacakge`到每个适用的包中（适用于那些不是`pacakge`可是又在范围中的 packages中）

2. 引导有变更的package更新到它们的 manifest文件中。

3. ```
   --ignore`, `--scope` and `--include-filtered-dependencies
   ```

```bash
$ lerna add <package>[@version] [--dev] # 在当前的Lerna库中，给packages安装本地或远端的依赖
```

### publish

1. 运行lerna中更新的变动，确定需要发布哪些包
2. 需要的情况下，添加lerna.json的版本version
3. 所有需要升级的包都更新package.json为新版本
4. 更新需要升级的包的依赖项,^开头
5. 创建git提交
6. 发布新包

```bash
$ lerna publish # 
```

### updated

检查自上一个版本(最后一个git标签)以来哪些包发生了变化。

```bash
$ lerna updated
```

### clean

从所有包中删除node_modules目录。

```bash
$ lerna updated
```

### updated

```bash
$ lerna updated
```

### 其他

- diff
- ls
- Run
- Exec
- link
- Import



参考文档：

https://github.com/minhuaF/blog/issues/2