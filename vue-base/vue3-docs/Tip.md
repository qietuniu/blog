# Tip

Composition Api 的支持从`setup(){}`升级到`<script setup>`,在 `<script setup>` 声明的顶层绑定（变量、函数、import引入的内容），都会自动暴露给模板，在模板中直接使用，
setup函数的执行时机是beforecreate跟created之间

- 更简洁，不需要return{}暴露参数和方法
- ts支持更好，`<script setup lang="ts">`

## 编译器宏

- 不需导入
- 一同编译
- 顶层使用

常规和ts写法的区别主要在defineXX<>(),常规直接默认数据写入（），ts在<>中写入类型

### defineProps

传递过来的属性

常规写法：

```js
<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
</script>

```

TS写法：
TS 写法里 props 没有定义默认值，但是可以自定义类型，常规写法除了基础类型之外，写入其他类型会出现不属于类型而变成值的报错。

```ts
<script setup lang="ts">
interface ListItem {
  name: string
  age: number
}
const props = defineProps<{
  list: ListItem[]
}>()

 </script>
```

### defineEmits

触发上级组件方法，可传递相关参数

常规写法：

```js

<script setup>
const emits = defineEmits(['changeMsg'])
 
const handleChangeMsg = () => {
  emits('changeMsg', 'Hello TS')
}

</script>
```

TS写法：

```ts
<script setup lang="ts">

const emits = defineEmits<{
  (e: 'changeMsg', value: string): void
}>()


 </script>
```

### defineExpose

对外暴露属性，常用场景是父组件拿到子组件的属性和方法

```js
// 子组件
<script setup>
import { ref } from 'vue'
const msg = ref('Hello Vue3')
 
// 对外暴露的属性
defineExpose({
  msg
})
</script>


// 父组件
<script setup>
import { ref, onMounted } from 'vue'
 
const root = ref(null)
 
onMounted(() => {
  console.log(root.value.msg)
})
</script>
```

## 辅助函数

### useAttrs

Vue3 的 $attrs 还包含了 class 和 style 属性，在模板中用`$attrs`,`inheritAttrs: false`可以阻止属性继承

```js
// 父组件
<HelloWorld class="hello-word" title="我是标题" />


// 子组件
<script setup>
import { useAttrs } from 'vue'
 
const attrs = useAttrs()
// js中使用
console.log(attrs.class)  // hello-word
console.log(attrs.title)  // 我是标题
</script>

<template>
  <!-- 在模板中使用 $attrs 访问属性 -->
  <div>{{ $attrs.title }}</div>
</template>
```

### useSlots

获取插槽，
？？？会被重写吗？
？？？子组件中怎么使用？

```js
// 子组件

<script setup>
import { useSlots } from 'vue'
 
const slots = useSlots()
// 在js中访问插槽默认插槽default、具名插槽footer
console.log(slots.default)
console.log(slots.footer)
</script>
```

### useCssModule

从`script`中拿到`<style module>`,`<style module>` 代码块会被编译为 CSS Modules 并且将生成的 CSS 类作为 `$style` 对象的键暴露给组件，可以直接在模板中使用 `$style`

？？？样式类名hash

```js
<script setup lang="ts">
import { useCssModule } from 'vue'
 
// 不传递参数，获取<style module>代码块编译后的css类对象
const style = useCssModule()
console.log(style.success)  // 获取到的是success类名经过 hash 计算后的类名
    
// 传递参数content，获取<style module="content">代码块编译后的css类对象
const contentStyle = useCssModule('content')
</script>
 
<template>
  <div :class="$style.success">默认CssModule pink</div>
  <div :class="style.success">默认CssModule pink</div>
 
  <div :class="contentStyle.success">具名CssModule blue</div>
  <div :class="content.success">具名CssModule blue</div>
</template>
 
<!-- 无值的css module -->
<style module lang="less">
.success {
  color: pink;
}
</style>
 
<!-- 具名的css module -->
<style module="content" lang="less">
.success {
  color: blue;
}
</style>
```

## 其余操作

### 顶层await支持

`<script setup> 中可以使用顶层 await。结果代码会被编译成 async setup()`

### 状态驱动的动态css

Vue3 中 `<style>` 标签可以通过 `v-bind` 这一 CSS 函数将 CSS 的值关联到动态的组件状态上。​​​​​​​

```js
<script setup>
const theme = {
  color: 'red'
}
</script>
 
<template>
  <p>hello</p>
</template>
 
<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

### 监听多个数据

```js
watch([num, msg], function (newVal, oldVal) {
        console.log('num或msg值变化了', newVal, oldVal);
},{ immediate: true });
//num或msg值变化了 (2) [1, '你好'] (2) [0, '你好']
```

### 获取vue实例属性

常用于：？？？？

```js

// 获取vue实例属性
import { getCurrentInstance, ComponentInternalInstance } from 'vue'
// as ComponetInternalInstance表示类型断言，ts时使用。否则报错，proxy为null
const { proxy } = getCurrentInstance() as ComponetInternalInstance
proxy.$parent
proxy.$refs
proxy.$nextTick
proxy.$attrs
proxy.$data
proxy.$el
proxy.$emit
proxy.$forceUpdate
proxy.$options
proxy.$props    
proxy.$root
proxy.$slots
```

### 全局注册

```js
// main.ts
 
app.config.globalProperties.$message = ElMessage;
 
 
//使用
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
proxy.$message
```

### mitt 库($on、$off)

Vue3移除了$on $off等自带的自定义事件相关方法，因此在vue3中他推荐我们下载mitt库来使用事件总线传递数据，其实mitt的使用方式和vue原本的自定义事件使用方式相同，所以我们不必担心学习成本！

```js
// mitt库默认导出的是一个函数，我们需要执行它从而得到事件总线的对象
/* mitt.ts */
// 这里我们在ts中暴露这个事件总线对象
 
import type { Emitter } from "mitt";
import mitt from "mitt";
export const emitter: Emitter = mitt();
```

`$emit`

```js
// 这里我们导入我们单独写的暴露事件总线对象的ts
/* a.vue */  //模板代码
 
<button @click="setEmitter">send</button>  
 
// 导入事件总线
import emitter from "./utils/mitt.ts";  
 
const setEmitter = () => {
  // 触发自定义总线why，并传入一个对象
  emitter.emit("test",{name:'why',age:19})
};
```

`$on`

```js
/* b.vue */
 
// 导入事件总线
import emitter from "./utils/mitt.ts";
 
emitter.on("test", e => console.log("test", e));
 
 
 
// emitter.on的第一个参数如果是 * 代表监听所有的事件触发！
// 回调函数的参数就会有2个，1是事件的类型，2是实际实参
emitter.on("*",(eventType,item)=>{
  console.log(`* 监听到的事件类型是：${eventType},接收的参数为：`,item)
})
```

`$off`

```js
// 导入事件总线
import emitter from "./utils/mitt.ts";
 
emitter.off("test"); // 取消监听
 
 
 
// 取消所有的mitt事件
emitter.all.clear()
```

### 样式

vue3版本将vue2中的/deep/和>>>废除 写法改为:deep()

```js
#swiper >.swiperContext :deep(p) {
  width: 100vw;
  height:60vw;
  background: #000;
  border:5px solid;
}

```

### import.meta

获取图片等路径的时候

```js
getImageUrl(name) {
  const url = `../${name}`
  return new URL(url, import.meta.url).pathname
},
```
