import Api from '@/services/Api'

export default {
  index (level = null) {
    return Api().get(`users/${level}`)
  },
  getByNumber (level = null, number) {
    return Api().get(`users/${level}/${number}`)
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
