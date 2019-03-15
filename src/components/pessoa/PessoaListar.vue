<template>
	<div class="hello">
		<h1>{{ varTeste }}</h1>
		<br/>
		<button @click="loadPearsons">
			Carregar lista
		</button>
		
		<br/>
		<br/>

		<table border="1">
			<thead>
				<tr>
					<th>Código:</th>
					<th>Nome:</th>
					<th>Fone:</th>
					<th>E-mail:</th>
					<th>Ações:</th>
				</tr>
			</thead>
			<tbody>	
				<tr v-for="(pessoa, chave) in arrPessoas" :key="chave">
					<td>{{pessoa.cd_pessoa}}</td>
					<td>{{pessoa.nm_pessoa}}</td>
					<td>{{pessoa.fone}}</td>
					<td>{{pessoa.email}}</td>
					<td>
						<router-link :to="{name: 'pessoaEdit', params:{cd_pessoa: pessoa.cd_pessoa}}" tag="a" exact>Editar</router-link>&nbsp;&nbsp;
						<a :href="'pessoa/apagar/' + pessoa.cd_pessoa">Apagar</a>					
					</td>
				</tr>
			</tbody>							
		</table>

		<router-view></router-view>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "AppNovo",
	data() {
		return {
			varTeste : 'Vue store!!!',
			arrPessoas : []
		}
	},
	methods: {
		loadPearsons () {
			axios.get('http://localhost:3001/api/pessoa')
			.then((response) => {			
				this.arrPessoas = response.data;
			})
		}
	}
}
</script>