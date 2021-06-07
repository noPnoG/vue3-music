import axios from 'axios'

const ERR_OK = 0
const baseUrl = '/'

axios.defaults.baseUrl = baseUrl
export function get (url, parmas) {
  return axios.get(url, parmas).then((res) => {
    const serviceData = res.data
    if (serviceData.code === ERR_OK) {
      return serviceData.result
    }
  }).catch((err) => {
    console.log(err)
  })
}
