
<template>
  <div>
    <admin-header v-if="$store.state.isAdmin" />
</div>
</template>
<script>
import AdminHeader from '@/components/includes/AdminHeader.vue'
import Donations from './Donations'
export default {
  components: {
    AdminHeader,
    Donations
  },
  props: {
    source: String
  },
  async mounted () {
    this.$store.state.isUserLoggedIn = false
    this.$store.dispatch('setToken', null)
    this.$store.dispatch('setUser', null)
    this.$store.dispatch('setAdmin', {
      name: 'Sand',
      surname: 'Toto',
      level: 1
    })
  }
}
</script>
                