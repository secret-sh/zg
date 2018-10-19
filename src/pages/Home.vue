<template>
  <el-row class="fullscreen">
    <Header></Header>
    <el-col :span="24" class="main">
      <LeftMenu></LeftMenu>
      <el-container class="main-con">

        <el-col :span="24" class="breadcrumb-container">
          <strong class="title">{{$route.name}}</strong>
          <el-breadcrumb separator="/" separator-class="el-icon-arrow-right" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>

      </el-container>
    </el-col>
  </el-row>
</template>

<script>
import Header from '@/components/Header'
import LeftMenu from '@/components/LeftMenu'

export default{
  name: 'Home',
  components: {
    Header, LeftMenu
  }
}
</script>

<style scoped>
.fullscreen{ width: 100%; position: absolute; top: 0px; bottom: 0px; }
.fullscreen .main{ display: flex; position: absolute; top: 60px; bottom: 0px; overflow: hidden; }
.fullscreen .main .main-con{ flex: 1; overflow-y: scroll; padding: 20px; display: block;  }
.breadcrumb-container .title{ width: 100%; font-size: 18px; line-height: 40px; text-align: left; float: left; color: #ff416d; }
</style>
