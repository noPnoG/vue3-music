import MusicList from '@/components/music-list/music-list'
import storage from 'good-storage'
import { processSongs } from '@/service/song'
export default function createDetailComponent (name, key, fetch) {
  return {
    name,
    components: {
      MusicList
    },
    props: {
      data: {
        type: Object
      }
    },
    computed: {
      pic () {
        const data = this.computedData
        return data && data.pic
      },
      title () {
        const data = this.computedData
        return data && (data.name || data.title)
      },
      computedData () {
        let ret = null
        const data = this.data
        if (data) {
          ret = data
        } else {
          const cachedData = storage.session.get(key)
          if (cachedData && (cachedData.mid || cachedData.id + '') === this.$route.params.id) {
            ret = cachedData
          }
        }
        return ret
      }
    },
    data () {
      return {
        songs: [],
        loading: true
      }
    },
    async created () {
      if (!this.computedData) {
        const path = this.$route.matched[0].path
        this.$router.push({ path })
      }
      const res = await fetch(this.computedData)
      const songs = await processSongs(res.songs)
      this.songs = songs
      this.loading = false
    }
  }
}
