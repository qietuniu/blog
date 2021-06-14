<template>
  <div>
    计数{{count}}
    <button @click="add">累加</button>
    <hr>
    <h3>total:{{total}}</h3>
    <input type="text" v-model="state.val" @keyup.enter="addTodo">
    <ul>
      <li v-for="item in state.todos" :key="item.name">{{item.name}}</li>
    </ul>
    <hr>
    坐标点：x（{{x}}）；y（{{y}}）
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import useAddCount from './statusFn/app/useAddCount'
import useAddTodo from './statusFn/app/useAddTodo'
import useMouse from './statusFn/app/useMouse'
export default {
  setup() {
    const { count, add } = useAddCount()
    const { state, addTodo, total } = useAddTodo()
    const { x, y } = useMouse()
    return { count, add, state, addTodo, total, x, y }
  }

}


</script>
