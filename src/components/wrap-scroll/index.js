import { watch, nextTick, h, withCtx, renderSlot, mergeProps, ref, computed } from 'vue'
import Scroll from '@/components/base/scroll/scroll'
import { useStore } from 'vuex'

export default {
  name: 'wrap-scroll',
  porps: Scroll.porps,
  emits: Scroll.emits,
  render (ctx) {
    return h(Scroll, mergeProps({
      ref: 'scrollRef'
    }, ctx.$props, {
      onScroll: (e) => {
        ctx.$emit('scroll', e)
      }
    }), {
      default: withCtx(() => {
        return [renderSlot(ctx.$slots, 'default')]
      })
    }
    )
  },
  setup () {
    const scrollRef = ref(null)
    const store = useStore()
    const scroll = computed(() => {
      return scrollRef.value.scroll
    })
    const playList = computed(() => store.state.playList)
    watch(playList, async () => {
      console.log('refresh')
      await nextTick()
      scroll.value.refresh()
    })
    return {
      scrollRef,
      scroll
    }
  }
}
