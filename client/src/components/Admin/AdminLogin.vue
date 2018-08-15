<template>
        <v-container align-center justify-center>
            <v-layout row wrap align-center justify-center>
                <v-flex xs12 sm6>
                    <v-card class="elevation-8">
                        <!-- ERROR MESSAGE -->
                        <v-layout row v-if="error">
                            <v-flex xs12 sm6 offset-sm3>
                                <p style="color:red">{{error}}</p>
                            </v-flex>
                        </v-layout>
                        <!-- Login/Signin -->
                        <v-layout row align-center justify-center class="py-5">
                            <v-form>
                                <!-- <v-layout row> -->
                                <v-flex xs12>
                                    <h1 class="text-xs-center mb-5">Admin Login</h1>
                                    <v-text-field name="username" label="Username" v-model="username" type="text" required></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                 <v-select
                                    v-bind:items="levels"
                                    v-model="level"
                                    label="Select Level"
                                    single-line
                                    bottom
                                    required
                                    ></v-select>
                                    </v-flex>
                                <v-flex xs12 class="py-3">
                                    <div class="text-xs-center">
                                        <v-btn outline type="button" :disabled="loading" :loading="loading" @click="login">
                                            Sign in
                                            <v-icon right>lock_open</v-icon>
                                            <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                        </v-btn>
                                    </div>
                                </v-flex>
                            </v-form>
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
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      username: '',
      password: '',
      level: 1,
      error: null,
      errorAlert: false,
      loading: false,
      levels: [
        { text: 'Level 1', value: 1 },
        { text: 'Level 2', value: 2 },
        { text: 'Level 3', value: 3 },
        { text: 'Level 4', value: 4 },
        { text: 'Level 5', value: 5 },
        { text: 'Level 6', value: 6 },
        { text: 'Level 7', value: 7 }
      ]
    }
  },
  methods: {
    reset () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setAdmin', null)
    },
    async login () {
      this.error = null
      try {
        this.loading = true
        const response = await AuthenticationService.adminLogin({
          username: this.username,
          password: this.password,
          level: this.level
        })

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setAdmin', response.data.user)
        this.loading = false
        this.$router.push({
          name: 'dashboard'
        })
      } catch (error) {
        this.loading = false
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