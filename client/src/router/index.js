import Vue from 'vue'
import Router from 'vue-router'

import RegisterUser from '@/components/RegisterUser'
import Login from '@/components/Login'
import MyAccount from '@/components/MyAccount/index'

import AdminLogin from '@/components/Admin/AdminLogin'
import Dashboard from '@/components/Admin/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register/:hash',
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
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLogin
    },
    {
      path: '*',
      redirect: 'login'
    }
  ]
})
