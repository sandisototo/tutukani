<template>
    <v-tabs id="mobile-tabs-5" fixed dark centered>
        <v-toolbar class="light-green darken-1" dark>
            <v-toolbar-title>Rewards <v-icon>card_giftcard</v-icon></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tabs-bar class="light-green darken-1" slot="extension">
                <v-tabs-slider class="yellow"></v-tabs-slider>
                <v-tabs-item href="#tab-1">
                    <v-icon>hourglass_empty</v-icon>
                    Active
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
                    :items="rewards">
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-right">
                        {{props.item.User.name}} {{props.item.User.surname}}
                      </td>
                      <td class="text-xs-right">
                        R{{props.item.amount}}
                      </td>
                      <td class="text-xs-right">
                        {{props.item.User.cell_number}}
                      </td>
                      <td class="text-xs-right">
                        <!--{{props.item.payment_status}}-->
                        <p v-if="props.item.payment_status === 0">Rigistered</p>
                        <p v-if="props.item.payment_status === 1">Promised to pay</p>
                        <p v-if="props.item.payment_status === 2">Completed</p>
                        <p v-if="props.item.payment_status === 3">Expired</p>
                      </td>
                      <td class="text-xs-right">
                              <v-btn
                              small
                              color="secondary"
                              :loading="loading"
                              @click.native="gotIt(props.item)"
                              :disabled="props.item.payment_status === 0 
                              || props.item.payment_status === 2 
                              || props.item.payment_status === 3"
                            >
                              <i v-if="props.item.payment_status === 0">Waiting...</i>
                              <i v-if="props.item.payment_status === 1 || props.item.payment_status === 2">Got it :)</i>
                              <i v-if="props.item.payment_status === 3">Expired</i>

                            </v-btn>
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
import { mapState } from 'vuex'
import RewardsTransactionService from '@/services/RewardsTransactionService'
import DonationTransactionService from '@/services/DonationTransactionService'

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
      loading: false,
      rewards: []
    }
  },
  methods: {
    async gotIt (reward) {
      try {
        this.loading = true
        reward.payment_status = 2
        await DonationTransactionService.put(reward)
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['isUserLoggedIn', 'user'])
  },
  watch: {
    rewards: {
      handler: function (newVal, oldVal) {
        console.log('newVal--?', newVal)
        let isLevelComplete = newVal.filter((a) => a.payment_status === 2).length >= 2 // this 2 varies on levels - needs change
        console.log('isLevelComplete--?', isLevelComplete)
        if (isLevelComplete) {
          // show next level button
        }
      },
      deep: true
    }
  },
  async mounted () {
    this.rewards = (await RewardsTransactionService.index()).data
  }
}
</script>
