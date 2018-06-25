import Api from '@/services/Api'

export default {
  index (level = null) {
    return Api().get(`users/${level}`)
  },
  post (user) {
    return Api().post('users', user)
  },
  put (user) {
    return Api().put(`users/${user.id}`, user)
  },
  delete (userId) {
    return Api().delete(`users/${userId}`)
  }
}
