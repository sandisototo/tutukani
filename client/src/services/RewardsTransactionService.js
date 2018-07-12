import Api from '@/services/Api'

export default {
  index () {
    return Api().get(`rewards`)
  },
  post (reward) {
    return Api().post('rewards', reward)
  },
  put (reward) {
    return Api().put(`rewards/${reward.id}`, reward)
  },
  delete (rewardId) {
    return Api().delete(`rewards/${rewardId}`)
  }
}
