<template>
  <div id="app">
    <v-app>
      <page-header v-if="!$store.state.isAdmin"/>
      <main>
        <v-container fluid v-bind:class="{ dash: $store.state.isAdmin }">
          <router-view></router-view>
        </v-container>
      </main>
       <page-footer v-if="!$store.state.isAdmin"/>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/includes/Header.vue'
import PageFooter from '@/components/includes/Footer.vue'

export default {
  name: 'app',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.danger-alert {
  color: red;
}

.dash {
  margin: 2% auto;
}
</style>
