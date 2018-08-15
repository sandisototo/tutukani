
<template>
  <div>
    <admin-header v-if="$store.state.isAdmin" />
</div>
</template>
<script>
import AdminHeader from '@/components/includes/AdminHeader.vue'

export default {
  components: {
    AdminHeader
  },
  data () {
    return {}
  },
  props: {
    source: String
  },
  methods: {
    reset () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
    }
  },
  async mounted () {
    this.reset()
    if (!this.$store.state.isAdmin) {
      this.$router.push({
        name: 'admin'
      })
    }
  }
}
</script>
                