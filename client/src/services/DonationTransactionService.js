import Api from '@/services/Api'

export default {
  index (history) {
    return history ? Api().get(`donation/${history}`) : Api().get(`donation`)
  },
  getDonationCount (level, candidateId) {
    return Api().get(`donation/${level}/${candidateId}`)
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
