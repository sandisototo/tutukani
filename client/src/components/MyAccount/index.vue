<template>
  <v-layout>
    <v-flex xs6>
      <donations-panel/>
    </v-flex>

    <v-flex xs6 class="ml-2">
      <rewards-panel />
    </v-flex>
  </v-layout>
</template>

<script>
import DonationsPanel from './DonationsPanel'
import RewardsPanel from './RewardsPanel'
import {mapState} from 'vuex'

export default {
  components: {
    DonationsPanel,
    RewardsPanel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {}
  },
  async mounted () {
    if (!this.isUserLoggedIn) {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style scoped>
</style>
