import {
  ref
} from 'vue'
export default function useAddCount() {
  let count = ref(0)

  function add() {
    count.value++
  }
  return {
    count,
    add
  }
}