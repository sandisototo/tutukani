<template>
    <v-tabs id="mobile-tabs-5" fixed dark centered>
        <v-toolbar class="light-green darken-1" dark>
            <v-toolbar-title> Donate <v-icon>money</v-icon> </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tabs-bar class="light-green darken-1" slot="extension">
                <v-tabs-slider class="yellow"></v-tabs-slider>
                <v-tabs-item href="#tab-1">
                    <v-icon>hourglass_empty</v-icon>
                    Active
                </v-tabs-item>
                <v-tabs-item href="#tab-2">
                    <v-icon>history</v-icon>
                    Previous
                </v-tabs-item>
                <v-tabs-item href="#tab-3">
                    <v-icon>error</v-icon>
                    Expired
                </v-tabs-item>
            </v-tabs-bar>
        </v-toolbar>
        <v-tabs-items>
            <v-tabs-content v-for="i in 3" :key="i" :id="'tab-' + i">
                <v-card flat>
                    <v-card-text v-if="i===1">
                        <v-flex xs12 v-if="!donation">
                            <p>
                                <center>You have not donated yet</center>
                            </p>
                            <br/>
                            <br/>
                            <p class="title">
                                <center>PLEASE WAIT...
                                    <br/>
                                    <span style="font-size: initial;"> We're still finding a suitable candidate for you.
                        </span>
                                </center>
                            </p>
                        </v-flex>
                                                <v-flex xs12 v-if="donation && donation.payment_status !== 2">
                            <v-card>
                                <v-card-title primary-title>
                                    <div>
                                        <p>
                                            <center>You have not donated yet</center>
                                        </p>
                                        <p style="font-size: 18px;">Here is your donation candidate information. Pay <b>R{{donation.amount}}</b> and get
                                            <b>R 120</b> in return.</p>
                                        <v-layout row>
                                            <v-flex md1>
                                                <v-avatar slot="activator" size="36px">
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
                                        Bank: {{donation.candidate.account.bank}}
                                        <br> Bank Holder: {{donation.candidate.account.account_holder}}
                                        <br> Account Type: {{donation.candidate.account.account_type}}
                                        <br> Account Number: {{donation.candidate.account.account_number}}
                                        <br> Cellphone Banking Number: {{donation.candidate.account.account_cell_number}}
                                        <br>
                                        <p v-show="donation.candidate.account.branch_code !== null">Branch Code: {{donation.candidate.account.branch_code}}</p>
                                        <br>

                                        <v-layout align-end justify-end>
                                            <v-btn depressed small class="light-green darken-1" dark v-if="confirmaionBtn=='Ok'" @click.native="setAsPromisedDonation">{{confirmaionBtn}}</v-btn>
                                            <v-btn depressed small disabled v-if="confirmaionBtn=='Pending..'" @click.native="showBankingDetails = !showBankingDetails">{{confirmaionBtn}}</v-btn>
                                        </v-layout>
                                    </v-card-text>
                                </v-slide-y-transition>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 v-if="donation && donation.payment_status === 2">
                            <p>
                                <center>Thank you for your donation.... </center>
                            </p>
                            <p class="title">
                                <center> Now it's time to get more money back :)</center>
                            </p>
                            <div class="text-xs-center">
                                <p>Here is your link below: </p>
                                            <v-flex xs12 sm12x>
                                                    <v-text-field
                                                :value="link"
                                                label="Link"
                                                readonly
                                            ></v-text-field>
                                            </v-flex>
                                
                                <small>* Make sure you share it with 2 donators</small>
                            </div>
                        </v-flex>
                    </v-card-text>
                    <v-card-text v-if="i===2">
                        <p>
                            <center>No previous donations found</center>
                        </p>
                    </v-card-text>
                    <v-card-text v-if="i===3">
                        <p>
                            <center>No expired donations found</center>
                        </p>
                    </v-card-text>
                </v-card>
            </v-tabs-content>
        </v-tabs-items>
    </v-tabs>
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
      confirmaionBtn: 'Ok',
      link: 'http://localhost:8080/#/register/'
    }
  },
  methods: {
    async setAsPromisedDonation () {
      try {
        this.showBankingDetails = !this.showBankingDetails
        this.donation.payment_status = 1
        const updateddata = await DonationTransactionService.put(this.donation)

        this.donation = updateddata.data

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

      if (this.donation && this.donation.payment_status === 1) {
        this.confirmaionBtn = 'Pending..'
      }

      if (this.donation && this.donation.payment_status === 2) {
        const hash = btoa(this.user.cell_number)
        this.link = `${this.link}${hash}`
      }
      this.previousDonations = []
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
