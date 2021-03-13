import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/session-zero',
		name: 'Session Zero Blank',
		component: () => import('../views/SessionZero.vue')
	},
	{
		path: '/session-zero/:selections',
		name: 'Session Zero Dynamic',
		component: () => import('../views/SessionZero.vue')
	},
	{
		path: '/conditions',
		name: 'Condition Tracker',
		component: () => import('../views/Conditions.vue')
	},
	{
		path: '/post-session',
		name: 'Post-Session Poll',
		component: () => import('../views/PostSession.vue')
	},
	{
		path: '/tarot-character',
		name: 'Tarot Character Generator',
		component: () => import('../views/Tarot.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
