import Api from '@/services/Api'

export default {
  index () {
    return Api().get(`donation`)
  },
  post (donation) {
    return Api().post('donation', donation)
  },
  put (donation) {
    return Api().put(`donation/${donation.id}`, donation)
  },
  delete (donationId) {
    return Api().delete(`donation/${donationId}`)
  }
}
