<template>
	<div>
		<h1>
			Editar - Pessoa {{this.$route.params.cd_pessoa}}
		</h1>

		<div>
			<input 
				type="number"
				v-model="arrPessoaEditar.cd_pessoa" 
				id="cd_pessoa"
				placeholder="Código da pessoa"
			/>
		</div>

		<div>
			<input 
				type="text"
				v-model="arrPessoaEditar.nm_pessoa" 
				id="nm_pessoa"
				placeholder="Nome da pessoa"
			/>
		</div>

		<div>
			<input 
				type="email"
				v-model="arrPessoaEditar.email" 
				id="email"
				placeholder="Email da pessoa"
			/>
		</div>

		<div>
			<input 
				type="Fone"
				v-model="arrPessoaEditar.fone" 
				id="fone"
				placeholder="Fone da pessoa"
			/>
		</div>
		<br/>
		<br/>
		<button @click="putPessoa">Alterar!!</button>
	</div>
</template>

<script>
import axios from 'axios';
import PessoaListar from './PessoaListar'

export default {
	component: {
		PessoaListar
	},
	data() {
		return {
			arrPessoaEditar : {
				cd_pessoa : null,
				nm_pessoa : '',
				fone: '',
				email: ''
			}
		}
	},
	methods: {
		loadPearson () {
			axios.get('http://localhost:3001/api/pessoa/' + this.$route.params.cd_pessoa)
			.then((response) => {			
				this.arrPessoaEditar = response.data['0'];
			})
		},
		putPessoa() {

			let arrAlterar = {
				'nm_pessoa' : this.arrPessoaEditar.nm_pessoa,
				'email' : this.arrPessoaEditar.email,
				'fone' : this.arrPessoaEditar.fone
			}

			axios.put(
				'http://localhost:3001/api/pessoa/' + this.arrPessoaEditar.cd_pessoa,
				arrAlterar,
				{headers: { 'content-type' : 'application/json' }}
			)
			.then(() => {		
				alert('Usuário alterado com sucesso - Agora deve carregar a tabela!');	
				this.PessoaListar.loadPearsons();
				this.loadPearson();
			})	
		}
	},
	mounted() {
		this.loadPearson();
	},
	watch: {
		'$route'() {
			this.loadPearson();
		}
	},
}
</script>