import {
  ref,
  onMounted,
  onUnmounted
} from 'vue'
import {
  effect
} from '@vue/reactivity';
export default function useMouse() {
  let x = ref(0)
  let y = ref(0)
  effect(() => {
    console.log('x', x)
  })

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    document.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    document.removeEventListener('mousemove', update)
  })
  return {
    x,
    y
  }
}