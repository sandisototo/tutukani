<template>
    <v-layout  class="mr-2" column>
        <h2 class="display-1 mb-3">Active Transactions</h2>
          <v-card>
    <v-card-title>
      <p>Transactions in progress</p>
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
                        {{props.item.User.Candidate.name}} {{props.item.User.Candidate.surname}}
                    </td>
                    <td class="text-xs-center highlight-light-blue">
                        {{props.item.User.Candidate.cell_number}}
                    </td>
                    <td class="text-xs-right">
                        R{{props.item.amount}}
                    </td>
                    <td class="text-xs-right">
                        {{props.item.level}}
                    </td>
                    <td class="text-xs-right">
                    <p v-if="props.item.payment_status === 0">
                      <v-badge color="grey">
                        <v-icon slot="badge" dark>how_to_reg</v-icon>
                        <span>Rigistered</span>
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
// import RewardsTransactionService from '@/services/RewardsTransactionService'
import DonationTransactionService from '@/services/DonationTransactionService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Donor name',
          value: '0'
        },
        {
          text: 'Donor cellphone number',
          value: '1'
        },
        {
          text: '',
          value: '2'
        },
        {
          text: 'Donatated to: (Receiver)',
          value: '2'
        },
        {
          text: 'Receiver cellphone number:',
          value: '3'
        },
        {
          text: 'Amount',
          value: '4'
        },
        {
          text: 'Level',
          value: '5'
        },
        {
          text: 'Status',
          value: '6'
        },
        {
          text: 'Action',
          value: '7'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      loading: false,
      search: '',
      donations: [
        {
          id: 1,
          amount: '60',
          level: 1,
          payment_status: 2,
          User: {
            name: 'User1',
            surname: 'One',
            cell_number: '0781212122',
            Candidate: {
              name: 'Candidate1',
              surname: 'One',
              cell_number: '111111111'
            }
          }
        },
        {
          id: 2,
          amount: '60',
          level: 1,
          payment_status: 1,
          User: {
            name: 'User2',
            surname: 'Two',
            cell_number: '000000000',
            Candidate: {
              name: 'Candidate2',
              surname: 'Two',
              cell_number: '555555555'
            }
          }
        },
        {
          id: 3,
          amount: '400',
          level: 2,
          payment_status: 3,
          User: {
            name: 'User15',
            surname: 'Fifteen',
            cell_number: '2020202020',
            Candidate: {
              name: 'Candidate2',
              surname: 'Two',
              cell_number: '555555555'
            }
          }
        }
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
    }
  },
  computed: {
    ...mapState(['isAdmin', 'admin'])
  },
  async mounted () {
    // call getActiveDonations
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

                