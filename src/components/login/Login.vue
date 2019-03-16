<template>
	<div>
		<form class="form-horizontal">
			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">Login</label>
				<div class="col-sm-6">
					<input v-model="login" type="text" class="form-control" id="inputEmail3" placeholder="Login">
				</div>
			</div>
			<div class="form-group">
				<label for="inputPassword3" class="col-sm-2 control-label">Password</label>
				<div class="col-sm-6">
					<input v-model="senha" type="password" class="form-control" id="inputPassword3" placeholder="Password">
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-6">
				<button type="button" class="btn btn-success" @click="getLogin">Logar</button> &nbsp;
				<button type="button" class="btn btn-default">Sair</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	component : {

	},
	data() {
		return {
			login: '',
			senha: '',
			arrPessoas: {}
		}
	},
	methods: {
		getLogin(login, senha) {
			axios.get('http://localhost:3001/api/pessoa/' + this.login + '/' + this.senha)
			.then((response) => {
				this.arrPessoas = response.data;
			})			
		}		
	},
}
</script>