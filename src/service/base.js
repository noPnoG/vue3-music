import axios from 'axios'

const ERR_OK = 0
const baseUrl = '/'

axios.defaults.baseUrl = baseUrl
export function get (url, params) {
  return axios.get(url, {
    params
  }).then((res) => {
    const serviceData = res.data
    if (serviceData.code === ERR_OK) {
      return serviceData.result
    }
  }).catch((err) => {
    console.log(err)
  })
}
