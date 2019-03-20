<template>
    <div>
        <ul class="nav nav-pills">
        <router-link
		  		active-class="active"
				v-if="!isAuth"  
				:to="{name: 'login', query:{ action:'signup'}}" tag="li" exact><a>Sign Up</a></router-link>&nbsp;&nbsp;
        <router-link
		  		active-class="active"
				v-if="!isAuth"  
				:to="{name: 'login', query:{ action:'login'}}" tag="li" exact><a>Login</a></router-link>&nbsp;&nbsp;
        <router-link
		  		active-class="active"
				v-if="isAuth"  
				:to="{name: 'pessoaList'}" tag="li" exact><a>Gerenciar pessoas</a></router-link>&nbsp;&nbsp;
        <li
		  		active-class="active"
				v-if="isAuth"  
				@click="teste"><a>Sair</a></li>&nbsp;&nbsp;
        </ul>
    </div>
</template>

<script>
export default {
	computed: {
		isAuth() {
			return this.$store.getters.isAuthenticated
		}
	},
	methods: {
		teste ()  {
			this.$store.dispatch('logout');
		}
	},	
}
</script>