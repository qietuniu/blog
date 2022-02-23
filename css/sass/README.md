# SASS

优点：

- 自动缓存编译后模板

## 变量

- $是声明变量的关键词，变量值也可以引用其他变量
- sass中变量也有自己的作用域
- 最后一处声明有效的变量会覆盖前边的值
- !default：如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。
- !global：标志来定义，在这种情况下，它们也可以在全局使用

```css
$nav-color: #F90;
$highlight-border: 1px solid $nav-color;
nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
  border: $highlight-border;
}
```

## 注释

- // 这种单行注释内容不会出现在生成的css文件中；
- /*  */这种静默注释内容会出现在生成的css文件中
- 将`!`作为多行注释的第一个字符表示在压缩输出模式下保留这条注释并输出到 CSS 文件中，通常用于添加版权信息。
- 多行注释的可插值

```
$version: "1.2.3";
/* This CSS is generated by My Snazzy Framework version #{$version}. */

/* This CSS is generated by My Snazzy Framework version 1.2.3. */
```





## 嵌套CSS

#### &父选择器

```
/* 基础实例 */
#content aside {
  body.ie & { color: green }
}
body.ie #content aside { color: green }

/* 群组选择器 */
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
nav, aside {
  a {color: blue}
}

/* 子代同层选择器 */
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}

```

嵌套属性, 缩写属性指明例外规则

```
nav {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}

nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
```

#### %占位符选择器

$demo1 与 $demo2没有被编译，只有被 @extend 调用才会产生相关规则代码！

```css
%demo1 {
    border-radius:50%;
}

%demo2 {
    background:red;
}

/* 调用 */
a{
    @extend %demo1;
}

/* 编译为CSS */
a { border-radius: 50%; }

```



## 导入SASS

`sass`的`@import`规则在生成`css`文件时就把相关文件导入进来。这意味着所有相关的样式被归纳到了同一个`css`文件中，而无需发起额外的下载请求。

- 局部引入：`sass`局部文件的文件名以下划线开头。这样，`sass`就不会在编译时单独编译这个文件输出`css`，而只把这个文件用作导入。当你`@import`一个局部文件时，还可以不写文件的全名，即省略文件名开头的下划线
- 嵌套导入：被导入的局部文件中定义的所有变量和混合器，也会在这个规则范围内生效。`.blue-theme {@import "blue-theme"}`



#### 额外下载

- 被导入文件的名字以`.css`结尾；
- 被导入文件的名字是一个URL地址（比如http://www.sass.hk/css/css.css），由此可用谷歌字体API提供的相应服务；
- 被导入文件的名字是`CSS`的url()值。



## 混合器@mixin

减少重复代码；命名语义化；可像函数一样传参设置默认数值

```
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}

@mixin link-colors(
    $normal,
    $hover: $normal,
    $visited: $normal
  )
{
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}

a {
  @include link-colors(blue, red, green);
}

//Sass最终生成的是：

a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```



## 样式继承@extend

- 和混入的使用场景，A和B中，集中性有很多属性使用混入，分散有多个样式有属性不同使用继承。

- 可继承html元素的样式
- 跟混合器相比，继承生成的`css`代码相对更少。因为继承仅仅是重复选择器，而不会重复属性，所以使用继承往往比混合器生成的`css`体积更小。如果你非常关心你站点的速度，请牢记这一点。
- 继承遵从`css`层叠的规则。当两个不同的`css`规则应用到同一个`html`元素上时，并且这两个不同的`css`规则对同一属性的修饰存在不同的值，`css`层叠规则会决定应用哪个样式。相当直观：通常权重更高的选择器胜出，如果权重相同，定义在后边的规则胜出
- 不要在`css`规则中使用后代选择器（比如`.foo .bar`）去继承`css`规则

```
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}

// 像一个灰掉的超链接
.disabled {
  color: gray;
  @extend a;
}
```



## SassScript

支持的数据类型有：

- 数字（例如`1.2`，`13`，`10px`）
- 文本字符串，使用和不使用引号（例如`"foo"`，`'bar'`，`baz`）
- 颜色（例如`blue`，`#04a3f9`，`rgba(255, 0, 0, 0.5)`）
- 布尔值（例如`true`，`false`）
- 空值（例如`null`）
- 值列表，由空格或逗号隔开（例如`1.5em 1em 0 2em`，`Helvetica, Arial, sans-serif`）
- 从一个值映射到另一个值（例如`(key1: value1, key2: value2)`）
- 函数引用

https://www.kancloud.cn/surahe/front-end-notebook/1007828