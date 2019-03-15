<template>
	<div>
		<h4>
			Editar - Pessoa Cód.{{this.$route.params.cd_pessoa}}
		</h4>
		<div class="row">
			<div class="col-sm-12">
				<form class="form-horizontal">
					<div class="form-group">
						<input
							type="number"
							v-model="arrPessoaEditar.cd_pessoa"
							id="cd_pessoa"
							class="form-control"
							placeholder="Código da pessoa"
							disabled
						/>
					</div>

					<div class="form-group">
						<input
							type="text"
							v-model="arrPessoaEditar.nm_pessoa"
							id="nm_pessoa"
							class="form-control"
							placeholder="Nome da pessoa"
						/>
					</div>

					<div class="form-group">
						<input
							type="email"
							v-model="arrPessoaEditar.email"
							id="email"
							class="form-control"
							placeholder="Email da pessoa"
						/>
					</div>

					<div class="form-group">
						<input
							type="Fone"
							v-model="arrPessoaEditar.fone"
							id="fone"
							class="form-control"
							placeholder="Fone da pessoa"
						/>
					</div>

					<div class="form-group">
						<input
							type="text"
							v-model="arrPessoaEditar.login"
							id="login"
							class="form-control"
							placeholder="Login da pessoa"
						/>
					</div>

					<div class="form-group">
						<input
							type="password"
							v-model="nova_senha"
							id="senha"
							class="form-control"
							placeholder="Senha da pessoa"
						/>
					</div>
					<br/>
					<br/>

					<button type="button" class="btn btn-primary" @click="alterarPessoa">Alterar</button> &nbsp;
					<button type="button" class="btn btn-danger" @click="voltarListagem">Voltar</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import PessoaListar from './PessoaListar';

export default {
	component: {
		PessoaListar
	},
	data() {
		return {
			nova_senha: '',
			arrPessoaEditar : {
				cd_pessoa : null,
				nm_pessoa : '',
				fone: '',
				email: '',
				login: '',
				senha: ''
			}
		}
	},
	methods: {
		carregarPessoa () {
			axios.get('http://localhost:3001/api/pessoa/' + this.$route.params.cd_pessoa)
			.then((response) => {
				this.arrPessoaEditar = response.data['0'];
			})
		},
		alterarPessoa() {

			this.nova_senha = (this.nova_senha.lenght > 0) ? this.nova_senha : this.arrPessoaEditar.senha;

			let arrAlterar = {
				'nm_pessoa' : this.arrPessoaEditar.nm_pessoa,
				'email' : this.arrPessoaEditar.email,
				'fone' : this.arrPessoaEditar.fone,
				'login' : this.arrPessoaEditar.fone.trim(),
				'senha' : 'md5("' + this.nova_senha +'")'
			}

			axios.put(
				'http://localhost:3001/api/pessoa/' + this.arrPessoaEditar.cd_pessoa,
				arrAlterar,
				{headers: { 'content-type' : 'application/json' }}
			)
			.then(() => {
				alert('Alterado com sucesso!');
				this.voltarListagem();
			})
		},
		voltarListagem() {
			this.$router.push('/pessoa');
		}
	},
	mounted() {
		this.carregarPessoa();
	},
	watch: {
		'$route'() {
			this.carregarPessoa();
		}
	},
}
</script>