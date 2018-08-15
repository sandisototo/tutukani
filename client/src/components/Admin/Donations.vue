<template>
    <v-layout  class="mr-2" column>
        <h2 class="display-1 mb-3">Donations</h2>
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
                        {{props.item.Candidate.name}} {{props.item.User.surname}}
                    </td>
                    <td class="text-xs-right">
                        {{props.item.Candidate.cell_number}}
                    </td>
                    <td class="text-xs-right">
                        R{{props.item.amount}}
                    </td>
                    <td class="text-xs-right">
                        {{props.item.User.level}}
                    </td>
                    <td class="text-xs-right">
                    <p v-if="props.item.payment_status === 0">Rigistered</p>
                    <p v-if="props.item.payment_status === 1">Promised to pay</p>
                    <p v-if="props.item.payment_status === 2">Completed</p>
                    <p v-if="props.item.payment_status === 3">Expired</p>
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
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      loading: false,
      donations: []
    };
  },
  methods: {},
  computed: {
    ...mapState(['isAdmin', 'admin'])
  },
  async mounted() {}
};
</script>
                