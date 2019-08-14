import Vue from 'vue'
import Vuex from 'vuex'

import login from './module/login'
import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		//
	},
	mutations: {
		//
	},
	actions: {
		//
	},
	modules: {
		login,
		user,
		app
	}
})
