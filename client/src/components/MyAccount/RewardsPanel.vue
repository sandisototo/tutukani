<template>
    <v-tabs id="mobile-tabs-5" fixed dark centered>
        <v-toolbar class="light-green darken-1" dark>
            <v-toolbar-title>Rewards</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tabs-bar class="light-green darken-1" slot="extension">
                <v-tabs-slider class="yellow"></v-tabs-slider>
                <v-tabs-item href="#tab-1">
                    <v-icon>hourglass_full</v-icon>
                    Waiting
                </v-tabs-item>
                <v-tabs-item href="#tab-2">
                    <v-icon>history</v-icon>
                    Previous
                </v-tabs-item>
                <v-tabs-item href="#tab-3">
                    <v-icon>error</v-icon>
                    Expired
                </v-tabs-item>
            </v-tabs-bar>
        </v-toolbar>
        <v-tabs-items>
            <v-tabs-content v-for="i in 3" :key="i" :id="'tab-' + i">
              <v-card-text v-if="i===1">
                  <v-data-table
                    :headers="headers"
                    :pagination.sync="pagination"
                    :items="bookmarks">
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-right">
                        {{props.item.name}}
                      </td>
                      <td class="text-xs-right">
                        {{props.item.amount}}
                      </td>
                      <td class="text-xs-right">
                        {{props.item.status}}
                      </td>
                      <td class="text-xs-right">
                        <v-button>Got it :)</v-button>
                      </td>
                    </template>
                  </v-data-table>
              </v-card-text>
              <v-card-text v-if="i===2">
                  <p>
                      <center>No previous rewards found</center>
                  </p>
              </v-card-text>
              <v-card-text v-if="i===3">
                  <p>
                      <center>No expired rewards found</center>
                  </p>
              </v-card-text>
            </v-tabs-content>
        </v-tabs-items>
    </v-tabs>
</template>

<script>
import {mapState} from 'vuex'
import RewardsTransactionService from '@/services/RewardsTransactionService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Name',
          value: ''
        },
        {
          text: 'Amount',
          value: ''
        },
        {
          text: 'Cell number',
          value: ''
        },
        {
          text: 'Status',
          value: ''
        },
        {
          text: 'Action',
          value: ''
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      bookmarks: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.rewards = (await RewardsTransactionService.index()).data
    }
  }
}
</script>

<style>

</style>
