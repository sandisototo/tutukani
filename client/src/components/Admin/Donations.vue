
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
        // usersObj[1].eligible = 1
        this.users = usersObj
        console.log('this.users-->', this.users)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    eligibleToggle (selectedRow) {
      const eligibility = selectedRow.eligible ? parseInt(1) : parseInt(0)
      console.log('seligibility-->', eligibility)
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
      items: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          value: false
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          value: false
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          value: false
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          value: false
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          value: false
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          value: false
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          value: false
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          value: false
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          value: false
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          value: false
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
  props: {
    source: String
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
                