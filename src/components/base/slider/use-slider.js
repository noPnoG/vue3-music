import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onMounted, onUnmounted, ref, onActivated, onDeactivated } from 'vue'
BScroll.use(Slide)
const slider = ref(null)
const currentPageIndex = ref(0)
export default function useSlider (rootRef) {
  onMounted(() => {
    const sliderVal = slider.value = new BScroll(rootRef.value, {
      scrollX: true,
      scrollY: false,
      slide: true,
      momentum: false,
      bounce: false,
      probeType: 2,
      click: true
    })
    sliderVal.on('slideWillChange', (page) => {
      currentPageIndex.value = page.pageX
    })
  })
  onUnmounted(() => {
    slider.value.destroy()
  })
  onActivated(() => {
    slider.value.enable()
    slider.value.refresh()
  })

  onDeactivated(() => {
    slider.value.disable()
  })
  return { currentPageIndex }
}
