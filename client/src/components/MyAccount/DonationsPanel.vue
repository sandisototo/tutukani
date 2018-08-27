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
                                            <b>R {{donation.amount * user.Level.max_donors}}</b> in return.</p>
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
                        <v-flex xs12 v-if="(donation && donation.payment_status === 2) && !isLevelComplete">
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
                        <v-flex xs12 v-if="(donation && donation.payment_status === 2) && isLevelComplete">
                            <p>
                                <center>Looks like you got money that was due to you on this level.... </center>
                            </p>
                            <p class="title">
                                <center> Now it's time to upgrade to next level :)</center>
                            </p>
                            <div class="text-xs-center">
                                <v-icon x-large color="light-green darken-1">check_circle</v-icon>
                                <p>Click on a button below: </p>
                                <v-btn depressed small class="black" dark @click.native="setupNewUserLevel()">Upgrade</v-btn>                                
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
import UserService from '@/services/UsersService'
import bus from '@/helpers/bus'

export default {
  data () {
    return {
      donation: null,
      previousDonations: [],
      e1: 'waiting',
      showBankingDetails: false,
      confirmaionBtn: 'Ok',
      link: 'https://tutukani.co.za/#/register/',
      isLevelComplete: false,
      newLevelDonationCandidate: null,
      loading: false
    }
  },
  methods: {
    async getDonation () {
      try {
        return (await DonationTransactionService.index()).data
      } catch (err) {
        console.log('getDonation::', err)
      }
    },
    async getCandidateByLevel () {
      try {
        return (await DonationTransactionService.getCandidateByLevel()).data
      } catch (err) {
        console.log('getCandidateByLevel::', err)
      }
    },
    async getDonationCount (level, id) {
      try {
        return (await DonationTransactionService.getDonationCount(level, id)).data
      } catch (err) {
        console.log('getDonationCount::', err)
      }
    },
    async setAsPromisedDonation () {
      try {
        this.showBankingDetails = !this.showBankingDetails
        this.donation.payment_status = 1
        const updatedData = (await DonationTransactionService.put(this.donation)).data
        this.donation = updatedData

        this.confirmaionBtn = 'Pending..'
      } catch (err) {
        console.log('setAsPromisedDonation::', err)
      }
    },
    userCopy () {
      return Object.assign({}, this.user)
    },
    async updatedUser (userCopy) {
      const updatedUser = (await UserService.put(userCopy)).data
      this.$store.dispatch('setUser', updatedUser)
    },
    async setupNewUserLevel () {
      try {
        this.loading = true

        const userCopy = this.userCopy()
        userCopy.level = userCopy.level + 1
        userCopy.hasPaidBefore = 0

        await this.updatedUser(userCopy)

        this.newLevelDonationCandidate = await this.getCandidateByLevel()
        console.log('newLevelDonationCandidate-->', this.newLevelDonationCandidate)
        this.donation = null
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log('setupNewUserLevel::', err)
      }
    },
    async addNewDonationTransaction () {
      try {
        this.loading = true

        const newDonation = {
          UserId: this.user.id,
          CandidateId: this.newLevelDonationCandidate.id,
          level: this.newLevelDonationCandidate.Level.type,
          amount: this.newLevelDonationCandidate.Level.amount
        }

        await DonationTransactionService.post(newDonation)
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log('addNewDonationTransaction::', err)
      }
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  created () {
    bus.$on('isLevelComplete', (isLevelComplete) => {
      this.isLevelComplete = isLevelComplete
    })
  },
  async mounted () {
    if (this.donation && this.donation.payment_status === 1) {
      this.confirmaionBtn = 'Pending..'
    }

    if (this.donation && this.donation.payment_status === 2) {
      const hash = btoa(this.user.cell_number)
      this.link = `${this.link}${hash}`
    }

    this.newLevelDonationCandidate = await this.getCandidateByLevel()
    const donationCount = await this.getDonationCount(this.newLevelDonationCandidate.level, this.newLevelDonationCandidate.id)
    console.log('donationCount-->', donationCount)
    if (donationCount !== this.newLevelDonationCandidate.Level.max_donors) {
      if (donationCount === this.newLevelDonationCandidate.Level.max_donors - 1) {
        // create & update user
        await this.addNewDonationTransaction()
        const userCopy = this.userCopy()
        userCopy.needs_donors = false
        await this.updatedUser(userCopy)
      } else {
        // create
        await this.addNewDonationTransaction()
      }
    }

    this.donation = await this.getDonation()

    console.log('this.newLevelDonationCandidate', this.newLevelDonationCandidate)
    console.log('donation-->', this.donation)
    this.previousDonations = [] // needs to be pulled
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
