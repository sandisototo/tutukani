<template>
  <v-layout column >
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-text-field
          label="Cellphone Number"
          v-model="username"
        ></v-text-field>
        <br>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
        ></v-text-field>
        <br>
        <div class="danger-alert" v-html="error" />
        <v-snackbar
          class="error-alert"
          :timeout="60000"
          top="top"
          color="error"
          :vertical=true
          v-model="errorAlert"
    >
      {{error}}
       <v-btn dark flat @click.native="errorAlert = false">Close</v-btn>
         </v-snackbar>
        <br>
        <v-btn
          dark
          class="light-green darken-1"
          @click="login">
          Login
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: null,
      errorAlert: false
    }
  },
  methods: {
    reset () {
      this.$store.state.isUserLoggedIn = false
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setAdmin', null)
    },
    async login () {
      this.error = null
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'my-account'
        })
      } catch (error) {
        this.error = error.response.data.error
        this.errorAlert = true
      }
    }
  },
  async mounted () {
    this.reset()
  }
}
</script>

<style scoped>
</style>
