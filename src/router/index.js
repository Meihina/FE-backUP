import Vue from 'vue'
import VueRouter from 'vue-router'
import paper from '../views/Paper.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'/home',
    name: 'default'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('../views/Articles.vue')
  },
  {
    path: '/tags',
    name: 'Tags',
    component: () => import('../views/Tags.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/paper',
    name: 'Paper',
    component: paper
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
