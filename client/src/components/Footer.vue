<template>
  <v-footer height="auto">
    <v-card flat tile class="flex">
      <v-card-title class="light-green darken-1 white--text">
        <strong class="subheading">Get connected with us on social networks!</strong>
        <v-spacer></v-spacer>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          icon
          dark
          class="mx-3"
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      icons: ['fab fa-facebook', 'fab fa-twitter', 'fab fa-google-plus', 'fab fa-linkedin', 'fab fa-instagram'],
      rows: [
        {
          title: 'Company Name',
          children: ['Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit']
        },
        {
          title: 'Products',
          children: ['MDBootstrap', 'MDWordPress', 'BrandFlow', 'Bootstrap Angular']
        },
        {
          title: 'Useful Links',
          children: ['Your account', 'Become an Affiliate', 'Shipping Rates', 'Helper']
        }
      ]
    })
  }
</script>
