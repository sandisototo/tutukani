
<template>
    <v-layout  class="mr-2" column>
        <h2 class="display-1 mb-3">Donations</h2>
              <v-card-title>
        <p>Select level:  </p>
                    <v-flex xs6 class="ml-2">
              <v-select
                v-bind:items="levels"
                v-bind:label=level.text
                single-line
                bottom
                @input="fetchLevel"
              ></v-select>
            </v-flex>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
            <v-data-table
            justify-center align-center
      v-bind:headers="headers"
      v-bind:items="users"
      v-bind:search="search"
      v-model="selected"
      item-key="name"
      
      class="elevation-1"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props" v-bind:class="{ active: props.item.eligible }">
        <td>{{ props.item.name }} {{ props.item.surname }}</td>
        <td class="text-xs-right">{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.cell_number }}</td>
        <td class="text-xs-right">{{ props.item.level }}</td>
        <td>
          <!-- <v-checkbox
            :disabled="!props.item.hasPaidBefore"
            primary
            hide-details
            v-model="props.item.eligible"
            @change="eligibleToggle(props.item)"
          ></v-checkbox> -->
          <v-checkbox
            primary
            hide-details
            v-model="props.item.eligible"
            @change="eligibleToggle(props.item)"
          ></v-checkbox>
        </td>
      </template>
    </v-data-table>
    </v-layout>
</template>
<script>
import UsersService from '@/services/UsersService'
export default {
  methods: {
    async fetchLevel (fetchLevel) {
      try {
        const response = await UsersService.index(fetchLevel)
        const usersObj = response.data || response.data.length ? response.data : []
        this.users = usersObj
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async eligibleToggle (selectedRow) {
      selectedRow.eligible = selectedRow.eligible ? parseInt(1) : parseInt(0)
      try {
        await UsersService.put(selectedRow)
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      users: [],
      error: null,
      search: '',
      selected: [],
      headers: [
        {
          text: 'Name & Surname',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'User No.', value: 'id' },
        { text: 'Cellphone No.', value: 'cell_phone' },
        { text: 'Level', value: 'level' },
        {
          text: 'Eligible?',
          align: 'centre',
          sortable: true,
          value: 'eligible'
        }
      ],
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
  async mounted () {
    this.$store.state.isUserLoggedIn = false
    this.$store.dispatch('setToken', null)
    this.$store.dispatch('setUser', null)
    this.$store.dispatch('setAdmin', {
      name: 'Sand',
      surname: 'Toto',
      level: 1
    })

    this.fetchLevel(1)
  }
}
</script>
                