<template>
	<div id="app" class="container-fluid">
    <div class="col-md-8 col-md-offset-2">
      <br/>
		<app-login></app-login>
      <br/>
      <app-header></app-header>
      <br/>
      <router-view></router-view>
    </div>
	</div>
</template>

<script>
import Header from './components/Header.vue'
import Login from './components/login/Login.vue'

export default {
	components: {
		appHeader: Header,
		appLogin : Login
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
