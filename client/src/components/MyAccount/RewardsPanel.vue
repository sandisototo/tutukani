<template>
  <panel title="Your rewards">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="bookmarks">
      <template slot="items" scope="props">
        <td class="text-xs-right">
          {{props.item.title}}
        </td>
        <td class="text-xs-right">
          {{props.item.artist}}
        </td>
      </template>
    </v-data-table>
  </panel>
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
