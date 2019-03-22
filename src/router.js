import Vue from 'vue'
import VueRouter from 'vue-router'

import Pessoa from './components/pessoa/Pessoa'
import PessoaListar from './components/pessoa/PessoaListar'
import PessoaEditar from './components/pessoa/PessoaEditar'
import Login from './components/login/Login'

// Importando a store do vue
import store from './store/store';

Vue.use(VueRouter)

export const routes = [
	{path: '/login', component: Login, name: 'login'},
	{
		path: '/pessoa', component: Pessoa,
		children: [
			{path: '', component: PessoaListar, name: 'pessoaList'},
			{path: 'cadastar', component: PessoaEditar, name: 'pessoaCad'},
			{path: ':cd_pessoa/editar', component: PessoaEditar, name: 'pessoaEdit'}
		],
		beforeEnter: (to, from, next) => {
			if (store.state.idToken) {
				next();
			} else {
				next('/login?action=login');
			}
		}
	}
];

export default new VueRouter({mode: 'history', routes})