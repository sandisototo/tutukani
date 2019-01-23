<template>
    <v-layout  class="mr-2" column>
        <h2 class="display-1 mb-3">Active Transactions</h2>
          <v-card>
            <v-card-title>
              <v-layout column>
              <p>Transactions in progress</p>
                <v-flex xs6 class="ml-2">
                  <v-select
                    v-bind:items="levels"
                    v-bind:label=level.text
                    single-line
                    bottom
                    @input="getActiveTransactionsByLevel"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
          
            <v-data-table
                :headers="headers"
                :pagination.sync="pagination"
                :items="donations"
                v-bind:search="search">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-right highlight-blue">
                        {{props.item.User.name}} {{props.item.User.surname}}
                    </td>
                    <td class="text-xs-right highlight-blue">
                        {{props.item.User.cell_number}}
                    </td>
                    <td class="text-xs-center">
                        <small> >> </small>
                    </td>
                    <td class="text-xs-left highlight-light-blue">
                        {{props.item.Candidate.name}} {{props.item.Candidate.surname}}
                    </td>
                    <td class="text-xs-center highlight-light-blue">
                        {{props.item.Candidate.cell_number}}
                    </td>
                    <td class="text-xs-right">
                        R{{props.item.amount}}
                    </td>
                    <td class="text-xs-right">
                        {{props.item.level}}
                    </td>
                     <td class="text-xs-right">
                        {{props.item.createdAt | formatDate}}
                    </td>
                    <td class="text-xs-right">
                    <p v-if="props.item.payment_status === 0 && props.item.User.level === 1" >
                      <v-badge color="grey">
                        <v-icon slot="badge" dark>how_to_reg</v-icon>
                        <span>Rigistered</span>
                      </v-badge></p>
                      <p v-if="props.item.payment_status === 0 && props.item.User.level > 1">
                      <v-badge color="grey">
                        <v-icon slot="badge" dark>how_to_reg</v-icon>
                        <span>Upgraded to level {{props.item.User.level}} </span>
                      </v-badge></p>
                    <p v-if="props.item.payment_status === 1">                      
                      <v-badge color="orange">
                        <v-icon slot="badge" dark>schedule</v-icon>
                        <span>Promised to pay</span>
                      </v-badge></p>
                    <p v-if="props.item.payment_status === 2">   
                      <v-badge color="green">
                        <v-icon slot="badge" dark>check</v-icon>
                        <span>Completed</span>
                      </v-badge>
                    </p>
                    <p v-if="props.item.payment_status === 3">
                      <v-badge color="red">
                        <v-icon slot="badge" dark>error_outline</v-icon>
                        <span>Expired</span>
                      </v-badge>
                      </p>
                    </td>
                    <td class="text-xs-right">
                            <v-btn
                            small
                            color="secondary"
                            :loading="loading"
                            @click.native="confirmPayment(props.item)"
                            :disabled="props.item.payment_status === 0 
                            || props.item.payment_status === 2 
                            || props.item.payment_status === 3"
                        >
                            <i v-if="props.item.payment_status === 0">Waiting...</i>
                            <i v-if="props.item.payment_status === 1">Confirm</i>
                            <i v-if="props.item.payment_status === 2">Got it :)</i>
                            <i v-if="props.item.payment_status === 3">Expired</i>

                        </v-btn>
                    </td>
                </template>
            </v-data-table>
          </v-card>
    </v-layout>
</template>
<script>
import { mapState } from 'vuex'
import DonationTransactionService from '@/services/DonationTransactionService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Donor name',
          value: 'User.name'
        },
        {
          text: 'Donor cellphone number',
          value: 'User.cell_number'
        },
        {
          text: '',
          value: ''
        },
        {
          text: 'Donatated to: (Receiver)',
          value: 'Candidate.name'
        },
        {
          text: 'Receiver cellphone number:',
          value: 'Candidate.cell_number'
        },
        {
          text: 'Amount',
          value: 'amount'
        },
        {
          text: 'Level',
          value: 'level'
        },
        {
          text: 'Date&Time',
          value: 'createdAt'
        },
        {
          text: 'Status',
          value: 'payment_status'
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
      search: '',
      donations: [],
      level: { text: 'Level 1', value: 1 },
      selectedLevel: null,
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
    async confirmPayment (donation) {
      try {
        this.loading = true
        donation.payment_status = 2
        await DonationTransactionService.put(donation)
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    },
    async getActiveTransactionsByLevel (fetchLevel) {
      try {
        const response = (await DonationTransactionService.getActiveDonationsByLevel(fetchLevel)).data
        const donationsObj = response || response.length ? response : []
        console.log('donationsObj--->', donationsObj)
        this.donations = donationsObj
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  computed: {
    ...mapState(['isAdmin', 'admin'])
  },
  async mounted () {
    this.getActiveTransactionsByLevel(1)
  }
}
</script>
<style>
.highlight-blue {
  background: #e4f2ff
}
.highlight-light-blue {
  background:#f1f7ff
}
</style>

                