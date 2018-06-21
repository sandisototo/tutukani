<template>
  <v-toolbar fixed class="light-green darken-1" dark>
    <v-toolbar-title class="mr-4">
      <router-link 
        class="home"
        tag="span"
        :to="{
          name: 'my-account'
        }">
        Tutukani
      </router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn 
        flat 
        dark
        :to="{
          name: 'my-account'
        }">
        How it works
      </v-btn>
    </v-toolbar-items>
    <v-spacer/>
    <v-spacer>
      <p class="headline font-weight 400" v-if="$store.state.isUserLoggedIn">
        Welcome
        <v-avatar color="indigo">
      <v-icon dark>account_circle</v-icon>
    </v-avatar> <span style="font-size:15px;">{{$store.state.user.name}} {{$store.state.user.surname}},   you are on level <b>{{$store.state.user.level}}</b></span>
      </p>
    </v-spacer>

    <v-toolbar-items>
      <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        flat 
        dark
        :to="{
          name: 'login'
        }">
        Login
      </v-btn>
      
      <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        flat 
        dark
        :to="{
          name: 'register'
        }">
        Sign Up
      </v-btn>
      
      <v-btn 
        v-if="$store.state.isUserLoggedIn"
        flat 
        dark
        @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: #1B5E20;
}
</style>
