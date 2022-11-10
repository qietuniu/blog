
# 代码提交规范

## 安装

<https://github.com/conventional-changelog/commitlint>

```bash
 yarn add @commitlint/{config-conventional,cli} -D
 echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

## 规范

```bash
type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

### type

[提交类型规则](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum)

- 小写
- 空格

类型 | 描述 | 场景 | 示例
---------|----------|---------|---------
 build | 编译相关修改 | 发布版本、项目构建、外部依赖项等 | build: 调整发布版本
 chore | 改变构建过程、开发工具变动 | 打包文件、增加依赖库、工具等| chore: 打包
 ci | 持续集成修改 | 修改 CI 配置文件或脚本| ci: 调整ci打包配置
 docs | 文档相关 | -| docs: 新增项目文档说明
 feat | 新增功能 | -|  feat(user): 新增表格
 fix | 修复bug | -|  fix(user): 修复邮箱正则判断
 perf | 优化 | 性能优化，增加用户体验等|  perf(user): 优化首屏渲染
 refactor | 代码重构、增强逻辑功能 | - | refactor(user): 重构用户列表代码
 revert | 撤销上一次的 commit 提交 | -| revert: 撤销提交
 style | 不影响代码运行的代码风格、代码规范修改 | 命名规范、代码格式缩进、目录调整等（不是样式调整）| style(*): 调整代码缩进
 test | 测试代码修改 | 单元测试等 测试yong li（不是代码测试）| test(user): 新增登录测试用例

### scope

- 非必填（建议填写），scope用于说明 commit 影响的范围，建议填写影响的功能模块。
- 如果你的修改影响了不止一个scope，你可以使用*代替。

### subject

- 必填， commit 目的的简短描述，不超过50个字符。
  - 英语：以动词开头，使用第一人称现在时，比如change，而不是changed或changes，第一个字母小写
  - 中文： 新增/修复等开头
- 结尾不加句号

### body

非必填，可描述当前修改的行为详细信息或修改的目的。（一般冲突的时候会默认写上一些信息）

### footer说明

非必填，一般用于描述`BREAKING CHANGE`，在项目开发中一般不需要填写，组件研发的工程需要填写。

格式：以`BREAKING CHANGE`开头，后面是对变动的描述、以及变动理由和迁移方法。
