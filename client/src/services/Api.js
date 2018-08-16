import axios from 'axios'
import store from '@/store/store'

export default () => {
  // console.log('store.state.token-->', store.state)
  return axios.create({
    baseURL: `https://node.tutukani.co.za/`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
