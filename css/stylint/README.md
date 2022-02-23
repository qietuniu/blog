

## 简介

### 基础插件
- [stylelint-config-recommended](https://www.npmjs.com/package/stylelint-config-recommended)：仅打开可能错误的规则，建议(recommended)配置，如果您使用 prettier 之类的美化排版工具
- [stylelint-config-standard]()：打开60个风格规则来扩展它，希望 stylelint 强制执行风格约定
- [stylelint-config-recommended-scss](https://github.com/stylelint/stylelint-config-recommended)：使用语言扩展, 例如 @if 和 @extends时可以选择社区配置



### 顺序
一般使用[stylelint-config-rational-order](https://www.npmjs.com/package/stylelint-config-rational-order)，配合[stylelint-order](https://github.com/hudochenkov/stylelint-order)。

1. Positioning（位置）
2. Box Model （盒模型）
3. Typography （排版）
4. Visual （视觉）
5. Animation （动画）
6. Misc （其他）

```css
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
 
  /* Box Model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;
 
  /* Typography */
  color: #888;
  font: normal 16px Helvetica, sans-serif;
  line-height: 1.3;
  text-align: center;
 
  /* Visual */
  background-color: #eee;
  border: 1px solid #888;
  border-radius: 4px;
  opacity: 1;
 
  /* Animation */
  transition: all 1s;
 
  /* Misc */
  user-select: none;
}
```



### rules

规则决定检测器要查找什么和要解决什么。stylelint 有[超过 150](http://stylelint.cn/user-guide/rules/)条规则。*所有规则默认都是关闭的*，所以，通过该选项你就可以开启相应规则，进行相应的检测。所有规则必须显式的进行配置，因为*没有默认值*。

`rules`属性是个对象，其键为规则名称，值为规则配置。每个规则配置符合以下形式之一：

- 一个值 (主要选项)
- 包含两个值的数组 (`[primary option, secondary options]`)
- `null`(关闭规则)



### extends

你的配置可以*extend*一个已存在的配置文件(无论是你自己的还是第三方的配置)。当一个配置继承了里一个配置，它将会添加自己的属性并覆盖原有的属性。

你可以继承一个已存在的配置数组，数组中的每一项都优先于下一项(所以，第一项覆盖所有，第二项覆盖除了第一项之外的所有项，最后一项被其他所有项覆盖，等等)。

例如，继承`stylelint-config-standard`和`myExtendableConfig`，并且覆盖缩进规则：

```js
{
  "extends": [
    "stylelint-config-standard",
    "./myExtendableConfig"
  ],
  "rules": {
    "indentation": "tab"
  }
}
```

`"extends"`的值是个“定位器” (或 “定位器” 数组)，也是最终被`require()`的，因此，可以使用 Node 的`require.resolve()`算法适应任何格式。这意味着一个“定位器”可以是：

- `node_modules`中的某个模块名称 (比如，`stylelint-config-standard`；模块的`main`文件必须是一个有效的 JSON 配置)
- 一个带有`.js`或`.json`扩展名的文件 (如果你在 Node 上下文中创建了一个 JS 对象，并将它传入也是有效的)的绝对路径。
- 一个带有`.js`或`.json`扩展名的文件的相对路径，相对于引用的配置 (例如，如果 configA 是`extends: "../configB"`，我们将查找`configB`相对于 configA)。
- 正因为`extends`，你可以创建和使用可分享的 stylelint 配置。*如果你要发布你的配置到 npm，在你的`package.json`文件中使用`stylelint-config`关键字。

### plugins

插件是由社区创建的规则或规则集，支持方法论、工具集，**非标准** 的 CSS 特性，或非常特定的用例。

- [`stylelint-csstree-validator`](https://github.com/csstree/stylelint-validator): Validate CSS values to match W3C specs and browsers extensions.
- [`stylelint-csstree-validator`](https://github.com/csstree/stylelint-validator)：验证 CSS 的值是否匹配 W3C 标准和浏览器扩展。
- [`stylelint-declaration-strict-value`](https://github.com/AndyOGo/stylelint-declaration-strict-value): Specify properties for which either a variable (`$sass`, `@less`, `var(--cssnext)`), function or custom CSS keyword (`inherit`, `none`, etc.) must be used for its value.
- [`stylelint-declaration-strict-value`](https://github.com/AndyOGo/stylelint-declaration-strict-value)：指定变量(`$sass`，`@less`，`var(--cssnext)`)，函数 或自定义的 CSS 关键字(`inherit`，`none`等) 的属性是否必须用来做它 的值。
- [`stylelint-declaration-use-variable`](https://github.com/sh-waqar/stylelint-declaration-use-variable): Specify properties for which a variable must be used for its value.
- [`stylelint-declaration-use-variable`](https://github.com/sh-waqar/stylelint-declaration-use-variable)：指定哪个变量的属性必须用作它的值
- [`stylelint-order`](https://github.com/hudochenkov/stylelint-order): Specify the ordering of things e.g. properties within declaration blocks (plugin pack).
- [`stylelint-order`](https://github.com/hudochenkov/stylelint-order)：指定排序，比如声明的块内(插件包)属性的顺序。
- [`stylelint-rscss`](https://github.com/rstacruz/stylelint-rscss): Validate [RSCSS](http://rscss.io/) conventions.
- [`stylelint-rscss`](https://github.com/rstacruz/stylelint-rscss)：验证 [RSCSS](http://rscss.io/)约定。
- [`stylelint-scss`](https://github.com/kristerkari/stylelint-scss): Enforce a wide variety of SCSS-syntax specific linting rules (plugin pack).
- [`stylelint-scss`](https://github.com/kristerkari/stylelint-scss)：执行各种各样的 SCSS语法特性检测规则(插件包)
- [`stylelint-selector-bem-pattern`](https://github.com/davidtheclark/stylelint-selector-bem-pattern): Specify a BEM pattern for selectors (incorporates [postcss-bem-linter](https://github.com/postcss/postcss-bem-linter)).
- [`stylelint-selector-bem-pattern`](https://github.com/davidtheclark/stylelint-selector-bem-pattern): 为选择器指定 BEM 模式(合并了 [postcss-bem-linter](https://github.com/postcss/postcss-bem-linter))。



使用插件的话，在你的配置中添加一个`"plugins"`数组，包含“定位器”标识出你要使用的插件。同上面的`extends`，一个“定位器”可以是一个 npm 模块名，一个绝对路径，或一个相对于要调用的配置文件的路径。



一旦声明了插件，在你的`"rules"`对象中，你将需要为插件的规则添加选项，就像其他标准的规则一样。你需要查看插件的文档去了解规则的名称。



```
{
  "plugins": [
    "../special-rule.js"
  ],
  "rules": {
    "plugin/special-rule": "everything"
  }
}
```



一个插件可以提供一个规则或一组规则。如果你使用的插件提供了一组规则，就调用`"plugins"`值中的模块，并在`"rules"`中使用它的规则。例如：

```
{
  "plugins": [
    "../some-rule-set.js"
  ],
  "rules": {
    "some-rule-set/first-rule": "everything",
    "some-rule-set/second-rule": "nothing",
    "some-rule-set/third-rule": "everything"
  }
}
```

### processors

Processors 是 stylelint 的钩子函数，可以以它的方式修改代码，也可以在它们退出时修改结果。



*Processors 只能用在 命令行 和 Node API，不适用于 PostCSS 插件*(PostCSS 插件将忽略它们。)



Processors 可以使 stylelint 检测非样式表文件中的 CSS。例如，你可以检测 HTML 内中`<style>`标签中的 CSS，Markdown文件中代码块或 JavaScript 中的字符串。



使用 processors 的话，在你的配置中添加一个`"processors"`数组，包含“定位器”标识出你要使用的 processors。同上面的`extends`，一个“定位器”可以是一个 npm 模块名，一个绝对路径，或一个相对于要调用的配置文件的路径。

```
{
  "processors": ["stylelint-html-processor"],
  "rules": {..}
}
```



如果你的 processor 有选项，把它们放到一个数组里，第一项是“定位器”，第二项是选项对象。

```
{
  "processors": [
    "stylelint-html-processor",
    [ "some-other-processor", { "optionOne": true, "optionTwo": false } ]
  ],
  "rules": {..}
}
```

### ignoreFiles

提供一个 glob 或 globs 数组，忽略特定的文件。



(另一种方法是使用`.stylelintignore`文件，会在下面描述。)



如果 globs 是绝对路径，就直接使用它们。如果是相对路径，它们将相对：

- `configBasedir`，如果有的话；
- stylelint 使用的配置的文件路径。
- 或`process.cwd()`。



如果`ignoreFiles`属性被继承的配置移除：只有根配置可以忽略文件。



### defaultSeverity

所有在第二个选项中没有指定严重级别的规则的默认严重级别。

- `"warning"`
- `"warning"`
- `"error"`
- `"error"`



你可以使用一个`.stylelintignore`文件(或指定其他的忽略模式文件)忽略指定的文件。



(另一种方式是使用`config.ignoreFiles`，如上描述。)

你的`.stylelintignore`文件中的模式必须匹配[`.gitignore`语法](https://git-scm.com/docs/gitignore)。(在幕后使用[`node-ignore`](https://github.com/kaelzhang/node-ignore)来解析你的模式。) 这就意味着`*.stylelintignore*`*中模式总是相对于*`*process.cwd()*`*。*

styleline 将在`process.cwd()`中查找`.stylelinti`



### 预处理器

linter支持当前和未来的CSS语法。这包括所有标准CSS以及使用标准CSS语法结构的特殊功能，例如特殊的规则，特殊属性和特殊功能。一些*类似*CSS的语言扩展 - 使用非标准语法结构的特性 - 因此受到支持; 然而，由于存在无限的处理可能性，因此linter不能支持所有内容。



您可以在css处理器之前或之后运行linter。根据您使用的处理器，每种方法都有警告：

1. *之前*：某些插件/处理器可能启用与linter不兼容的语法。
2. *之后*：某些插件/处理器可能会生成对您的linter配置无效的CSS，从而导致警告与原始样式表不对应。



**在这两种情况下，您都可以关闭不兼容的linter规则，或者停止使用不兼容的插件/处理器。** 您还可以处理插件/处理器作者并请求替代格式化选项，以使其插件/处理器与stylelint兼容。



默认情况下，linter可以使用特殊的PostCSS解析器*解析*任何以下非标准语法：

- SCSS（使用[`postcss-scss`](https://github.com/postcss/postcss-scss)）
- LESS（使用[`postcss-less`](https://github.com/webschik/postcss-less)）
- SugarSS（使用[`sugarss`](https://github.com/postcss/sugarss)）



*非标准语法可以自动从下列文件扩展名推断出：`**.less`，`**.scss`，和`**.sss`。* 但是，如果您需要指定非标准语法，则[CLI](http://stylelint.cn/user-guide/cli/)和[Node API都会](http://stylelint.cn/user-guide/node-api/)公开一个`syntax`选项。



- 如果您使用的是CLI，请使用以下`syntax`标志：`stylelint ... --syntax scss`。
- 如果您正在使用Node API，请传递以下`syntax`选项：`stylelint.lint({ syntax: "sugarss", ... })`。



此外，使用CLI或Node API时，stylelint可以接受与[PostCSS兼容](https://github.com/postcss/postcss#syntaxes)的自定义[语法](https://github.com/postcss/postcss#syntaxes)。对于自定义语法，请分别使用`custom-syntax`和`customSyntax`选项。

- 如果您使用的是CLI，请使用如下`custom-syntax`标志：`stylelint ... --custom-syntax custom-syntax-module`或`stylelint ... --custom-syntax ./path/to/custom-syntax-module`。
- 如果您正在使用Node API，请传递以下`customSyntax`选项：`stylelint.lint({ cus`





## 实战

### 安装依赖

```bash
npm install stylelint stylelint-config-recommended stylelint-config-recommended-scss stylelint-order stylelint-config-rational-order stylelint-scss stylelint-declaration-block-no-ignored-properties
```

- stylelint：兼容多种格式的css代码规范工具
- stylelint-config-recommended：标准配置规则
- stylelint-config-recommended-scss：它打开styelint中所有可能的错误规则。使用它作为你自己的配置的基础（规则默认全关闭）
-  stylelint-order：定义样式的顺序
-  stylelint-config-rational-order：对相关属性声明进行排序
-  stylelint-scss：解析scss规范
-  stylelint-declaration-block-no-ignored-properties： 禁止由于同一规则中的另一个属性值而被忽略的属性值。

### .stylelintrc.js

- .stylelintrc、stylelint.config.js：配置文件
- .stylelintignore：忽略规则
- .stylelintcache：缓存文件

> rules 优先级大于 extends，建议采用 extends 方式统一管理

```js
module.exports = {
    extends: ['stylelint-config-recommended', 'stylelint-config-rational-order', 'stylelint-config-recommended-scss'],
    plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties', 'stylelint-scss'],
    rules: {
        'indentation': 4,
        'declaration-block-no-duplicate-properties': true, // 不能重复声明属性
        'block-no-empty': true, // 禁止空块 .a { // nothing }
        'function-comma-space-after': 'always', // 函数逗号后需要空格 transform: translate(10px, 20px);
        'function-comma-space-before': 'never', // 函数逗号前不要空格 transform: translate(10px, 20px);
        'declaration-bang-space-before': 'always', // important 前需要空格
        'declaration-bang-space-after': 'never', // important 后不要空格
        'declaration-block-semicolon-newline-after': 'always-multi-line', // 多行规则的分号后必须有换行
        'declaration-block-semicolon-newline-before': 'never-multi-line', // 多行规则的分号前不能有换行
        'declaration-block-semicolon-space-after': 'always-single-line', // 单行块的分号后必须有空格
        'declaration-block-semicolon-space-before': 'never', // 分号前无空格
        'declaration-block-trailing-semicolon': 'always', // 最后也需要分号 .a { color: red; }
        'block-closing-brace-empty-line-before': 'never', // 禁止大括号闭端之前空行
        'block-closing-brace-newline-after': ['always', {
            ignoreAtRules: ['if', 'else'],
        }], // 大括号闭端之后必须有换行符
        'block-closing-brace-newline-before': 'always-multi-line', // 多行规则的大括号闭端之前需要换行符
        'block-closing-brace-space-before': 'always-single-line', // 单行块大括号闭端之前要有空格
        'block-opening-brace-newline-after': 'always-multi-line', // 多行规则的大括号开端之后需要换行
        'block-opening-brace-space-before': 'always', // 大括号前需要空格 a {}
        'block-opening-brace-space-after': 'always-single-line', // 单行块大括号开端之后需要空格
        'selector-list-comma-space-after': 'always', // 选择器逗号空格 .a, .b {}
        'selector-list-comma-space-before': 'never', // 选择器逗号空格 .a, .b {}
        'rule-empty-line-before': ['always-multi-line', {
            except: ['first-nested']
        }], // ⭐多行规则之前要有空行
        'at-rule-empty-line-before': ['always', { except: 'blockless-after-same-name-blockless', ignore: 'after-comment' }], // 在规则之前要求空行
    },
    ignoreFiles: ['node_modules/**/*'],
}
```

### 关闭规则

从CSS中关闭规则

规则可以通过在你的 CSS 中使用特定的注释临时关闭。例如，你可以关闭所有的规则：

```
/* stylelint-disable */
a {}
/* stylelint-enable */
```



或者你可以关闭个别的规则：

```
/* stylelint-disable selector-no-id, declaration-no-important  */
#id {
  color: pink !important;
}
/* stylelint-enable */
```



你可以使用`/* stylelint-disable-line */`注释在个别的行上关闭规则，在其之后你不需要显式的重新开启它们：

```
#id { /* stylelint-disable-line */
  color: pink !important; /* stylelint-disable-line declaration-no-important */
}
```



你也可以使用`/* stylelint-disable-next-line */`注释在下一行上关闭规则，在其之后你不需要显式的重新开启它们：

```
#id {
  /* stylelint-disable-next-line declaration-no-important */
  color: pink !important;
}
```



复杂、重叠的禁用和启用模式也是支持的：

```
/* stylelint-disable */
/* stylelint-enable foo */
/* stylelint-disable foo */
/* stylelint-enable */
/* stylelint-disable foo, bar */
/* stylelint-disable baz */
/* stylelint-enable baz, bar */
/* stylelint-enable foo */
```

**警告：***选择器和值列表*中的注释目前是被忽略的。



### 定制化配置

```js
module.exports = {
  extends: ["stylelint-config-standard", "css-properties-sorting"],
  plugins: ["stylelint-order"], // stylelint-order是CSS属性排序插件
  rules: {
    // "color-hex-case": "lower", // 颜色值为小写字母(stylelint-config-standard)
    // "color-no-invalid-hex": true, // 颜色值不能为无效值(stylelint-config-standard)
    "font-family-name-quotes": "always-where-recommended", // 字体系列中命名时带引号
    "function-url-quotes": "always", // 地址一定要写引号
    "number-leading-zero": "never", // 要求或分数低于1的数字禁止前导零
    "number-no-trailing-zeros": true, // 禁止在数量尾随零
    "string-quotes": "double", // 指定字串，双引号
    "length-zero-no-unit": true, // 禁止单位零长度。
    "value-keyword-case": "lower", // 指定小写关键字的值
    "value-list-comma-newline-after": "always-multi-line",// 在值列表的逗号后指定一个换行符或禁止留有空格
    "shorthand-property-no-redundant-values": true, // 不允许在简写属性冗余值
    // "property-case": "lower", // 为属性指定小写(stylelint-config-standard)
    "keyframe-declaration-no-important": true, // 不允许!important在关键帧声明
    // "block-closing-brace-empty-line-before": "never", // 不允许关闭括号前空一行(stylelint-config-standard)
    // "block-closing-brace-newline-after": "always", // 需要一个换行符关闭括号后的空白(stylelint-config-standard)
    // "block-opening-brace-newline-after": "always-multi-line", // 开括号的块之后需要新的一行(stylelint-config-standard)
    "selector-class-pattern": "^[a-z]+([a-z0-9]?|[a-z0-9\\-\\_]*[a-z0-9])$", // 指定一个模式类选择符，限制选择器名称写法
    "selector-id-pattern": "^[a-z]+([a-z0-9]?|[a-z0-9\\-\\_]*[a-z0-9])$", // 指定一个模式，id选择器，限制选择器名称写法
    "value-keyword-case": "lower", // 属性值小写
    "no-empty-source": null, // 不允许空的来源
    "at-rule-no-unknown": null, // 不允许at-rules不明
    // "indentation": 2, // 指定缩进(stylelint-config-standard)
    "max-nesting-depth": 3, // 允许嵌套的深度为3
    "no-duplicate-selectors": true, // 不允许重复的选择器
    // "no-eol-whitespace": true, // 不允许行尾空白(stylelint-config-standard)
    // "no-invalid-double-slash-comments": true // 不允许双斜杠注释(/ /…)不支持CSS(stylelint-config-standard)
    "order/order": [ // 指定声明块内的内容顺序
      ["custom-properties", "declarations"], {
        "disableFix": true
      }
    ],
    "order/properties-order": [ // 指定声明块内属性的字母顺序
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      'hyphens',
      'src',
      'line-height',
      'letter-spacing',
      'word-spacing',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      'background',
      'background-attachment',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'border',
      'border-collapse',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-color',
      'border-image',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'border-spacing',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-top-left-radius',
      'border-radius-topright',
      'border-radius-bottomright',
      'border-radius-bottomleft',
      'border-radius-topleft',
      'content',
      'quotes',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'zoom',
      'transform',
      'box-align',
      'box-flex',
      'box-orient',
      'box-pack',
      'box-shadow',
      'box-sizing',
      'table-layout',
      'animation',
      'animation-delay',
      'animation-duration',
      'animation-iteration-count',
      'animation-name',
      'animation-play-state',
      'animation-timing-function',
      'animation-fill-mode',
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'background-clip',
      'backface-visibility',
      'resize',
      'appearance',
      'user-select',
      'interpolation-mode',
      'direction',
      'marks',
      'page',
      'set-link-source',
      'unicode-bidi',
      'speak'
    ]
  }
};
```



## vscode 编辑器安装插件



## 示例配置

[全规则](http://stylelint.cn/user-guide/rules/)

### Color

- [`color-hex-case`](http://stylelint.cn/user-guide/rules/color-hex-case/): Specify lowercase or uppercase for hex colors .
- [`color-hex-case`](http://stylelint.cn/user-guide/rules/color-hex-case/): 指定十六进制颜色大小写 。
- [`color-hex-length`](http://stylelint.cn/user-guide/rules/color-hex-length/): Specify short or long notation for hex colors .
- [`color-hex-length`](http://stylelint.cn/user-guide/rules/color-hex-length/): 指定十六进制颜色是否使用缩写 。
- [`color-named`](http://stylelint.cn/user-guide/rules/color-named/): Require (where possible) or disallow named colors.
- [`color-named`](http://stylelint.cn/user-guide/rules/color-named/): 要求 (可能的情况下) 或 禁止使用命名的颜色。
- [`color-no-hex`](http://stylelint.cn/user-guide/rules/color-no-hex/): Disallow hex colors.
- [`color-no-hex`](http://stylelint.cn/user-guide/rules/color-no-hex/): 禁止使用十六进制颜色。
- [`color-no-invalid-hex`](http://stylelint.cn/user-guide/rules/color-no-invalid-hex/): Disallow invalid hex colors.
- [`color-no-invalid-hex`](http://stylelint.cn/user-guide/rules/color-no-invalid-hex/): 禁止使用无效的十六进制颜色。

### Font family

- [`font-family-name-quotes`](http://stylelint.cn/user-guide/rules/font-family-name-quotes/): Specify whether or not quotation marks should be used around font family names.
- [`font-family-name-quotes`](http://stylelint.cn/user-guide/rules/font-family-name-quotes/)：指定字体名称是否需要使用引号引起来。
- [`font-family-no-duplicate-names`](http://stylelint.cn/user-guide/rules/font-family-no-duplicate-names/): Disallow duplicate font family names.
- [`font-family-no-duplicate-names`](http://stylelint.cn/user-guide/rules/font-family-no-duplicate-names/): 禁止使用重复的字体名称。

### Font weight

- [`font-weight-notation`](http://stylelint.cn/user-guide/rules/font-weight-notation/): Require numeric or named (where possible) `font-weight` values.
- [`font-weight-notation`](http://stylelint.cn/user-guide/rules/font-weight-notation/)：要求使用数字或命名的 (可能的情况下) `font-weight` 值。

### Function

- [`function-blacklist`](http://stylelint.cn/user-guide/rules/function-blacklist/): Specify a blacklist of disallowed functions.
- [`function-blacklist`](http://stylelint.cn/user-guide/rules/function-blacklist/)：指定一个禁用的函数的黑名单。
- [`function-calc-no-unspaced-operator`](http://stylelint.cn/user-guide/rules/function-calc-no-unspaced-operator/): Disallow an unspaced operator within `calc` functions.
- [`function-calc-no-unspaced-operator`](http://stylelint.cn/user-guide/rules/function-calc-no-unspaced-operator/)：禁止在 `calc` 函数内使用不加空格的操作符。
- [`function-comma-newline-after`](http://stylelint.cn/user-guide/rules/function-comma-newline-after/): Require a newline or disallow whitespace after the commas of functions.
- [`function-comma-newline-after`](http://stylelint.cn/user-guide/rules/function-comma-newline-after/)：在函数的逗号之后要求有一个换行符或禁止有空白。
- [`function-comma-newline-before`](http://stylelint.cn/user-guide/rules/function-comma-newline-before/): Require a newline or disallow whitespace before the commas of functions.
- [`function-comma-newline-before`](http://stylelint.cn/user-guide/rules/function-comma-newline-before/)：在函数的逗号之前要求有一个换行符或禁止有空白。
- [`function-comma-space-after`](http://stylelint.cn/user-guide/rules/function-comma-space-after/): Require a single space or disallow whitespace after the commas of functions.
- [`function-comma-space-after`](http://stylelint.cn/user-guide/rules/function-comma-space-after/)：在函数的逗号之后要求有一个空格或禁止有空白。
- [`function-comma-space-before`](http://stylelint.cn/user-guide/rules/function-comma-space-before/): Require a single space or disallow whitespace before the commas of functions.
- [`function-comma-space-before`](http://stylelint.cn/user-guide/rules/function-comma-space-before/)：在函数的逗号之前要求有一个空格或禁止有空白。
- [`function-linear-gradient-no-nonstandard-direction`](http://stylelint.cn/user-guide/rules/function-linear-gradient-no-nonstandard-direction/): Disallow direction values in `linear-gradient()` calls that are not valid according to the [standard syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient#Syntax).
- [`function-linear-gradient-no-nonstandard-direction`](http://stylelint.cn/user-guide/rules/function-linear-gradient-no-nonstandard-direction/)：根据[标准语法](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient#Syntax)，禁止 `linear-gradient()` 中无效的方向值。
- [`function-max-empty-lines`](http://stylelint.cn/user-guide/rules/function-max-empty-lines/): Limit the number of adjacent empty lines within functions.
- [`function-max-empty-lines`](http://stylelint.cn/user-guide/rules/function-max-empty-lines/)：限制函数中相邻的空行数量。
- [`function-name-case`](http://stylelint.cn/user-guide/rules/function-name-case/): Specify lowercase or uppercase for function names.
- [`function-name-case`](http://stylelint.cn/user-guide/rules/function-name-case/)：指定函数名称的大小写。
- [`function-parentheses-newline-inside`](http://stylelint.cn/user-guide/rules/function-parentheses-newline-inside/): Require a newline or disallow whitespace on the inside of the parentheses of functions.
- [`function-parentheses-newline-inside`](http://stylelint.cn/user-guide/rules/function-parentheses-newline-inside/)：在函数的括号内要求有一个换行符或禁止有空白。
- [`function-parentheses-space-inside`](http://stylelint.cn/user-guide/rules/function-parentheses-space-inside/): Require a single space or disallow whitespace on the inside of the parentheses of functions.
- [`function-parentheses-space-inside`](http://stylelint.cn/user-guide/rules/function-parentheses-space-inside/)：在函数的括号内要有一个空格或禁止有空白。
- [`function-url-data-uris`](http://stylelint.cn/user-guide/rules/function-url-data-uris/): Require or disallow data URIs for urls.
- [`function-url-data-uris`](http://stylelint.cn/user-guide/rules/function-url-data-uris/)：要求或禁止在 url 中使用 data URI。
- [`function-url-no-scheme-relative`](http://stylelint.cn/user-guide/rules/function-url-no-scheme-relative/): Disallow scheme-relative urls.
- [`function-url-no-scheme-relative`](http://stylelint.cn/user-guide/rules/function-url-no-scheme-relative/)：禁止使用相对协议的链接。
- [`function-url-quotes`](http://stylelint.cn/user-guide/rules/function-url-quotes/): Require or disallow quotes for urls.
- [`function-url-quotes`](http://stylelint.cn/user-guide/rules/function-url-quotes/)：要求或禁止 url 使用引号。
- [`function-url-scheme-whitelist`](http://stylelint.cn/user-guide/rules/function-url-scheme-whitelist/): Specify a whitelist of allowed url schemes.
- [`function-url-scheme-whitelist`](http://stylelint.cn/user-guide/rules/function-url-scheme-whitelist/)：指定一个允许的 url 协议的白名单。
- [`function-whitelist`](http://stylelint.cn/user-guide/rules/function-whitelist/): Specify a whitelist of allowed functions.
- [`function-whitelist`](http://stylelint.cn/user-guide/rules/function-whitelist/)：指定一个允许的函数的白名单。
- [`function-whitespace-after`](http://stylelint.cn/user-guide/rules/function-whitespace-after/): Require or disallow whitespace after functions.
- [`function-whitespace-after`](http://stylelint.cn/user-guide/rules/function-whitespace-after/)：要求或禁止在函数之后有空白。

### Number

- [`number-leading-zero`](http://stylelint.cn/user-guide/rules/number-leading-zero/): Require or disallow a leading zero for fractional numbers less than 1 .
- [`number-leading-zero`](http://stylelint.cn/user-guide/rules/number-leading-zero/)：要求或禁止小于 1 的小数的前导 0 。
- [`number-max-precision`](http://stylelint.cn/user-guide/rules/number-max-precision/): Limit the number of decimal places allowed in numbers.
- [`number-max-precision`](http://stylelint.cn/user-guide/rules/number-max-precision/)：限制小数位数。
- [`number-no-trailing-zeros`](http://stylelint.cn/user-guide/rules/number-no-trailing-zeros/): Disallow trailing zeros in numbers .
- [`number-no-trailing-zeros`](http://stylelint.cn/user-guide/rules/number-no-trailing-zeros/)：禁止数字中的拖尾 0 。

### String

- [`string-no-newline`](http://stylelint.cn/user-guide/rules/string-no-newline/): Disallow (unescaped) newlines in strings.
- [`string-no-newline`](http://stylelint.cn/user-guide/rules/string-no-newline/)：禁止在字符串中使用（非转义的）换行符。
- [`string-quotes`](http://stylelint.cn/user-guide/rules/string-quotes/): Specify single or double quotes around strings .
- [`string-quotes`](http://stylelint.cn/user-guide/rules/string-quotes/)：指定字符串使用单引号还是双引号 。

### Length

- [`length-zero-no-unit`](http://stylelint.cn/user-guide/rules/length-zero-no-unit/): Disallow units for zero lengths .
- [`length-zero-no-unit`](http://stylelint.cn/user-guide/rules/length-zero-no-unit/): 长度为0时，禁止使用单位 。

### Time

- [`time-no-imperceptible`](http://stylelint.cn/user-guide/rules/time-no-imperceptible/): Disallow `animation` and `transition` less than or equal to 100ms.
- [`time-no-imperceptible`](http://stylelint.cn/user-guide/rules/time-no-imperceptible/)：禁止 `animation` 和 `transition` 小于或等于 100ms。

### Unit

- [`unit-blacklist`](http://stylelint.cn/user-guide/rules/unit-blacklist/): Specify a blacklist of disallowed units.
- [`unit-blacklist`](http://stylelint.cn/user-guide/rules/unit-blacklist/)：指定一个禁止使用的单位的黑名单。
- [`unit-case`](http://stylelint.cn/user-guide/rules/unit-case/): Specify lowercase or uppercase for units.
- [`unit-case`](http://stylelint.cn/user-guide/rules/unit-case/)：指定单位的大小写。
- [`unit-no-unknown`](http://stylelint.cn/user-guide/rules/unit-no-unknown/): Disallow unknown units.
- [`unit-no-unknown`](http://stylelint.cn/user-guide/rules/unit-no-unknown/)：禁止使用未知单位。
- [`unit-whitelist`](http://stylelint.cn/user-guide/rules/unit-whitelist/): Specify a whitelist of allowed units.
- [`unit-whitelist`](http://stylelint.cn/user-guide/rules/unit-whitelist/)：指定一个所允许的单位的白名单。

### Value

- [`value-keyword-case`](http://stylelint.cn/user-guide/rules/value-keyword-case/): Specify lowercase or uppercase for keywords values.
- [`value-keyword-case`](http://stylelint.cn/user-guide/rules/value-keyword-case/)：指定关键字的值的大小写。
- [`value-no-vendor-prefix`](http://stylelint.cn/user-guide/rules/value-no-vendor-prefix/): Disallow vendor prefixes for values.
- [`value-no-vendor-prefix`](http://stylelint.cn/user-guide/rules/value-no-vendor-prefix/)：禁止给值添加浏览器引擎前缀。

### Value list

- [`value-list-comma-newline-after`](http://stylelint.cn/user-guide/rules/value-list-comma-newline-after/): Require a newline or disallow whitespace after the commas of value lists.
- [`value-list-comma-newline-after`](http://stylelint.cn/user-guide/rules/value-list-comma-newline-after/)：在值列表的逗号之后要求有一个换行符或禁止有空白。
- [`value-list-comma-newline-before`](http://stylelint.cn/user-guide/rules/value-list-comma-newline-before/): Require a newline or disallow whitespace before the commas of value lists.
- [`value-list-comma-newline-before`](http://stylelint.cn/user-guide/rules/value-list-comma-newline-before/)：在值列表的逗号之前要求有一个换行符或禁止有空白。
- [`value-list-comma-space-after`](http://stylelint.cn/user-guide/rules/value-list-comma-space-after/): Require a single space or disallow whitespace after the commas of value lists.
- [`value-list-comma-space-after`](http://stylelint.cn/user-guide/rules/value-list-comma-space-after/)：在值列表的逗号之后要求有一个空格或禁止有空白。
- [`value-list-comma-space-before`](http://stylelint.cn/user-guide/rules/value-list-comma-space-before/): Require a single space or disallow whitespace before the commas of value lists.
- [`value-list-comma-space-before`](http://stylelint.cn/user-guide/rules/value-list-comma-space-before/)：在值列表的逗号之前要求有一个空格或禁止有空白。
- [`value-list-max-empty-lines`](http://stylelint.cn/user-guide/rules/value-list-max-empty-lines/): Limit the number of adjacent empty lines within value lists.
- [`value-list-max-empty-lines`](http://stylelint.cn/user-guide/rules/value-list-max-empty-lines/)：限制值列表中相邻空行数量。

### Custom property

- [`custom-property-empty-line-before`](http://stylelint.cn/user-guide/rules/custom-property-empty-line-before/): Require or disallow an empty line before custom properties.
- [`custom-property-empty-line-before`](http://stylelint.cn/user-guide/rules/custom-property-empty-line-before/)：要求或禁止在自定义属性之前有一行空行。
- [`custom-property-no-outside-root`](http://stylelint.cn/user-guide/rules/custom-property-no-outside-root/): Disallow custom properties outside of `:root` rules.
- [`custom-property-no-outside-root`](http://stylelint.cn/user-guide/rules/custom-property-no-outside-root/)：禁止在 `:root` 规则之外使用自定义属性。
- [`custom-property-pattern`](http://stylelint.cn/user-guide/rules/custom-property-pattern/): Specify a pattern for custom properties.
- [`custom-property-pattern`](http://stylelint.cn/user-guide/rules/custom-property-pattern/)：为自定义属性指定一个匹配模式。

### Shorthand property

- [`shorthand-property-no-redundant-values`](http://stylelint.cn/user-guide/rules/shorthand-property-no-redundant-values/): Disallow redundant values in shorthand properties .
- [`shorthand-property-no-redundant-values`](http://stylelint.cn/user-guide/rules/shorthand-property-no-redundant-values/)：禁止在简写属性中使用冗余值 。

### Property

- [`property-blacklist`](http://stylelint.cn/user-guide/rules/property-blacklist/): Specify a blacklist of disallowed properties.
- [`property-blacklist`](http://stylelint.cn/user-guide/rules/property-blacklist/)：指定一个禁止使用的属性的黑名单。
- [`property-case`](http://stylelint.cn/user-guide/rules/property-case/): Specify lowercase or uppercase for properties.
- [`property-case`](http://stylelint.cn/user-guide/rules/property-case/)：指定属性的大小写。
- [`property-no-unknown`](http://stylelint.cn/user-guide/rules/property-no-unknown/): Disallow unknown properties.
- [`property-no-unknown`](http://stylelint.cn/user-guide/rules/property-no-unknown/)：禁止使用未知属性。
- [`property-no-vendor-prefix`](http://stylelint.cn/user-guide/rules/property-no-vendor-prefix/): Disallow vendor prefixes for properties.
- [`property-no-vendor-prefix`](http://stylelint.cn/user-guide/rules/property-no-vendor-prefix/)：禁止属性使用浏览器引擎前缀。
- [`property-whitelist`](http://stylelint.cn/user-guide/rules/property-whitelist/): Specify a whitelist of allowed properties.
- [`property-whitelist`](http://stylelint.cn/user-guide/rules/property-whitelist/)：指定一个允许使用的属性的白名单。

### Keyframe declaration

- [`keyframe-declaration-no-important`](http://stylelint.cn/user-guide/rules/keyframe-declaration-no-important/): Disallow `!important` within keyframe declarations.
- [`keyframe-declaration-no-important`](http://stylelint.cn/user-guide/rules/keyframe-declaration-no-important/)：禁止在 keyframe 声明中使用 `!important`。

### Declaration

- [`declaration-bang-space-after`](http://stylelint.cn/user-guide/rules/declaration-bang-space-after/): Require a single space or disallow whitespace after the bang of declarations.
- [`declaration-bang-space-after`](http://stylelint.cn/user-guide/rules/declaration-bang-space-after/)：在感叹号之后要求有一个空格或禁止有空白。
- [`declaration-bang-space-before`](http://stylelint.cn/user-guide/rules/declaration-bang-space-before/): Require a single space or disallow whitespace before the bang of declarations.
- [`declaration-bang-space-before`](http://stylelint.cn/user-guide/rules/declaration-bang-space-before/)：在感叹号之前要求有一个空格或禁止有空白。
- [`declaration-colon-newline-after`](http://stylelint.cn/user-guide/rules/declaration-colon-newline-after/): Require a newline or disallow whitespace after the colon of declarations.
- [`declaration-colon-newline-after`](http://stylelint.cn/user-guide/rules/declaration-colon-newline-after/)：在冒号之后要求有一个换行符或禁止有空白。
- [`declaration-colon-space-after`](http://stylelint.cn/user-guide/rules/declaration-colon-space-after/): Require a single space or disallow whitespace after the colon of declarations .
- [`declaration-colon-space-after`](http://stylelint.cn/user-guide/rules/declaration-colon-space-after/)：在冒号之后要求有一个空格或禁止有空白 。
- [`declaration-colon-space-before`](http://stylelint.cn/user-guide/rules/declaration-colon-space-before/): Require a single space or disallow whitespace before the colon of declarations .
- [`declaration-colon-space-before`](http://stylelint.cn/user-guide/rules/declaration-colon-space-before/)：在冒号之前要求有一个空格或禁止有空白 。
- [`declaration-empty-line-before`](http://stylelint.cn/user-guide/rules/declaration-empty-line-before/): Require or disallow an empty line before declarations.
- [`declaration-empty-line-before`](http://stylelint.cn/user-guide/rules/declaration-empty-line-before/)：要求或禁止在声明语句之前有空行。
- [`declaration-no-important`](http://stylelint.cn/user-guide/rules/declaration-no-important/): Disallow `!important` within declarations.
- [`declaration-no-important`](http://stylelint.cn/user-guide/rules/declaration-no-important/)：禁止在声明中使用 `!important`。
- [`declaration-property-unit-blacklist`](http://stylelint.cn/user-guide/rules/declaration-property-unit-blacklist/): Specify a blacklist of disallowed property and unit pairs within declarations.
- [`declaration-property-unit-blacklist`](http://stylelint.cn/user-guide/rules/declaration-property-unit-blacklist/)：指定一个在声明中禁止使用的属性和单位的黑名单。
- [`declaration-property-unit-whitelist`](http://stylelint.cn/user-guide/rules/declaration-property-unit-whitelist/): Specify a whitelist of allowed property and unit pairs within declarations.
- [`declaration-property-unit-whitelist`](http://stylelint.cn/user-guide/rules/declaration-property-unit-whitelist/)：指定一个在声明中允许使用的属性和单位的白名单。
- [`declaration-property-value-blacklist`](http://stylelint.cn/user-guide/rules/declaration-property-value-blacklist/): Specify a blacklist of disallowed property and value pairs within declarations.
- [`declaration-property-value-blacklist`](http://stylelint.cn/user-guide/rules/declaration-property-value-blacklist/)：指定一个在声明中禁止使用的属性和值的黑名单。
- [`declaration-property-value-whitelist`](http://stylelint.cn/user-guide/rules/declaration-property-value-whitelist/): Specify a whitelist of allowed property and value pairs within declarations.
- [`declaration-property-value-whitelist`](http://stylelint.cn/user-guide/rules/declaration-property-value-whitelist/)：指定一个在声明中允许使用的属性和值的白名单。

### Declaration block

- [`declaration-block-no-duplicate-properties`](http://stylelint.cn/user-guide/rules/declaration-block-no-duplicate-properties/): Disallow duplicate properties within declaration blocks.
- [`declaration-block-no-duplicate-properties`](http://stylelint.cn/user-guide/rules/declaration-block-no-duplicate-properties/)：在声明的块中中禁止出现重复的属性。
- [`declaration-block-no-ignored-properties`](http://stylelint.cn/user-guide/rules/declaration-block-no-ignored-properties/): Disallow property values that are ignored due to another property value in the same rule.
- [`declaration-block-no-ignored-properties`](http://stylelint.cn/user-guide/rules/declaration-block-no-ignored-properties/)：禁止使用由于其他属性的原因而被忽略的属性。
- [`declaration-block-no-redundant-longhand-properties`](http://stylelint.cn/user-guide/rules/declaration-block-no-redundant-longhand-properties/): Disallow longhand properties that can be combined into one shorthand property.
- [`declaration-block-no-redundant-longhand-properties`](http://stylelint.cn/user-guide/rules/declaration-block-no-redundant-longhand-properties/)：禁止使用可以缩写却不缩写的属性。
- [`declaration-block-no-shorthand-property-overrides`](http://stylelint.cn/user-guide/rules/declaration-block-no-shorthand-property-overrides/): Disallow shorthand properties that override related longhand properties within declaration blocks.
- [`declaration-block-no-shorthand-property-overrides`](http://stylelint.cn/user-guide/rules/declaration-block-no-shorthand-property-overrides/)：禁止缩写属性覆盖相关普通写法属性。
- [`declaration-block-properties-order`](http://stylelint.cn/user-guide/rules/declaration-block-properties-order/): Specify the order of properties within declaration blocks .
- [`declaration-block-properties-order`](http://stylelint.cn/user-guide/rules/declaration-block-properties-order/)：指定声明块中的属性顺序 。**待调整**
- [`declaration-block-semicolon-newline-after`](http://stylelint.cn/user-guide/rules/declaration-block-semicolon-newline-after/): Require a newline or disallow whitespace after the semicolons of declaration blocks.
- [`declaration-block-semicolon-newline-after`](http://stylelint.cn/user-guide/rules/declaration-block-semicolon-newline-after/)：在声明块的分号之后要求有一个换行符或禁止有空白。
- [`declaration-block-semicolon-newline-before`](http://stylelint.cn/user-guide/rules/declaration-block-semicolon-newline-before/): Require a newline or disallow whitespace before the semicolons of declaration blocks.
- [`declaration-block-semicolon-newline-before`](http://stylelint.cn/user-guide/rules/declaration-block-semicolon-newline-before/)：在声明块的分号之前要求有一个换行符或禁止有空白。
- [`declaration-block-semicolon-space-after`](http://stylelint.cn/user-guide/rules/declaration-block-semicolon-space-after/): Require a single space or disallow whitespace after the semicolons of declaration blocks.
- [`declaration-block-semicolon-space-after`](http://stylelint.cn/user-guide/rules/declaration-block-semicolon-space-after/)：在声明块的分号之后要求有一个空格或禁止有空白。
- [`declaration-block-semicolon-space-before`](http://stylelint.cn/user-guide/rules/declaration-block-semicolon-space-before/): Require a single space or disallow whitespace before the semicolons of declaration blocks.
- [`declaration-block-semicolon-space-before`](http://stylelint.cn/user-guide/rules/declaration-block-semicolon-space-before/)：在声明块的分号之后前要求有一个空格或禁止有空白。
- [`declaration-block-single-line-max-declarations`](http://stylelint.cn/user-guide/rules/declaration-block-single-line-max-declarations/): Limit the number of declaration within single line declaration blocks.
- [`declaration-block-single-line-max-declarations`](http://stylelint.cn/user-guide/rules/declaration-block-single-line-max-declarations/)：限制单行声明块中声明的数量。
- [`declaration-block-trailing-semicolon`](http://stylelint.cn/user-guide/rules/declaration-block-trailing-semicolon/): Require or disallow a trailing semicolon within declaration blocks.
- [`declaration-block-trailing-semicolon`](http://stylelint.cn/user-guide/rules/declaration-block-trailing-semicolon/)：要求或禁止在声明块中使用拖尾分号。

### Block

- [`block-closing-brace-empty-line-before`](http://stylelint.cn/user-guide/rules/block-closing-brace-empty-line-before/): Require or disallow an empty line before the closing brace of blocks.
- [`block-closing-brace-empty-line-before`](http://stylelint.cn/user-guide/rules/block-closing-brace-empty-line-before/)：要求或禁止在闭括号之前有空行。
- [`block-closing-brace-newline-after`](http://stylelint.cn/user-guide/rules/block-closing-brace-newline-after/): Require a newline or disallow whitespace after the closing brace of blocks .
- [`block-closing-brace-newline-after`](http://stylelint.cn/user-guide/rules/block-closing-brace-newline-after/)：在闭括号之后要求有一个换行符或禁止有空白 。
- [`block-closing-brace-newline-before`](http://stylelint.cn/user-guide/rules/block-closing-brace-newline-before/): Require a newline or disallow whitespace before the closing brace of blocks .
- [`block-closing-brace-newline-before`](http://stylelint.cn/user-guide/rules/block-closing-brace-newline-before/)：在闭括号之前要求有一个换行符或禁止有空白 。
- [`block-closing-brace-space-after`](http://stylelint.cn/user-guide/rules/block-closing-brace-space-after/): Require a single space or disallow whitespace after the closing brace of blocks.
- [`block-closing-brace-space-after`](http://stylelint.cn/user-guide/rules/block-closing-brace-space-after/)：在闭括号之后要求有一个空格或禁止有空格。
- [`block-closing-brace-space-before`](http://stylelint.cn/user-guide/rules/block-closing-brace-space-before/): Require a single space or disallow whitespace before the closing brace of blocks.
- [`block-closing-brace-space-before`](http://stylelint.cn/user-guide/rules/block-closing-brace-space-before/)：在闭括号之前要求有一个空格或禁止有空格。
- [`block-no-empty`](http://stylelint.cn/user-guide/rules/block-no-empty/): Disallow empty blocks.
- [`block-no-empty`](http://stylelint.cn/user-guide/rules/block-no-empty/)：禁止出现空块。
- [`block-no-single-line`](http://stylelint.cn/user-guide/rules/block-no-single-line/): Disallow single-line blocks.
- [`block-no-single-line`](http://stylelint.cn/user-guide/rules/block-no-single-line/)：禁止出现单行块。
- [`block-opening-brace-newline-after`](http://stylelint.cn/user-guide/rules/block-opening-brace-newline-after/): Require a newline after the opening brace of blocks .
- [`block-opening-brace-newline-after`](http://stylelint.cn/user-guide/rules/block-opening-brace-newline-after/)：在开括号之后要求有一个换行符 。
- [`block-opening-brace-newline-before`](http://stylelint.cn/user-guide/rules/block-opening-brace-newline-before/): Require a newline or disallow whitespace before the opening brace of blocks .
- [`block-opening-brace-newline-before`](http://stylelint.cn/user-guide/rules/block-opening-brace-newline-before/)：在括开号之前要求有一个换行符或禁止有空白 。
- [`block-opening-brace-space-after`](http://stylelint.cn/user-guide/rules/block-opening-brace-space-after/): Require a single space or disallow whitespace after the opening brace of blocks .
- [`block-opening-brace-space-after`](http://stylelint.cn/user-guide/rules/block-opening-brace-space-after/)：在开括号之后要求有一个空格或禁止有空白 。
- [`block-opening-brace-space-before`](http://stylelint.cn/user-guide/rules/block-opening-brace-space-before/): Require a single space or disallow whitespace before the opening brace of blocks .
- [`block-opening-brace-space-before`](http://stylelint.cn/user-guide/rules/block-opening-brace-space-before/)：在开括号之前要求有一个空格或禁止有空白 。

### Selector

- [`selector-attribute-brackets-space-inside`](http://stylelint.cn/user-guide/rules/selector-attribute-brackets-space-inside/): Require a single space or disallow whitespace on the inside of the brackets within attribute selectors.
- [`selector-attribute-brackets-space-inside`](http://stylelint.cn/user-guide/rules/selector-attribute-brackets-space-inside/)：在特性选择器的方括号内要求有空格或禁止有空白。
- [`selector-attribute-operator-blacklist`](http://stylelint.cn/user-guide/rules/selector-attribute-operator-blacklist/): Specify a blacklist of disallowed attribute operators.
- [`selector-attribute-operator-blacklist`](http://stylelint.cn/user-guide/rules/selector-attribute-operator-blacklist/)：指定一个禁止使用的特性(attribute)操作符的黑名单。
- [`selector-attribute-operator-space-after`](http://stylelint.cn/user-guide/rules/selector-attribute-operator-space-after/): Require a single space or disallow whitespace after operators within attribute selectors.
- [`selector-attribute-operator-space-after`](http://stylelint.cn/user-guide/rules/selector-attribute-operator-space-after/)：在特性选择器的操作符之后要求有一个空格或禁止有空白。
- [`selector-attribute-operator-space-before`](http://stylelint.cn/user-guide/rules/selector-attribute-operator-space-before/): Require a single space or disallow whitespace before operators within attribute selectors.
- [`selector-attribute-operator-space-before`](http://stylelint.cn/user-guide/rules/selector-attribute-operator-space-before/)：在特性选择器的操作符之前要求有一个空格或禁止有空白。
- [`selector-attribute-operator-whitelist`](http://stylelint.cn/user-guide/rules/selector-attribute-operator-whitelist/): Specify a whitelist of allowed attribute operators.
- [`selector-attribute-operator-whitelist`](http://stylelint.cn/user-guide/rules/selector-attribute-operator-whitelist/)：指定允许使用的特性(attribute)操作符的白名单。
- [`selector-attribute-quotes`](http://stylelint.cn/user-guide/rules/selector-attribute-quotes/): Require or disallow quotes for attribute values.
- [`selector-attribute-quotes`](http://stylelint.cn/user-guide/rules/selector-attribute-quotes/)：要求或禁止特性值使用引号。
- [`selector-class-pattern`](http://stylelint.cn/user-guide/rules/selector-class-pattern/): Specify a pattern for class selectors.
- [`selector-class-pattern`](http://stylelint.cn/user-guide/rules/selector-class-pattern/)：为类选择器指定一个匹配模式。
- [`selector-combinator-space-after`](http://stylelint.cn/user-guide/rules/selector-combinator-space-after/): Require a single space or disallow whitespace after the combinators of selectors .
- [`selector-combinator-space-after`](http://stylelint.cn/user-guide/rules/selector-combinator-space-after/)：在关系选择符之后要求有一个空格或禁止有空白 。
- [`selector-combinator-space-before`](http://stylelint.cn/user-guide/rules/selector-combinator-space-before/): Require a single space or disallow whitespace before the combinators of selectors .
- [`selector-combinator-space-before`](http://stylelint.cn/user-guide/rules/selector-combinator-space-before/)：在关系选择符之前要求有一个空格或禁止有空白 。
- [`selector-descendant-combinator-no-non-space`](http://stylelint.cn/user-guide/rules/selector-descendant-combinator-no-non-space/): Disallow non-space characters for descendant combinators of selectors.
- [`selector-descendant-combinator-no-non-space`](http://stylelint.cn/user-guide/rules/selector-descendant-combinator-no-non-space/)：禁止包含选择符出现非空格字符。
- [`selector-id-pattern`](http://stylelint.cn/user-guide/rules/selector-id-pattern/): Specify a pattern for id selectors.
- [`selector-id-pattern`](http://stylelint.cn/user-guide/rules/selector-id-pattern/)：指定一个 id 选择器的匹配模式。
- [`selector-max-compound-selectors`](http://stylelint.cn/user-guide/rules/selector-max-compound-selectors/): Limit the number of compound selectors in a selector.
- [`selector-max-compound-selectors`](http://stylelint.cn/user-guide/rules/selector-max-compound-selectors/)：限制复合选择器的数量。
- [`selector-max-specificity`](http://stylelint.cn/user-guide/rules/selector-max-specificity/): Limit the specificity of selectors.
- [`selector-max-specificity`](http://stylelint.cn/user-guide/rules/selector-max-specificity/)：限制选择器的优先级。
- [`selector-nested-pattern`](http://stylelint.cn/user-guide/rules/selector-nested-pattern/): Specify a pattern for the selectors of rules nested within rules.
- [`selector-nested-pattern`](http://stylelint.cn/user-guide/rules/selector-nested-pattern/)：指定一个嵌套选择器的匹配模式。
- [`selector-no-attribute`](http://stylelint.cn/user-guide/rules/selector-no-attribute/): Disallow attribute selectors.
- [`selector-no-attribute`](http://stylelint.cn/user-guide/rules/selector-no-attribute/)：禁用特性选择器。
- [`selector-no-combinator`](http://stylelint.cn/user-guide/rules/selector-no-combinator/): Disallow combinators in selectors.
- [`selector-no-combinator`](http://stylelint.cn/user-guide/rules/selector-no-combinator/)：禁用关系选择符。
- [`selector-no-empty`](http://stylelint.cn/user-guide/rules/selector-no-empty/): Disallow empty selectors.
- [`selector-no-empty`](http://stylelint.cn/user-guide/rules/selector-no-empty/)：禁止出现空选择器。
- [`selector-no-id`](http://stylelint.cn/user-guide/rules/selector-no-id/): Disallow id selectors.
- [`selector-no-id`](http://stylelint.cn/user-guide/rules/selector-no-id/)：禁用 id 选择器。
- [`selector-no-qualifying-type`](http://stylelint.cn/user-guide/rules/selector-no-qualifying-type/): Disallow qualifying a selector by type.
- [`selector-no-qualifying-type`](http://stylelint.cn/user-guide/rules/selector-no-qualifying-type/)：禁止使用类型对选择器进行限制。
- [`selector-no-type`](http://stylelint.cn/user-guide/rules/selector-no-type/): Disallow type selectors.
- [`selector-no-type`](http://stylelint.cn/user-guide/rules/selector-no-type/)：禁用类型选择器。
- [`selector-no-universal`](http://stylelint.cn/user-guide/rules/selector-no-universal/): Disallow the universal selector.
- [`selector-no-universal`](http://stylelint.cn/user-guide/rules/selector-no-universal/)：禁用通配符选择器。
- [`selector-no-vendor-prefix`](http://stylelint.cn/user-guide/rules/selector-no-vendor-prefix/): Disallow vendor prefixes for selectors.
- [`selector-no-vendor-prefix`](http://stylelint.cn/user-guide/rules/selector-no-vendor-prefix/)：禁止使用浏览器引擎前缀。
- [`selector-pseudo-class-blacklist`](http://stylelint.cn/user-guide/rules/selector-pseudo-class-blacklist/): Specify a blacklist of disallowed pseudo-class selectors.
- [`selector-pseudo-class-blacklist`](http://stylelint.cn/user-guide/rules/selector-pseudo-class-blacklist/)：指定一个禁止使用的伪类选择器的黑名单。
- [`selector-pseudo-class-case`](http://stylelint.cn/user-guide/rules/selector-pseudo-class-case/): Specify lowercase or uppercase for pseudo-class selectors.
- [`selector-pseudo-class-case`](http://stylelint.cn/user-guide/rules/selector-pseudo-class-case/)：指定伪类选择器的大小写。
- [`selector-pseudo-class-no-unknown`](http://stylelint.cn/user-guide/rules/selector-pseudo-class-no-unknown/): Disallow unknown pseudo-class selectors.
- [`selector-pseudo-class-no-unknown`](http://stylelint.cn/user-guide/rules/selector-pseudo-class-no-unknown/)：禁止使用未知的伪类选择器。
- [`selector-pseudo-class-parentheses-space-inside`](http://stylelint.cn/user-guide/rules/selector-pseudo-class-parentheses-space-inside/): Require a single space or disallow whitespace on the inside of the parentheses within pseudo-class selectors.
- [`selector-pseudo-class-parentheses-space-inside`](http://stylelint.cn/user-guide/rules/selector-pseudo-class-parentheses-space-inside/)：在伪类选择器的括号内要求使用一个空格或禁止有空白。
- [`selector-pseudo-class-whitelist`](http://stylelint.cn/user-guide/rules/selector-pseudo-class-whitelist/): Specify a whitelist of allowed pseudo-class selectors.
- [`selector-pseudo-class-whitelist`](http://stylelint.cn/user-guide/rules/selector-pseudo-class-whitelist/)：指定一个允许使用的伪类选择器的白名单。
- [`selector-pseudo-element-case`](http://stylelint.cn/user-guide/rules/selector-pseudo-element-case/): Specify lowercase or uppercase for pseudo-element selectors.
- [`selector-pseudo-element-case`](http://stylelint.cn/user-guide/rules/selector-pseudo-element-case/)：指定伪元素的大小写。
- [`selector-pseudo-element-colon-notation`](http://stylelint.cn/user-guide/rules/selector-pseudo-element-colon-notation/): Specify single or double colon notation for applicable pseudo-elements.
- [`selector-pseudo-element-colon-notation`](http://stylelint.cn/user-guide/rules/selector-pseudo-element-colon-notation/):指定伪元素使用单冒号还是双冒号。
- [`selector-pseudo-element-no-unknown`](http://stylelint.cn/user-guide/rules/selector-pseudo-element-no-unknown/): Disallow unknown pseudo-element selectors.
- [`selector-pseudo-element-no-unknown`](http://stylelint.cn/user-guide/rules/selector-pseudo-element-no-unknown/)：禁止使用未知的伪元素。
- [`selector-root-no-composition`](http://stylelint.cn/user-guide/rules/selector-root-no-composition/): Disallow the composition of `:root` in selectors.
- [`selector-root-no-composition`](http://stylelint.cn/user-guide/rules/selector-root-no-composition/)：禁止 `:root` 混合使用。
- [`selector-type-case`](http://stylelint.cn/user-guide/rules/selector-type-case/): Specify lowercase or uppercase for type selector.
- [`selector-type-case`](http://stylelint.cn/user-guide/rules/selector-type-case/)：指定类型选择器的大小写。
- [`selector-type-no-unknown`](http://stylelint.cn/user-guide/rules/selector-type-no-unknown/): Disallow unknown type selectors.
- [`selector-type-no-unknown`](http://stylelint.cn/user-guide/rules/selector-type-no-unknown/)：禁用未知的类型选择器。
- [`selector-max-empty-lines`](http://stylelint.cn/user-guide/rules/selector-max-empty-lines/): Limit the number of adjacent empty lines within selectors.
- [`selector-max-empty-lines`](http://stylelint.cn/user-guide/rules/selector-max-empty-lines/)：限制选择器中相邻空行数量。

### Selector list

- [`selector-list-comma-newline-after`](http://stylelint.cn/user-guide/rules/selector-list-comma-newline-after/): Require a newline or disallow whitespace after the commas of selector lists .
- [`selector-list-comma-newline-after`](http://stylelint.cn/user-guide/rules/selector-list-comma-newline-after/): 要求选择器列表的逗号之后有一个换行符或禁止在逗号之后有空白 。
- [`selector-list-comma-newline-before`](http://stylelint.cn/user-guide/rules/selector-list-comma-newline-before/): Require a newline or disallow whitespace before the commas of selector lists .
- [`selector-list-comma-newline-before`](http://stylelint.cn/user-guide/rules/selector-list-comma-newline-before/): 要求选择器列表的逗号之前有一个换行符或禁止在逗号之前有空白 。
- [`selector-list-comma-space-after`](http://stylelint.cn/user-guide/rules/selector-list-comma-space-after/): Require a single space or disallow whitespace after the commas of selector lists .
- [`selector-list-comma-space-after`](http://stylelint.cn/user-guide/rules/selector-list-comma-space-after/)：要求在选择器列表的逗号之后有一个空格，或禁止有空白 。
- [`selector-list-comma-space-before`](http://stylelint.cn/user-guide/rules/selector-list-comma-space-before/): Require a single space or disallow whitespace before the commas of selector lists .
- [`selector-list-comma-space-before`](http://stylelint.cn/user-guide/rules/selector-list-comma-space-before/)：要求在选择器列表的逗号之前有一个空格，或禁止有空白 。

### Root rule

- [`root-no-standard-properties`](http://stylelint.cn/user-guide/rules/root-no-standard-properties/): Disallow standard properties inside `:root` rules.
- [`root-no-standard-properties`](http://stylelint.cn/user-guide/rules/root-no-standard-properties/)：禁止在 `:root` 中出现标准属性。

### Rule

- [`rule-nested-empty-line-before`](http://stylelint.cn/user-guide/rules/rule-nested-empty-line-before/): Require or disallow an empty line before nested rules.
- [`rule-nested-empty-line-before`](http://stylelint.cn/user-guide/rules/rule-nested-empty-line-before/)：在嵌套的规则中要求或禁止有空行。
- [`rule-non-nested-empty-line-before`](http://stylelint.cn/user-guide/rules/rule-non-nested-empty-line-before/): Require or disallow an empty line before non-nested rules.
- [`rule-non-nested-empty-line-before`](http://stylelint.cn/user-guide/rules/rule-non-nested-empty-line-before/)：在非嵌套的规则之前要求或禁止有空行。

### Media feature

- [`media-feature-colon-space-after`](http://stylelint.cn/user-guide/rules/media-feature-colon-space-after/): Require a single space or disallow whitespace after the colon in media features.
- [`media-feature-colon-space-after`](http://stylelint.cn/user-guide/rules/media-feature-colon-space-after/)：在 media 特性中的冒号之后要求有一个空格或禁止有空白。
- [`media-feature-colon-space-before`](http://stylelint.cn/user-guide/rules/media-feature-colon-space-before/): Require a single space or disallow whitespace before the colon in media features.
- [`media-feature-colon-space-before`](http://stylelint.cn/user-guide/rules/media-feature-colon-space-before/)：在 media 特性中的冒号之前要求有一个空格或禁止有空白。
- [`media-feature-name-blacklist`](http://stylelint.cn/user-guide/rules/media-feature-name-blacklist/): Specify a blacklist of disallowed media feature names.
- [`media-feature-name-blacklist`](http://stylelint.cn/user-guide/rules/media-feature-name-blacklist/)：指定禁止使用的 media 特性名称的黑名单。
- [`media-feature-name-case`](http://stylelint.cn/user-guide/rules/media-feature-name-case/): Specify lowercase or uppercase for media feature names.
- [`media-feature-name-case`](http://stylelint.cn/user-guide/rules/media-feature-name-case/)：指定 media 特性名称的大小写。
- [`media-feature-name-no-unknown`](http://stylelint.cn/user-guide/rules/media-feature-name-no-unknown/): Disallow unknown media feature names.
- [`media-feature-name-no-unknown`](http://stylelint.cn/user-guide/rules/media-feature-name-no-unknown/)：禁止使用未知的 media 特性名称。
- [`media-feature-name-no-vendor-prefix`](http://stylelint.cn/user-guide/rules/media-feature-name-no-vendor-prefix/): Disallow vendor prefixes for media feature names.
- [`media-feature-name-no-vendor-prefix`](http://stylelint.cn/user-guide/rules/media-feature-name-no-vendor-prefix/)：禁止 media 特性名称带有浏览器引擎前缀。
- [`media-feature-name-whitelist`](http://stylelint.cn/user-guide/rules/media-feature-name-whitelist/): Specify a whitelist of allowed media feature names.
- [`media-feature-name-whitelist`](http://stylelint.cn/user-guide/rules/media-feature-name-whitelist/)：指定允许使用的 media 特性名称的白名单。
- [`media-feature-no-missing-punctuation`](http://stylelint.cn/user-guide/rules/media-feature-no-missing-punctuation/): Disallow missing punctuation for non-boolean media features.
- [`media-feature-no-missing-punctuation`](http://stylelint.cn/user-guide/rules/media-feature-no-missing-punctuation/)：禁止非布尔类型的 media 特性缺少标点。
- [`media-feature-parentheses-space-inside`](http://stylelint.cn/user-guide/rules/media-feature-parentheses-space-inside/): Require a single space or disallow whitespace on the inside of the parentheses within media features.
- [`media-feature-parentheses-space-inside`](http://stylelint.cn/user-guide/rules/media-feature-parentheses-space-inside/)：在media 特性的括号内要求有一个空格或禁止有空白。
- [`media-feature-range-operator-space-after`](http://stylelint.cn/user-guide/rules/media-feature-range-operator-space-after/): Require a single space or disallow whitespace after the range operator in media features.
- [`media-feature-range-operator-space-after`](http://stylelint.cn/user-guide/rules/media-feature-range-operator-space-after/)：在 media 特性的范围操作符之后要求有一个空格或禁止有空白。
- [`media-feature-range-operator-space-before`](http://stylelint.cn/user-guide/rules/media-feature-range-operator-space-before/): Require a single space or disallow whitespace before the range operator in media features.
- [`media-feature-range-operator-space-before`](http://stylelint.cn/user-guide/rules/media-feature-range-operator-space-before/)：在 media 特性的范围操作符之前要求有一个空格或禁止有空白。

### Custom media

- [`custom-media-pattern`](http://stylelint.cn/user-guide/rules/custom-media-pattern/): Specify a pattern for custom media query names.
- [`custom-media-pattern`](http://stylelint.cn/user-guide/rules/custom-media-pattern/)：指定一个自定义媒体查询名称的匹配模式。

### Media query list

- [`media-query-list-comma-newline-after`](http://stylelint.cn/user-guide/rules/media-query-list-comma-newline-after/): Require a newline or disallow whitespace after the commas of media query lists.
- [`media-query-list-comma-newline-after`](http://stylelint.cn/user-guide/rules/media-query-list-comma-newline-after/)：在媒体查询的逗号之后要求有一个换行符或禁止有空白。
- [`media-query-list-comma-newline-before`](http://stylelint.cn/user-guide/rules/media-query-list-comma-newline-before/): Require a newline or disallow whitespace before the commas of media query lists.
- [`media-query-list-comma-newline-before`](http://stylelint.cn/user-guide/rules/media-query-list-comma-newline-before/)：在媒体查询的逗号之前要求有一个换行符或禁止有空白。
- [`media-query-list-comma-space-after`](http://stylelint.cn/user-guide/rules/media-query-list-comma-space-after/): Require a single space or disallow whitespace after the commas of media query lists.
- [`media-query-list-comma-space-after`](http://stylelint.cn/user-guide/rules/media-query-list-comma-space-after/)：在媒体查询的逗号之后要求有一个空格或禁止有空白。
- [`media-query-list-comma-space-before`](http://stylelint.cn/user-guide/rules/media-query-list-comma-space-before/): Require a single space or disallow whitespace before the commas of media query lists.
- [`media-query-list-comma-space-before`](http://stylelint.cn/user-guide/rules/media-query-list-comma-space-before/)：在媒体查询的逗号之前要求有一个空格或禁止有空白。

### At-rule

- [`at-rule-blacklist`](http://stylelint.cn/user-guide/rules/at-rule-blacklist/): Specify a blacklist of disallowed at-rules.
- [`at-rule-blacklist`](http://stylelint.cn/user-guide/rules/at-rule-blacklist/)：指定一个禁止使用的 at 规则的黑名单。
- [`at-rule-empty-line-before`](http://stylelint.cn/user-guide/rules/at-rule-empty-line-before/): Require or disallow an empty line before at-rules .
- [`at-rule-empty-line-before`](http://stylelint.cn/user-guide/rules/at-rule-empty-line-before/)：要求或禁止在 at 规则之前有空行 。
- [`at-rule-name-case`](http://stylelint.cn/user-guide/rules/at-rule-name-case/): Specify lowercase or uppercase for at-rules names.
- [`at-rule-name-case`](http://stylelint.cn/user-guide/rules/at-rule-name-case/)：指定 at 规则名称的大小写。
- [`at-rule-name-newline-after`](http://stylelint.cn/user-guide/rules/at-rule-name-newline-after/): Require a newline after at-rule names.
- [`at-rule-name-newline-after`](http://stylelint.cn/user-guide/rules/at-rule-name-newline-after/)：要求在 at 规则之后有一个换行符。
- [`at-rule-name-space-after`](http://stylelint.cn/user-guide/rules/at-rule-name-space-after/): Require a single space after at-rule names.
- [`at-rule-name-space-after`](http://stylelint.cn/user-guide/rules/at-rule-name-space-after/)：要求在 at 规则之后有一个空格。
- [`at-rule-no-unknown`](http://stylelint.cn/user-guide/rules/at-rule-no-unknown/): Disallow unknown at-rules.
- [`at-rule-no-unknown`](http://stylelint.cn/user-guide/rules/at-rule-no-unknown/)：禁止使用未知的 at 规则。
- [`at-rule-no-vendor-prefix`](http://stylelint.cn/user-guide/rules/at-rule-no-vendor-prefix/): Disallow vendor prefixes for at-rules.
- [`at-rule-no-vendor-prefix`](http://stylelint.cn/user-guide/rules/at-rule-no-vendor-prefix/)：禁止 at 规则使用浏览器引擎前缀。
- [`at-rule-semicolon-newline-after`](http://stylelint.cn/user-guide/rules/at-rule-semicolon-newline-after/): Require a newline after the semicolon of at-rules .
- [`at-rule-semicolon-newline-after`](http://stylelint.cn/user-guide/rules/at-rule-semicolon-newline-after/)：要求在 at 规则的分号之后有一个换行符 。
- [`at-rule-whitelist`](http://stylelint.cn/user-guide/rules/at-rule-whitelist/): Specify a whitelist of allowed at-rules.
- [`at-rule-whitelist`](http://stylelint.cn/user-guide/rules/at-rule-whitelist/)：指定一个允许使用的 at 规则的白名单。

### stylelint-disable comment

- [`stylelint-disable-reason`](http://stylelint.cn/user-guide/rules/stylelint-disable-reason/): Require a reason comment before or after `stylelint-disable` comments.
- [`stylelint-disable-reason`](http://stylelint.cn/user-guide/rules/stylelint-disable-reason/)：要求在 `stylelint-disable` 注释之前或之后有一个原因的描述注释。

### Comment

- [`comment-empty-line-before`](http://stylelint.cn/user-guide/rules/comment-empty-line-before/): Require or disallow an empty line before comments.
- [`comment-empty-line-before`](http://stylelint.cn/user-guide/rules/comment-empty-line-before/)：要求或禁止在注释之前有空行。
- [`comment-no-empty`](http://stylelint.cn/user-guide/rules/comment-no-empty/): Disallow empty comments.
- [`comment-no-empty`](http://stylelint.cn/user-guide/rules/comment-no-empty/)：禁止空注释。
- [`comment-whitespace-inside`](http://stylelint.cn/user-guide/rules/comment-whitespace-inside/): Require or disallow whitespace on the inside of comment markers.
- [`comment-whitespace-inside`](http://stylelint.cn/user-guide/rules/comment-whitespace-inside/)：要求或禁止在注释标签内有空白。
- [`comment-word-blacklist`](http://stylelint.cn/user-guide/rules/comment-word-blacklist/): Specify a blacklist of disallowed words within comments.
- [`comment-word-blacklist`](http://stylelint.cn/user-guide/rules/comment-word-blacklist/)：指定一个不允许出现在注释中的单词的黑名单。

### General / Sheet

- [`indentation`](http://stylelint.cn/user-guide/rules/indentation/): Specify indentation .
- [`indentation`](http://stylelint.cn/user-guide/rules/indentation/)：指定缩进 。
- [`max-empty-lines`](http://stylelint.cn/user-guide/rules/max-empty-lines/): Limit the number of adjacent empty lines.
- [`max-empty-lines`](http://stylelint.cn/user-guide/rules/max-empty-lines/)：限制相邻空行的数量。
- [`max-line-length`](http://stylelint.cn/user-guide/rules/max-line-length/): Limit the length of a line.
- [`max-line-length`](http://stylelint.cn/user-guide/rules/max-line-length/)：限制单行的长度。
- [`max-nesting-depth`](http://stylelint.cn/user-guide/rules/max-nesting-depth/): Limit the depth of nesting.
- [`max-nesting-depth`](http://stylelint.cn/user-guide/rules/max-nesting-depth/)：限制允许嵌套的深度。
- [`no-browser-hacks`](http://stylelint.cn/user-guide/rules/no-browser-hacks/): Disallow browser hacks that are irrelevant to the browsers you are targeting.
- [`no-browser-hacks`](http://stylelint.cn/user-guide/rules/no-browser-hacks/)：禁用与你使用的浏览器无关的 browser hacks。
- [`no-descending-specificity`](http://stylelint.cn/user-guide/rules/no-descending-specificity/): Disallow selectors of lower specificity from coming after overriding selectors of higher specificity.
- [`no-descending-specificity`](http://stylelint.cn/user-guide/rules/no-descending-specificity/)：禁止低优先级的选择器出现在高优先级的选择器之后。
- [`no-duplicate-selectors`](http://stylelint.cn/user-guide/rules/no-duplicate-selectors/): Disallow duplicate selectors.
- [`no-duplicate-selectors`](http://stylelint.cn/user-guide/rules/no-duplicate-selectors/)：在一个样式表中禁止出现重复的选择器。
- [`no-empty-source`](http://stylelint.cn/user-guide/rules/no-empty-source/): Disallow empty sources.
- [`no-empty-source`](http://stylelint.cn/user-guide/rules/no-empty-source/)：禁止空源。
- [`no-eol-whitespace`](http://stylelint.cn/user-guide/rules/no-eol-whitespace/): Disallow end-of-line whitespace.
- [`no-eol-whitespace`](http://stylelint.cn/user-guide/rules/no-eol-whitespace/)：禁止行尾空白。
- [`no-extra-semicolons`](http://stylelint.cn/user-guide/rules/no-extra-semicolons/): Disallow extra semicolons.
- [`no-extra-semicolons`](http://stylelint.cn/user-guide/rules/no-extra-semicolons/)：禁止多余的分号。
- [`no-indistinguishable-colors`](http://stylelint.cn/user-guide/rules/no-indistinguishable-colors/): Disallow colors that are suspiciously close to being identical.
- [`no-indistinguishable-colors`](http://stylelint.cn/user-guide/rules/no-indistinguishable-colors/)：禁用相似的颜色。
- [`no-invalid-double-slash-comments`](http://stylelint.cn/user-guide/rules/no-invalid-double-slash-comments/): Disallow double-slash comments (`//...`) which are not supported by CSS.
- [`no-invalid-double-slash-comments`](http://stylelint.cn/user-guide/rules/no-invalid-double-slash-comments/)：禁用 CSS 不支持的双斜线注释 (`//...`)。
- [`no-missing-end-of-source-newline`](http://stylelint.cn/user-guide/rules/no-missing-end-of-source-newline/): Disallow missing end-of-source newlines.
- [`no-missing-end-of-source-newline`](http://stylelint.cn/user-guide/rules/no-missing-end-of-source-newline/)：禁止缺少文件末尾的换行符。
- [`no-unknown-animations`](http://stylelint.cn/user-guide/rules/no-unknown-animations/): Disallow animation names that do not correspond to a `@keyframes` declaration.
- [`no-unknown-animations`](http://stylelint.cn/user-guide/rules/no-unknown-animations/)：禁止动画名称与 `@keyframes` 声明不符。
- [`no-unsupported-browser-features`](http://stylelint.cn/user-guide/rules/no-unsupported-browser-features/): Disallow features that are unsupported by the browsers that you are targeting.
- [`no-unsupported-browser-features`](http://stylelint.cn/user-guide/rules/no-unsupported-browser-features/)：禁止使用浏览器不支持的特性。

### 主要配置

```js
{
  "rules": {
    "at-rule-blacklist": string|[],
    "at-rule-empty-line-before": "always"|"never",
    "at-rule-name-case": "lower"|"upper",
    "at-rule-name-newline-after": "always"|"always-multi-line",
    "at-rule-name-space-after": "always"|"always-single-line",
    "at-rule-no-unknown": true,
    "at-rule-no-vendor-prefix": true,
    "at-rule-semicolon-newline-after": "always",
    "at-rule-semicolon-space-before": "always"|"never",
    "at-rule-whitelist": string|[],
    "block-closing-brace-empty-line-before": "always-multi-line"|"never",
    "block-closing-brace-newline-after": "always"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line",
    "block-closing-brace-newline-before": "always"|"always-multi-line"|"never-multi-line",
    "block-closing-brace-space-after": "always"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line",
    "block-closing-brace-space-before": "always"|"never"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line",
    "block-no-empty": true,
    "block-opening-brace-newline-after": "always"|"always-multi-line"|"never-multi-line",
    "block-opening-brace-newline-before": "always"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line",
    "block-opening-brace-space-after": "always"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line",
    "block-opening-brace-space-before": "always"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line",
    "color-hex-case": "lower"|"upper",
    "color-hex-length": "short"|"long",
    "color-named": "always-where-possible"|"never",
    "color-no-hex": true,
    "color-no-invalid-hex": true,
    "comment-empty-line-before": "always"|"never",
    "comment-no-empty": true,
    "comment-whitespace-inside": "always"|"never",
    "comment-word-blacklist": string|[],
    "custom-media-pattern": string,
    "custom-property-empty-line-before": "always"|"never",
    "custom-property-pattern": string,
    "declaration-bang-space-after": "always"|"never",
    "declaration-bang-space-before": "always"|"never",
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-redundant-longhand-properties": true,
    "declaration-block-no-shorthand-property-overrides": true,
    "declaration-block-semicolon-newline-after": "always"|"always-multi-line"|"never-multi-line",
    "declaration-block-semicolon-newline-before": "always"|"always-multi-line"|"never-multi-line",
    "declaration-block-semicolon-space-after": "always"|"never"|"always-single-line"|"never-single-line",
    "declaration-block-semicolon-space-before": "always"|"never"|"always-single-line"|"never-single-line",
    "declaration-block-single-line-max-declarations": int,
    "declaration-block-trailing-semicolon": "always"|"never",
    "declaration-colon-newline-after": "always"|"always-multi-line",
    "declaration-colon-space-after": "always"|"never"|"always-single-line",
    "declaration-colon-space-before": "always"|"never",
    "declaration-empty-line-before": "always"|"never",
    "declaration-no-important": true,
    "declaration-property-unit-blacklist": {},
    "declaration-property-unit-whitelist": {},
    "declaration-property-value-blacklist": {},
    "declaration-property-value-whitelist": {},
    "font-family-name-quotes": "always-where-required"|"always-where-recommended"|"always-unless-keyword",
    "font-family-no-duplicate-names": true,
    "font-family-no-missing-generic-family-keyword": true,
    "font-weight-notation": "numeric"|"named",
    "function-blacklist": string|[],
    "function-calc-no-unspaced-operator": true,
    "function-comma-newline-after": "always"|"always-multi-line"|"never-multi-line",
    "function-comma-newline-before": "always"|"always-multi-line"|"never-multi-line",
    "function-comma-space-after": "always"|"never"|"always-single-line"|"never-single-line",
    "function-comma-space-before": "always"|"never"|"always-single-line"|"never-single-line",
    "function-linear-gradient-no-nonstandard-direction": true,
    "function-max-empty-lines": int,
    "function-name-case": "lower"|"upper",
    "function-parentheses-newline-inside": "always"|"always-multi-line"|"never-multi-line",
    "function-parentheses-space-inside": "always"|"never"|"always-single-line"|"never-single-line",
    "function-url-no-scheme-relative": true,
    "function-url-quotes": "always"|"never",
    "function-url-scheme-blacklist": string|[],
    "function-url-scheme-whitelist": string|[],
    "function-whitelist": string|[],
    "function-whitespace-after": "always"|"never",
    "indentation": int|"tab",
    "keyframe-declaration-no-important": true,
    "keyframes-name-pattern": string,
    "length-zero-no-unit": true,
    "linebreaks": "unix"|"windows",
    "max-empty-lines": int,
    "max-line-length": int,
    "max-nesting-depth": int,
    "media-feature-colon-space-after": "always"|"never",
    "media-feature-colon-space-before": "always"|"never",
    "media-feature-name-blacklist": string|[],
    "media-feature-name-case": "lower"|"upper",
    "media-feature-name-no-unknown": true,
    "media-feature-name-no-vendor-prefix": true,
    "media-feature-name-value-whitelist": {},
    "media-feature-name-whitelist": string|[],
    "media-feature-parentheses-space-inside": "always"|"never",
    "media-feature-range-operator-space-after": "always"|"never",
    "media-feature-range-operator-space-before": "always"|"never",
    "media-query-list-comma-newline-after": "always"|"always-multi-line"|"never-multi-line",
    "media-query-list-comma-newline-before": "always"|"always-multi-line"|"never-multi-line",
    "media-query-list-comma-space-after": "always"|"never"|"always-single-line"|"never-single-line",
    "media-query-list-comma-space-before": "always"|"never"|"always-single-line"|"never-single-line",
    "no-descending-specificity": true,
    "no-duplicate-at-import-rules": true,
    "no-duplicate-selectors": true,
    "no-empty-source": true,
    "no-empty-first-line": true,
    "no-eol-whitespace": true,
    "no-extra-semicolons": true,
    "no-invalid-double-slash-comments": true,
    "no-missing-end-of-source-newline": true,
    "no-unknown-animations": true,
    "number-leading-zero": "always"|"never",
    "number-max-precision": int,
    "number-no-trailing-zeros": true,
    "property-blacklist": string|[],
    "property-case": "lower"|"upper",
    "property-no-unknown": true,
    "property-no-vendor-prefix": true,
    "property-whitelist": string|[],
    "rule-empty-line-before": "always"|"never"|"always-multi-line"|"never-multi-line",
    "selector-attribute-brackets-space-inside": "always"|"never",
    "selector-attribute-operator-blacklist": string|[],
    "selector-attribute-operator-space-after": "always"|"never",
    "selector-attribute-operator-space-before": "always"|"never",
    "selector-attribute-operator-whitelist": string|[],
    "selector-attribute-quotes": "always"|"never",
    "selector-class-pattern": string,
    "selector-combinator-blacklist": string|[],
    "selector-combinator-space-after": "always"|"never",
    "selector-combinator-space-before": "always"|"never",
    "selector-combinator-whitelist": string|[],
    "selector-descendant-combinator-no-non-space": true,
    "selector-id-pattern": string,
    "selector-list-comma-newline-after": "always"|"always-multi-line"|"never-multi-line",
    "selector-list-comma-newline-before": "always"|"always-multi-line"|"never-multi-line",
    "selector-list-comma-space-after": "always"|"never"|"always-single-line"|"never-single-line",
    "selector-list-comma-space-before": "always"|"never"|"always-single-line"|"never-single-line",
    "selector-max-attribute": int,
    "selector-max-class": int,
    "selector-max-combinators": int,
    "selector-max-compound-selectors": int,
    "selector-max-empty-lines": int,
    "selector-max-id": int,
    "selector-max-pseudo-class": int,
    "selector-max-specificity": string,
    "selector-max-type": int,
    "selector-max-universal": int,
    "selector-nested-pattern": string,
    "selector-no-qualifying-type": true,
    "selector-no-vendor-prefix": true,
    "selector-pseudo-class-blacklist": string|[],
    "selector-pseudo-class-case": "lower"|"upper",
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-class-parentheses-space-inside": "always"|"never",
    "selector-pseudo-class-whitelist": string|[],
    "selector-pseudo-element-blacklist": string|[],
    "selector-pseudo-element-case": "lower"|"upper",
    "selector-pseudo-element-colon-notation": "single"|"double",
    "selector-pseudo-element-no-unknown": true,
    "selector-pseudo-element-whitelist": string|[],
    "selector-type-case": "lower"|"upper",
    "selector-type-no-unknown": true,
    "shorthand-property-no-redundant-values": true,
    "string-no-newline": true,
    "string-quotes": "single"|"double",
    "time-min-milliseconds": int,
    "unit-blacklist": string|[],
    "unit-case": "lower"|"upper",
    "unit-no-unknown": true,
    "unit-whitelist": string|[],
    "value-keyword-case": "lower"|"upper",
    "value-list-comma-newline-after": "always"|"always-multi-line"|"never-multi-line",
    "value-list-comma-newline-before": "always"|"always-multi-line"|"never-multi-line",
    "value-list-comma-space-after": "always"|"never"|"always-single-line"|"never-single-line",
    "value-list-comma-space-before": "always"|"never"|"always-single-line"|"never-single-line",
    "value-list-max-empty-lines": int,
    "value-no-vendor-prefix": true
  }
}
```



## 参考资料

- [基础文档中文](https://stylelint.docschina.org/)/[基础文档英文](https://stylelint.io/)
- [Stylelint 中文开发手册 - 开发者手册 - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/doc/1267)
- [如何为你的 Vue 项目添加配置 Stylelint](https://juejin.im/post/5c31c9a16fb9a049f8197000)
- [如何在Vue+Webpack下配置Stylelint](https://www.jianshu.com/p/8a33aa5e34b5)
  

