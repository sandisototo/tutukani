
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
          <v-btn color="error" fab small dark @click.native="openUserModal(props.item)" style="margin-right: -9%">
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
            <v-layout row>
               <v-flex xs6>
                  <v-text-field
                    label="Name"
                    required
                    :rules="[required]"
                    v-model="selectedUser.name"
                    ></v-text-field>
                  <v-text-field
                    label="Surname"
                    required
                    :rules="[required]"
                    v-model="selectedUser.surname"
                    ></v-text-field>
                  <v-radio-group v-model="selectedUser.gender" row>
                    <v-radio
                      label="Male"
                      color="success"
                      value="Male"
                      ></v-radio>
                    <v-radio
                      label="Female"
                      color="success"
                      value="Female"
                      ></v-radio>
                  </v-radio-group>
                  <v-text-field
                    label="Cell Number"
                    type="number"
                    required
                    :rules="[required]"
                    v-model="selectedUser.cell_number"
                    ></v-text-field>
                  <v-text-field
                  disabled
                    label="Password"
                    placeholder="Can't be changed"
                    type="password"
                    ></v-text-field>
                  <v-text-field
                    label="Email"
                    :rules="emailRules"
                    v-model="selectedUser.email"
                    ></v-text-field>
              </v-flex>
                  <v-flex xs8>
        <v-layout row >
          <v-flex xs2>
            <v-subheader>Province</v-subheader>
          </v-flex>
          <v-flex xs4>
            <v-select
              :items="provinces"
              v-model="selectedUser.province"
              label="Select Province"
              single-line
              auto
              hide-details
              required
              ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row >
          <v-flex xs2>
            <v-subheader>Street address</v-subheader>
          </v-flex>
          <v-text-field
            label="Enter user's street address"
            multi-line
            v-model="selectedUser.address"
            ></v-text-field>
        </v-layout>
        <v-divider></v-divider>
        <v-subheader>Banking Details</v-subheader>
        <v-layout row class="ml-5">
          <v-expansion-panel popout>
            <v-expansion-panel-content>
              <div slot="header">Change Banking Details?</div>
              <v-card>
                <v-layout row>
                <v-flex xs2>
                  <v-subheader>Bank</v-subheader>
                </v-flex>
                  <v-flex xs4>
                  <v-select
                    :items="banks"
                    v-model="selectedUser.Account.bank"
                    label="Select User Bank"
                    single-line
                    auto
                    hide-details
                    required
                    ></v-select>
                </v-flex>
                                <v-flex xs4 class="ml-5">
                <v-text-field
                  label="Account Holder"
                  type="text"
                  required
                  :rules="[required]"
                  v-model="selectedUser.Account.account_holder"
                >
              </v-text-field>
          </v-flex>
                </v-layout>
              </v-card>
                  <v-layout row >
          <v-flex xs2>
            <v-subheader>Account Type</v-subheader>
          </v-flex>
          <v-flex xs4>
            <v-radio-group 
              v-model="selectedUser.Account.account_type"
              >
              <v-radio
                label="Cheque"
                color="success"
                value="Cheque"
                ></v-radio>
              <v-radio
                label="Savings"
                color="success"
                value="Savings"
                ></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs4 class="ml-5">
            <v-text-field
              label="Account Number"
              type="number"
              v-model="selectedUser.Account.account_number"
              ></v-text-field>
          </v-flex>
        </v-layout>
                <v-layout row >
          <v-flex xs2>
          </v-flex>
          <v-flex xs4>
          </v-flex>
          <v-flex xs4 class="ml-5">
                <v-text-field
                  label="Cellphone Number"
                  type="number"
                  required
                  :rules="[required]"
                  v-model="selectedUser.Account.account_cell_number"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <!-- <v-layout justify-end class="mr-5 mb-2">
                <v-btn flat small color="primary" dark @click="updateUserAccount(electedUser.Account)">Change</v-btn>
              </v-layout> -->
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-layout>
          </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
          <v-snackbar
            class="error-alert"
            :timeout="60000"
            top="top"
            color="error"
            :vertical=true
            v-model="errorAlert"
            >
            {{errorMsg}}
            <v-btn dark flat @click.native="errorAlert = false">Close</v-btn>
          </v-snackbar>
            <v-snackbar
            class="success-alert"
            :timeout="60000"
            top="top"
            color="success"
            :vertical=true
            v-model="successAlert"
            >
            {{successMsg}}
            <v-btn dark flat @click.native="successAlert = false">Close</v-btn>
          </v-snackbar>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="editDialogue = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="updateUser(selectedUser)">Save</v-btn>
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
    },
    async openUserModal (selectedUser) {
      this.selectedUser = selectedUser
      this.editDialogue = true
    },
    async updateUser (user) {
      try {
        await UsersService.put(user)
        this.successAlert = true
        this.successMsg = 'Yes! all saved and good to go ;)'
      } catch (err) {
        this.errorMsg = err.response.data.error
        this.errorAlert = true
        console.log(err)
      }
    }
  },
  data () {
    return {
      errorMsg: null,
      errorAlert: false,
      successMsg: null,
      successAlert: false,
      selectedUser: {
        Account: {}
      },
      users: [],
      editDialogue: false,
      search: '',
      selected: [],
      required: (value) => !!value || 'Required.',
      emailRules: [
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
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
      ],
      provinces: [
        'Eastern Cape',
        'Free State',
        'Gauteng',
        'KwaZulu-Natal',
        'Limpopo',
        'Mpumalanga',
        'Northern Cape',
        'North West',
        'Western Cape'
      ],
      banks: [
        //  'Absa',
        //  'African Bank',
        'Capitec'
        //  'FNB',
        //  'Nedbank',
        //  'Standard Bank'
      ]
    }
  },
  async mounted () {
    this.fetchLevel(1)
  }
}
</script>