import Vue from 'vue'
import Router from 'vue-router'

import RegisterUser from '@/components/RegisterUser'
import Login from '@/components/Login'
import MyAccount from '@/components/MyAccount/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: RegisterUser
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/my-account',
      name: 'my-account',
      component: MyAccount
    },
    {
      path: '*',
      redirect: 'login'
    }
  ]
})
