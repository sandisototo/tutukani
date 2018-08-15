<template>
    <v-layout  class="mr-2" column>
        <h2 class="display-1 mb-3">Active Transactions</h2>
            <v-data-table
                :headers="headers"
                :pagination.sync="pagination"
                :items="donations">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-right">
                        {{props.item.User.name}} {{props.item.User.surname}}
                    </td>
                    <td class="text-xs-right">
                        {{props.item.User.cell_number}}
                    </td>
                    <td class="text-xs-right">
                        {{props.item.User.Candidate.name}} {{props.item.User.Candidate.surname}}
                    </td>
                    <td class="text-xs-right">
                        {{props.item.User.Candidate.cell_number}}
                    </td>
                    <td class="text-xs-right">
                        R{{props.item.amount}}
                    </td>
                    <td class="text-xs-right">
                        {{props.item.User.Candidate.level}}
                    </td>
                    <td class="text-xs-right">
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
    </v-layout>
</template>
<script>
import { mapState } from 'vuex';
import RewardsTransactionService from '@/services/RewardsTransactionService';
import DonationTransactionService from '@/services/DonationTransactionService';

export default {
  data() {
    return {
      headers: [
        {
          text: 'Donor name',
          value: ''
        },
        {
          text: 'Donor cellphone number',
          value: ''
        },
        {
          text: 'Donatated to: (Receiver)',
          value: ''
        },
        {
          text: 'Receiver cellphone number:',
          value: ''
        },
        {
          text: 'Amount',
          value: ''
        },
        {
          text: 'Level',
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
      donations: [
        {
          id: 1,
          amount: '60',
          level: 1,
          complete_status: 2,
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
          complete_status: 2,
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
          complete_status: 2,
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
    };
  },
  methods: {},
  computed: {
    ...mapState(['isAdmin', 'admin'])
  },
  async mounted() {}
};
</script>
                