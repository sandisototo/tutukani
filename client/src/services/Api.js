import axios from 'axios'
import store from '@/store/store'

export default () => {
  console.log('store.state.token-->', store.state)
  return axios.create({
    baseURL: `http://localhost:8081/`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
