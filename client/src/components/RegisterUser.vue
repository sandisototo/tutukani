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
          :rules="emailRules"
          v-model="newUser.email"
          ></v-text-field>
      </panel>
    </v-flex>
    <v-flex xs8>
      <panel title="Address" class="ml-2 mb-2">
        <v-layout row >
          <v-flex xs2>
            <v-subheader>Province</v-subheader>
          </v-flex>
          <v-flex xs4>
            <v-select
              :items="provinces"
              v-model="newUser.province"
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
            label="Enter your street address"
            multi-line
            v-model="newUser.address"
            ></v-text-field>
        </v-layout>
      </panel>
      <panel title="Banking Details" class="ml-2">
        <p>PLEASE NOTE* we only support Capitec clients for now</p>
        <v-layout row>
          <v-flex xs2>
            <v-subheader>Bank</v-subheader>
          </v-flex>
          <v-flex xs4>
            <v-select
              :items="banks"
              v-model="newUser.Account.bank"
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
              v-model="newUser.Account.account_holder"
              ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row >
          <v-flex xs2>
            <v-subheader>Account Type</v-subheader>
          </v-flex>
          <v-flex xs4>
            <v-radio-group 
              v-model="newUser.Account.account_type"
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
              v-model="newUser.Account.account_number"
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
              v-model="newUser.Account.account_cell_number"
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
        :disabled="linkingErrorDialog"
        @click="register">
        Join
      </v-btn>
    </v-flex>
    <v-dialog v-model="linkingErrorDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Error :(</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <p> {{linkingErrorDialogMessage}}</p>
                <small>PLEASE NOTE* <br/>Only registration links provided by members of this group are concidered valid</small>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeRegistration()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  import AuthenticationService from '@/services/AuthenticationService'
  import UsersService from '@/services/UsersService'
  import DonationTransactionService from '@/services/DonationTransactionService'
  
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
          province: null,
          Account: {
            bank: 'Capitec',
            account_type: 'Savings',
            account_holder: null,
            account_number: null,
            account_cell_number: null,
            branch_code: null
          }
        },
        newDonationTransaction: {
          UserId: null,
          CandidateId: null,
          amount: 60
        },
        linkingErrorDialog: false,
        linkingErrorDialogMessage: null,
        donationCandidate: null,
        banks: [
          'Absa',
          'African Bank',
          'Capitec',
          'FNB',
          'Nedbank',
          'Standard Bank'
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
        error: null,
        errorAlert: false,
        required: (value) => !!value || 'Required.',
        emailRules: [
         //  v => !!v || 'E-mail is required',
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
          v.gender !== null &&
          v.province !== null &&
          v.Account !== null &&
          v.Account.bank !== null &&
          v.Account.account_type !== null &&
          v.Account.account_holder !== null &&
          v.Account.account_number !== null
        )
      },
      reset () {
        this.$store.state.isUserLoggedIn = false
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
      },
      isBase64 (hash) {
        const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
        return base64regex.test(hash)
      },
      closeRegistration () {
        this.reset()
        this.$router.push({
          name: 'login'
        })
        return false
      },
      async register () {
        this.error = null
        if (!this.areAllFieldsFilledIn(this.newUser)) {
          this.error = 'Please fill in all the required fields.'
          this.errorAlert = true
          return
        }
  
        try {
          const newUser = (await AuthenticationService.register(this.newUser)).data
          this.newDonationTransaction.UserId = newUser.user.id
  
          this.$store.dispatch('setToken', newUser.token)
          this.$store.dispatch('setUser', newUser.user)
  
          // Create link
          const donation = (await DonationTransactionService.post(this.newDonationTransaction)).data
          console.log('donation-->', donation)
          this.$router.push({
            name: 'my-account'
          })
          this.errorAlert = false
        } catch (error) {
          console.log('error-->', error)
          this.error = error.response.data.error
          this.errorAlert = true
        }
      }
    },
    async mounted () {
      this.reset()
      let eMsg = null
  
      if (!this.$route.params && !this.$route.params.hash) {
        this.closeRegistration()
      }
  
      const hash = this.$route.params.hash
      const cellNumber = this.isBase64(hash) ? atob(hash) : null
  
      if (cellNumber) { // TODO: change this length
        this.donationCandidate = (await UsersService.getByNumber(1, cellNumber)).data
        if (!this.donationCandidate) {
          eMsg = 'This link is not valid!'
          this.linkingErrorDialogMessage = eMsg
          this.linkingErrorDialog = true
          console.error(eMsg)
          return false
        }
        this.newDonationTransaction.CandidateId = this.donationCandidate && this.donationCandidate.id ? this.donationCandidate.id : null
      } else {
        eMsg = 'This link is not valid!'
        this.linkingErrorDialogMessage = eMsg
        this.linkingErrorDialog = true
        console.error(eMsg)
        return false
      }
  
      // Check the link count/ number of people registered should not be more than 2
      const donationCount = (await DonationTransactionService.getDonationCount(this.donationCandidate.level, this.donationCandidate.id)).data
      console.log('donationCount-->', donationCount)
      if (donationCount >= 2) {
        eMsg = 'This user have 2 donators asigned to them already'
        this.linkingErrorDialogMessage = eMsg
        this.linkingErrorDialog = true
        console.error(eMsg)
        return false
      }
  
      if (!this.newDonationTransaction.CandidateId) {
        eMsg = 'The user to pay was not found!'
        this.linkingErrorDialogMessage = eMsg
        this.linkingErrorDialog = true
        console.error(eMsg)
        return false
      }
    }
  }
</script>
<style scoped>
  .error-alert {
  background-color: #ff5252;
  }
</style>