<template>
  <v-layout>
    <v-flex xs6>
      <panel title="Personal Details">
        <v-text-field
          label="Name"
          required
          :rules="[required]"
          v-model="newUser.name"
        ></v-text-field>

        <v-text-field
          label="Surname"
          required
          :rules="[required]"
          v-model="newUser.surname"
        ></v-text-field>
        
        <v-radio-group v-model="newUser.gender" :rules="[required]" required row>
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
          v-model="newUser.cell_number"
        ></v-text-field>

        <v-text-field
          label="Password"
          placeholder="no spaces allowed"
          type="password"
          required
          :rules="[required]"
          v-model="newUser.password"
        ></v-text-field>

        <v-text-field
          label="Email"
          required
          :rules="emailRules"
          v-model="newUser.email"
        ></v-text-field>

        <v-text-field
          label="Referal Cellphone number"
          type="number"
          v-model="newUser.refferal_number"
        ></v-text-field>
      </panel>
    </v-flex>


    <v-flex xs8>
      <panel title="Address" class="ml-2 mb-2">
        <v-text-field
          label="Enter your full address"
          multi-line
          v-model="newUser.address"
        ></v-text-field>
      </panel>


      <panel title="Banking Details" class="ml-2">
        <v-layout row>
          <v-flex xs2>
            <v-subheader>Bank</v-subheader>
                </v-flex>
                <v-flex xs4>
                <v-select
                  :items="banks"
                  v-model="newUser.account.bank"
                  label="Select Your Bank"
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
          v-model="newUser.account.account_holder"
        ></v-text-field>
            </v-flex>
          </v-layout>
                  <v-layout row >
          <v-flex xs2>
            <v-subheader>Account Type</v-subheader>
                </v-flex>
                <v-flex xs4>
              <v-radio-group 
              v-model="newUser.account.account_type"
              required
              :rules="[required]"
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
          required
          :rules="[required]"
          v-model="newUser.account.account_number"
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
          label="Branch Code"
          type="number"
          v-model="newUser.account.branch_code"
        ></v-text-field>
            </v-flex>
          </v-layout>
      </panel>

      <div class="danger-alert" v-if="error">
        {{error}}
      </div>

         <v-snackbar
          class="error-alert"
          :timeout="60000"
          top="top"
          color="error"
          :vertical=true
          v-model="errorAlert"
    >
      {{error}}
       <v-btn dark flat @click.native="errorAlert = false">Close</v-btn>
         </v-snackbar>

  

      <v-btn
        dark
        class="light-green darken-1"
        @click="register">
        Join
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      newUser: {
        name: null,
        surname: null,
        cell_number: null,
        password: null,
        email: null,
        gender: null,
        refferal_number: null,
        address: null,
        account: {
          bank: null,
          account_type: null,
          account_holder: null,
          account_number: null,
          branch_code: null
        }
      },
      banks: [
        'Absa',
        'African Bank',
        'Capitec',
        'FNB',
        'Nedbank',
        'Standard Bank'
      ],
      error: null,
      errorAlert: false,
      required: (value) => !!value || 'Required.',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    areAllFieldsFilledIn (v) {
      return (
        v.name !== null &&
        v.surname !== null &&
        v.cell_number !== null &&
        v.password !== '' && v.password !== null &&
        v.email !== '' && v.email !== null &&
        v.gender !== null &&
        v.account !== null &&
        v.account.bank !== null &&
        v.account.account_type !== null &&
        v.account.account_holder !== null &&
        v.account.account_number !== null
      )
    },
    async register () {
      this.error = null
      if (!this.areAllFieldsFilledIn(this.newUser)) {
        this.error = 'Please fill in all the required fields.'
        this.errorAlert = true
        return
      }

      try {
        const response = await AuthenticationService.register({
          name: this.newUser.name,
          surname: this.newUser.surname,
          cell_number: this.newUser.cell_number,
          password: this.newUser.password,
          email: this.newUser.email,
          username: this.newUser.cell_number,
          gender: this.newUser.gender,
          refferal_number: this.newUser.refferal_number,
          address: this.newUser.address,
          account: this.newUser.account
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'my-account'
        })
        this.errorAlert = false
      } catch (error) {
        this.error = error.response.data.error
        this.errorAlert = true
      }
    }
  },
  async mounted () {
    this.$store.state.isUserLoggedIn = false
    this.$store.dispatch('setToken', null)
    this.$store.dispatch('setUser', null)
  }
}
</script>

<style scoped>
.error-alert {
  background-color: #ff5252;
}
</style>
