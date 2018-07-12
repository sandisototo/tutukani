<template>
  <panel title="Donate">
    <v-card height="450px">
      <div v-if="e1==='waiting'">
      <v-flex xs12 v-if="donation && donation.complete_status === 1">
        <p>
         <center>Thank you for your donation.... </center>
        </p>

        <p class="title">
          <center> Now it's time to upgrade :)</center>
        </p>
        <div class="text-xs-center">
          <v-btn round dark>Upgrade to level 2</v-btn>
        </div>
        </v-flex>
        <v-flex xs12 v-if="!donation">
        <p>
         <center>You have not donated yet</center>
        </p>
        <br/>
        <br/>
        <p class="title">
          <center>Please wait... while we're still finding a suitable candidate for you.</center>
        </p>
        </v-flex>
      <v-flex xs12 v-if="donation && donation.complete_status !== 1">
        <v-card>
          <v-card-title primary-title>
            <div>
              <div>
                <p>
                  <center>You have not donated yet</center>
                </p>
                <p style="font-size: 18px;">Here is your donation candidate information. Pay <b>R{{donation.amount}}</b> and get
                <b>R 120</b> in return.</p>
              </div>
              <v-layout row >
            <v-flex md1 >
              <v-avatar
                slot="activator"
                size="36px"
              >
              <v-icon>account_circle</v-icon>
              </v-avatar>
            </v-flex>
              <span style="wdisplay: block;">{{donation.candidate.name}} {{donation.candidate.surname}}<br>Cell: {{donation.candidate.cell_number}}</span>
               </v-layout>
            </div>
          </v-card-title>
          <v-card-actions>
            
            <v-btn block flat @click.native="showBankingDetails = !showBankingDetails" style="color:black">View bank details</v-btn>
            <v-btn icon @click.native="showBankingDetails = !showBankingDetails">
              <v-icon>{{ showBankingDetails ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="showBankingDetails">
                Bank: {{donation.candidate.account.bank}} <br>
                Bank Holder: {{donation.candidate.account.account_holder}}<br>
                Account Type: {{donation.candidate.account.account_type}} <br>
                Account Number: {{donation.candidate.account.account_number}} <br>
                <p v-show="donation.candidate.account.branch_code !== null">Branch Code: {{donation.candidate.account.branch_code}}</p><br>
               
                          <v-layout align-end justify-end>
                <v-btn depressed small class="light-green darken-1" dark v-if="confirmaionBtn=='Ok'" @click.native="setAsPromisedDonation">{{confirmaionBtn}}</v-btn>
                <v-btn depressed small disabled v-if="confirmaionBtn=='Pending..'" @click.native="showBankingDetails = !showBankingDetails">{{confirmaionBtn}}</v-btn>
              </v-layout>
              </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
      </div>
      <div class="headline text-xs-center pa-5" v-if="e1==='past'">Active: {{ e1 }}</div>
      <v-bottom-nav :value="true" :active.sync="e1" absolute color="transparent">
        <v-btn flat color="teal" value="waiting">
          <span>Waiting</span>
          <v-icon>timer</v-icon>
        </v-btn>
        <v-spacer>
        </v-spacer>
        <v-btn flat color="teal" value="past">
          <span>Past donations</span>
          <v-icon>history</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import DonationTransactionService from '@/services/DonationTransactionService'

export default {
  data () {
    return {
      donation: null,
      newDonationCandidate: {
        candidate: {
          name: null,
          surname: null
        }
      },
      previousDonations: [],
      e1: 'waiting',
      showBankingDetails: false,
      confirmaionBtn: 'Ok'
    }
  },
  methods: {
    async setAsPromisedDonation () {
      try {
        this.showBankingDetails = !this.showBankingDetails
        this.donation.payment_status = 1
        const updateddata = await DonationTransactionService.put(this.donation)
        console.log('updateddata -->', updateddata)
        this.donation = updateddata.data
        console.log('this.donation -->', this.donation)
        this.confirmaionBtn = 'Pending..'
      } catch (err) {
        console.log(err)
      }
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
      this.donation = (await DonationTransactionService.index()).data

      if (this.donation || this.donation.payment_status) {
        this.confirmaionBtn = this.donation.payment_status === 1 ? 'Pending..' : 'Ok'
      }

      this.previousDonations = [ // TODO: Select from Transactions table
        {
          id: 1,
          userId: 4,
          createdAt: '13212-1231-12',
          receiverName: 'Sibongile Menzi',
          amount: 60
        },
        {
          id: 1,
          userId: 4,
          createdAt: '13212-1231-12',
          receiverName: 'Sibongile Menzi',
          amount: 60
        },
        {
          id: 1,
          userId: 4,
          createdAt: '13212-1231-12',
          receiverName: 'Sibongile Menzi',
          amount: 60
        }
      ]
    }
  }
}
</script>

<style>
.bottom-nav {
    background: #ffffff;
}
.pending {
  color: orange;
}
</style>
