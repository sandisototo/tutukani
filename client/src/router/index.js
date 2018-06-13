import Vue from 'vue'
import Router from 'vue-router'
import RegisterUser from '@/components/RegisterUser'
import Login from '@/components/Login'
import Songs from '@/components/Songs/Index'
import CreateSong from '@/components/CreateSong'
import EditSong from '@/components/EditSong'
import ViewSong from '@/components/ViewSong/Index'

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
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/songs/create',
      name: 'songs-create',
      component: CreateSong
    },
    {
      path: '/songs/:songId',
      name: 'song',
      component: ViewSong
    },
    {
      path: '/songs/:songId/edit',
      name: 'song-edit',
      component: EditSong
    },
    {
      path: '*',
      redirect: 'songs'
    }
  ]
})
