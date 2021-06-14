import {
  reactive,
  computed
} from 'vue'
export default function useAddTodo() {
  let state = reactive({
    todos: [{
      name: '读书',
      done: false
    }, {
      name: '运动',
      done: false
    }],
    val: ''
  })
  let total = computed(() => state.todos.length)

  function addTodo() {
    state.todos.push({
      done: false,
      name: state.val
    })
  }
  return {
    state,
    addTodo,
    total
  }
}