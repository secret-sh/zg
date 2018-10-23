<template>
	<el-scrollbar style="height:100%">
		<div id="app">
			<router-view/>
		</div>
	</el-scrollbar>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{ margin: 0; padding: 0; }
html,body{ height: 100%; margin: 0; padding: 0; background: #f4f5ff; }
ul,li{ list-style-type: none; padding: 0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-scrollbar__wrap{ overflow-x: hidden;  }
.el-table-filter__wrap{ margin-bottom: 0px !important; }
.contitle{ width: 100%; display: block; line-height: 50px; font-size: 20px; font-weight: bold; text-align: left; }
</style>
