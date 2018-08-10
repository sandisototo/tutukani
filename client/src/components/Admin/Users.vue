
<template>
    <v-layout  class="mr-2" column>
        <h2 class="display-1 mb-3">Users</h2>
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
        <td>
          <center>
          <v-btn color="error" fab small dark @click.native="editDialogue = true" style="margin-right: -9%">
            <v-icon>edit</v-icon>
          </v-btn>
          </center>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="editDialogue" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal last name" hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <!-- Work here-->
              </v-flex>
              <v-flex xs12 sm6>
                <!-- Work here-->
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="editDialogue = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-layout>
</template>
<script>
import UsersService from '@/services/UsersService'
export default {
  methods: {
    async fetchLevel (fetchLevel) {
      try {
        // const response = await UsersService.index(fetchLevel)
        // const usersObj = response.data || response.data.length ? response.data : []
        // this.users = usersObj
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
      users: [ // Please change
        {
          name: 'Sandiso',
          surname: 'Toto',
          id: 2,
          cell_number: '000000000',
          level: 1,
          eligible: 1
        }
      ],
      editDialogue: false,
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
        },
        {
          text: 'Action',
          align: 'centre',
          value: 'action'
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
    this.fetchLevel(1)
  }
}
</script>