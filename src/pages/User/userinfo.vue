<template>
	<el-row>
        <el-col :span="24" class="breadcrumb-container">
          <strong class="title">{{$route.name}}</strong>
          <el-breadcrumb separator="/" separator-class="el-icon-arrow-right" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <h1>userinfo</h1>
	</el-row>
</template>

<script>
export default {
  name: 'userinfo',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
