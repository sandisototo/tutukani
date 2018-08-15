<template>
    <div v-if="$store.state.isAdmin">
        <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
            <v-list dense>
                <template v-for="item in items">
                    <v-layout row v-if="item.heading" align-center :key="item.heading">
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>
                    <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-for="(child, i) in item.children" :key="i" @click="switchChild(i)">
                            <v-list-tile-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else @click="switchParent(item.action)" :key="item.action">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">{{$store.state.admin.name}}</span>
            </v-toolbar-title>
            <v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>notifications</v-icon>
            </v-btn>
            <v-btn class="primary">
                Logout
            </v-btn>
        </v-toolbar>
        <v-content>
            <component v-bind:is="currentView">
            <!-- component changes when vm.currentView changes! -->
            </component>
        </v-content>
        <v-btn fab bottom right color="pink" dark fixed @click="addAdmin">
            <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="800px">
            <v-card>
             <v-card-title class="grey lighten-4 py-4 title">
                Add admin
              </v-card-title>
              <form @submit.prevent="saveAdmin">
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs12 align-center justify-space-between>
                            <v-layout align-center>
                                <v-avatar size="40px" class="mr-3">
                                    <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt="">
                                </v-avatar>
                                <v-flex xs6>
                                <v-text-field v-model="newAdmin.name" placeholder="Name" required></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                <v-text-field v-model="newAdmin.surname" placeholder="Surname" required></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12>
                            <v-layout align-center>
                             <v-flex xs6>
                                 <v-text-field v-model="newAdmin.username" prepend-icon="perm_identity" placeholder="Username" required></v-text-field>
                             </v-flex>
                                  <v-flex xs6>
                            <v-text-field v-model="newAdmin.password" prepend-icon="lock" type="password" placeholder="Password" required></v-text-field>
                                  </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12>
                         <v-layout row>
                            <v-flex xs6>
                                <v-select
                                    prepend-icon="notes"
                                    v-bind:items="levels"
                                    v-model="newAdmin.level"
                                    label="Select Level"
                                    single-line
                                    bottom
                                    required
                                ></v-select>
                            </v-flex>
                            <v-flex xs6>
                                <v-select
                                    :items="provinces"
                                    v-model="newAdmin.province"
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
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
                    <v-btn flat type="submit">Save</v-btn>
                </v-card-actions>
              </form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Users from '@/components/Admin/Users'
import Donations from '@/components/Admin/Donations'
import ActiveTransactions from '@/components/Admin/ActiveTransactions'
import Admins from '@/components/Admin/Admins'
import Settings from '@/components/Admin/Settings'

import AdminService from '@/services/AdminService'

export default {
  components: {
    Users,
    Donations,
    ActiveTransactions,
    Admins,
    Settings
  },
  methods: {
    addAdmin () {
      this.dialog = !this.dialog
    },
    async saveAdmin () {
      try {
        const newAdmin = (await AdminService.post(this.newAdmin)).data
        console.log('newAdmin-->', newAdmin)
        this.dialog = false
      } catch (error) {
        console.log('error-->', error)
        this.error = error.response.data.error
        this.errorAlert = true
      }
    },
    switchParent (element) {
      switch (element) {
        case 0:
          this.currentView = 'Users'
          console.log('this.getUsers()')
          break
        case 1:
          this.currentView = 'Donations'
          console.log('this.getDonations()')
          break
        case 2:
          this.currentView = 'ActiveTransactions'
          console.log('this.getActiveTrans()')
          break
        case 3:
          this.currentView = 'Admins'
          console.log('this.getAdmins()')
          break
        case 4:
          this.currentView = 'Settings'
          console.log('this.showSettings()')
          break
        case 5:
          this.currentView = 'Settings'
          console.log('this.broadcastMessage()')
          break
        case 6:
          console.log('this.showHelp()')

          break
        default:
          console.log('No action found')
      }
    },
    switchChild (element) {
      switch (element) {
        case 0:
          this.addAdmin()
          break
        default:
          console.log('No action found')
      }
    }
  },
  data () {
    return {
      currentView: 'Users',
      dialog: false,
      drawer: null,
      levels: [
        { text: 'Level 1', value: 1 },
        { text: 'Level 2', value: 2 },
        { text: 'Level 3', value: 3 },
        { text: 'Level 4', value: 4 },
        { text: 'Level 5', value: 5 },
        { text: 'Level 6', value: 6 },
        { text: 'Level 7', value: 7 }
      ],
      newAdmin: {
        name: null,
        surname: null,
        username: null,
        password: null,
        province: null,
        level: null
      },
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
      items: [
        { icon: 'group', text: 'Users', action: 0 },
        { icon: 'money', text: 'Donations', action: 1 },
        { icon: 'history', text: 'Active transactions', action: 2 },
        { icon: 'content_copy', text: 'Administration', action: 3 },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: true,
          children: [{ icon: 'add', text: 'Add admin' }]
        },
        { icon: 'settings', text: 'Settings', action: 4 },
        { icon: 'chat_bubble', text: 'Broadcast message', action: 5 },
        { icon: 'help', text: 'Help', action: 6 }
      ]
    }
  },
  async mounted () {}
}
</script>
<style>
</style>