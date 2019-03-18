<template>
	<div>
		<form class="form-horizontal">
			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Login</label>
				<div class="col-sm-6">
					<input v-model="email" type="text" class="form-control" id="inputEmail3" placeholder="Email">
				</div>
			</div>
			<div class="form-group">
				<label for="inputPassword3" class="col-sm-2 control-label">Password</label>
				<div class="col-sm-6">
					<input v-model="senha" type="password" class="form-control" id="inputPassword3" placeholder="Password">
				</div>
			</div>
			<div class="checkbox">
				<label>
					<input v-model="is_sign_up" type="checkbox"> Sign Up<strong> (Otherwise is Sign In)</strong>
				</label>
				{{is_sign_up}}
			</div>
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-6">
				<button type="button" class="btn btn-success" @click="callFirebase">Logar</button> &nbsp;
				<button type="button" class="btn btn-default">Sair</button>
				</div>
			</div>
		</form>
		<hr/>
	</div>
</template>

<script>
import axios from 'axios'
import axiosFirebase from '../axios-firebase/axios-firebase'

export default {
	component : {

	},
	data() {
		return {
			email: '',
			senha: '',
			is_sign_up: true,
			arrPessoas: {}
		}
	},
	methods: {
		getLogin() {
			axios.get('pessoa/' + this.email + '/' + this.senha)
			.then((response) => {
				this.arrPessoas = response.data;
			})			
		},
		callFirebase() {
			if (this.is_sign_up) {
				// Cria as credenciais no FIREBASE
				console.log('sign up');
				this.signUpFirebase();
				return;
			}

			console.log('sign in');
			// Vê se as credenciais batem com que tem no firebase
			this.signInFirebase();

		},
		signUpFirebase() {
			// https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD7aQfjFLDxBP0KwUAjK-B5jthw-HM2OV8
			axiosFirebase.post(
				'signupNewUser?key=AIzaSyD7aQfjFLDxBP0KwUAjK-B5jthw-HM2OV8' ,
				{
				'email': this.email,
				'password':	this.senha,
				'returnSecureToken': true
				}
			)
			.then((response) => {
				console.log(response);
			})			
			
		},
		signInFirebase() {			
			axiosFirebase.post(
				'verifyPassword?key=AIzaSyD7aQfjFLDxBP0KwUAjK-B5jthw-HM2OV8' ,
				{
				'email': this.email,
				'password':	this.senha,
				'returnSecureToken': true
				}
			)
			.then((response) => {
				console.log(response);
			})			
		}			
	},
}
</script>