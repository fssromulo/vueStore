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
			<div class="form-group">
				<p v-if="is_sign_up">Você está prestes a realizar o sign up</p>
				<p v-if="!is_sign_up">Você está prestes a realizar o login</p>
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
export default {
	computed: {
		is_sign_up() {
			if (this.$route.query.action == 'signup') {
				return true;
			}
			return false;
		}
	},
	data() {
		return {
			email: '',
			senha: '',
			arrPessoas: {}
		}
	},
	methods: {
		callFirebase() {
			if (this.is_sign_up) {
				this.signUpFirebase();
				return;
			}
			this.signInFirebase();
		},
		signUpFirebase() {
			this.$store.dispatch(
				'signup',
				{email: this.email, senha: this.senha }
			);
		},
		signInFirebase() {			
			this.$store.dispatch(
				'login',
				{email: this.email, senha: this.senha }
			);
		}			
	},
}
</script>