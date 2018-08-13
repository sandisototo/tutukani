<template>
    <v-layout  class="mr-2" column>
        <h2 class="display-1 mb-3">Admins</h2>
          
          <v-spacer></v-spacer>
           <v-card-title>
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
      v-bind:items="admins"
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
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }} {{ props.item.surname }}</td>
        <td>{{ props.item.province }} {{ props.item.province }}</td>
        <td class="text-xs-right">{{ props.item.level }}</td>
        <td>
          <center>
          <v-btn color="error" fab small dark @click.native="openAdminModal(props.item)" style="margin-right: -9%">
            <v-icon>edit</v-icon>
          </v-btn>
          </center>
        </td>
      </template>
    </v-data-table>
        <v-dialog v-model="editDialogue" persistent width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Admin Profile</span>
        </v-card-title>
        <v-card-text>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs12 align-center justify-space-between>
                            <v-layout align-center>
                                <v-avatar size="40px" class="mr-3">
                                    <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt="">
                                </v-avatar>
                                <v-flex xs6>
                                <v-text-field v-model="selectedAdmin.name" placeholder="Name" required></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                <v-text-field v-model="selectedAdmin.surname" placeholder="Surname" required></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12>
                            <v-layout align-center>
                             <v-flex xs6>
                                 <v-text-field v-model="selectedAdmin.username" prepend-icon="perm_identity" placeholder="Username" required></v-text-field>
                             </v-flex>
                                  <v-flex xs6>
                            <v-text-field v-model="selectedAdmin.password" prepend-icon="lock" type="password" placeholder="Password" required></v-text-field>
                                  </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12>
                         <v-layout row>
                            <v-flex xs6>
                                <v-select
                                    prepend-icon="notes"
                                    v-bind:items="levels"
                                    v-model="selectedAdmin.level"
                                    label="Select Level"
                                    single-line
                                    bottom
                                    required
                                ></v-select>
                            </v-flex>
                            <v-flex xs6>
                                <v-select
                                    :items="provinces"
                                    v-model="selectedAdmin.province"
                                    label="Select Province"
                                    single-line
                                    auto
                                    hide-details
                                    required
                                ></v-select>
                            </v-flex>
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
          <v-btn color="blue darken-1" flat @click.native="updateAdmin(selectedAdmin)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    </v-layout>
</template>
<script>
import AdminService from '@/services/AdminService'
export default {
  data () {
    return {
      admins: [],
      errorMsg: null,
      errorAlert: false,
      successMsg: null,
      successAlert: false,
      selectedAdmin: {},
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
          sortable: true,
          value: 'name'
        },
        {
          text: 'Province',
          align: 'left',
          sortable: true,
          value: 'province'
        },
        { text: 'Level', value: 'level' },
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
      ]
    }
  },
  methods: {
    async getAdmins () {
      try {
        const response = (await AdminService.index()).data
        const adminsObj = response || response.length ? response : []
        this.admins = adminsObj
      } catch (error) {
        console.log('error-->', error)
        this.error = error.response.data.error
      }
    },
    async openAdminModal (selectedAdmin) {
      this.selectedAdmin = selectedAdmin
      this.editDialogue = true
    },
    async updateAdmin (admin) {
      try {
        await AdminService.put(admin)
        this.successAlert = true
        this.successMsg = 'Yes! all saved and good to go ;)'
      } catch (err) {
        this.errorMsg = err.response.data.error
        this.errorAlert = true
        console.log(err)
      }
    }
  },
  async mounted () {
    this.getAdmins()
  }
}
</script>
                