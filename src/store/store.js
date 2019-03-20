import Vue from 'vue';
import Vuex from 'vuex';

import axiosFirebase from '../axios-firebase/axios-firebase'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		idToken : null,
		userId: null
	},
	getters: {
		isAuthenticated(state) {
			return state.idToken !== null 			
		}
	},
	mutations: {
		authUser(state, userData) {
			state.idToken = userData.token;
			state.userId = userData.id;
		},
		logout(state) {
			state.idToken = null;
			state.userId = null;
		}
	},
	actions: {
		signup({commit}, authData) {
			axiosFirebase.post(
				'signupNewUser?key=AIzaSyD7aQfjFLDxBP0KwUAjK-B5jthw-HM2OV8' ,
				{
				'email': authData.email,
				'password':	authData.senha,
				'returnSecureToken': true
				}
			)
			.then((res) => {
				// console.log(res);
				commit('authUser', {
					token: res.data.idToken,
					id : res.data.localId
				});
			})									
		},
		login({commit}, authData) {
			axiosFirebase.post(
				'verifyPassword?key=AIzaSyD7aQfjFLDxBP0KwUAjK-B5jthw-HM2OV8' ,
				{
				'email': authData.email,
				'password':	authData.senha,
				'returnSecureToken': true
				}
			)
			.then((res) => {
				// console.log(res);
				commit('authUser', {
					token: res.data.idToken,
					id : res.data.localId
				});
			})			
		},
		logout({commit}) {
			commit('logout');
		}
	}
});
