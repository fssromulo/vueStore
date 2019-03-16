<template>
	<div>
		<br/>
		<div class="row">
			<button class="btn btn-success" @click="carregarPessoas">
				Carregar lista
			</button> &nbsp;
			<router-link 
				:to="{name: 'pessoaCad'}" 
				tag="button" 
				class="btn btn-success"
				exact
			>Cadastrar nova pessoa</router-link>&nbsp;&nbsp;

		</div>

		<br/><br/>
		<div class="table-responsive">
			<table class="table table-striped">
				<thead>
					<tr>
						<th>Código:</th>
						<th>Nome:</th>
						<th>Fone:</th>
						<th>E-mail:</th>
						<th>Login:</th>
						<th>Ações:</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(pessoa, chave) in arrPessoas" :key="chave">
						<td>{{pessoa.cd_pessoa}}</td>
						<td>{{pessoa.nm_pessoa}}</td>
						<td>{{pessoa.fone}}</td>
						<td>{{pessoa.login}}</td>
						<td>{{pessoa.email}}</td>
						<td>
							<router-link :to="{name: 'pessoaEdit', params:{cd_pessoa: pessoa.cd_pessoa}}" tag="a" exact>Editar</router-link>&nbsp;&nbsp;
							<button class="btn btn-danger" @click="apagarPessoa(pessoa.cd_pessoa)">Apagar</button>
							<!-- <button class="btn btn-danger" @click="getLogin(pessoa.login, pessoa.senha)">Logar</button> -->
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<router-view></router-view>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "AppNovo",
	data() {
		return {
			arrPessoas : []
		}
	},
	methods: {
		carregarPessoas() {
			axios.get('http://localhost:3001/api/pessoa')
			.then((response) => {
				this.arrPessoas = response.data;
			})
		},
		apagarPessoa(cd_pessoa_param) {
			axios.delete('http://localhost:3001/api/pessoa/' + cd_pessoa_param )
			.then(() => {
				this.carregarPessoas();
			})
		}
	},
	mounted() {
		this.carregarPessoas();
	}
}
</script>