
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/slide'
import { ref, onMounted, onUnmounted, onActivated } from 'vue'
BScroll.use(ObserveDOM)
BScroll.use(Pullup)

export default function usePullUpLoad (requestData) {
  const rootRef = ref(null)
  const scroll = ref(null)
  const isPullUpLoad = ref(false)
  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(rootRef.value, {
      observeDOM: true,
      pullUpLoad: true,
      click: true
    })
    scrollVal.on('pullingUp', handlePullUp)
    console.log(scrollVal)
    async function handlePullUp () {
    //   if (preventPullUpLoad.value) {
    //     scrollVal.finishPullUp()
    //     return
    //   }
      isPullUpLoad.value = true
      await requestData()
      scrollVal.finishPullUp()
      scrollVal.refresh()
      isPullUpLoad.value = false
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  onActivated(() => {
    scroll.value.enable()
    scroll.value.refresh()
    console.log(scroll.value)
  })

  //   onDeactivated(() => {
  //     scroll.value.disable()
  //   })
  return {
    rootRef,
    isPullUpLoad,
    scroll
  }
}
