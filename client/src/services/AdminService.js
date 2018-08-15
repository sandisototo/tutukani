import Api from '@/services/Api'

export default {
  index () {
    return Api().get(`admin`)
  },
  post (admin) {
    return Api().post('admin', admin)
  },
  put (admin) {
    return Api().put(`admin/${admin.id}`, admin)
  },
  delete (adminId) {
    return Api().delete(`admin/${adminId}`)
  }
}
