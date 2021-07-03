import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
BScroll.use(Slide)

export default function useMiniSlider () {
  const sliderWrapperRef = ref(null)
  const slider = ref(null)
  const store = useStore()
  const fullScreen = computed(() => {
    return store.state.fullScreen
  })
  const playList = computed(() => {
    return store.state.playList
  })
  const currentIndex = computed(() => {
    return store.state.currentIndex
  })
  const sliderShow = computed(() => {
    return !fullScreen.value && !!playList.value && playList.value.length
  })
  onMounted(() => {
    let sliderVal
    watch(sliderShow, async (newSliderShow) => {
      if (newSliderShow) {
        await nextTick()
        if (!sliderVal) {
          sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true
            }
          })

          sliderVal.on('slidePageChanged', ({ pageX }) => {
            store.commit('setCurrentIndex', pageX)
          })
        } else {
          sliderVal.refresh()
        }
        sliderVal.goToPage(currentIndex.value, 0, 0)
      }
    })
    watch(currentIndex, (newIndex) => {
      if (sliderVal && sliderShow) {
        sliderVal.goToPage(currentIndex.value, 0, 0)
      }
    })
  })

  onUnmounted(() => {
    if (slider.value) {
      slider.value.destroy()
    }
  })

  return { sliderWrapperRef, slider }
}
