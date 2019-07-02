<template>
  <v-layout column>
    <v-flex >
      <donations-panel/>
    </v-flex>

    <v-flex class="mt-2">
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
