<template>
  <div>
    <search-input v-model="query"  placeholder="搜索"></search-input>
    {{query}}
  </div>
</template>

<script>
import SearchInput from '@/components/search/search-input'
export default {
  components: {
    SearchInput
  },
  data () {
    return { query: '' }
  },
  methods: {
    onInput (value) {
      console.log('update:query', this.query)
    }
  }
}
</script>

<style>

</style>
