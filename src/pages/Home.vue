<template>
  <el-row class="fullscreen">
    <Header></Header>
    <el-col :span="20" :offset="2" class="main">
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
    <!-- <LeftMenu></LeftMenu> -->
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
.fullscreen{ width: 100%; min-width: 1100px; position: relative; }
.fullscreen .main{ display: flex; position: relative; overflow: hidden; }
.fullscreen .main .main-con{ flex: 1; padding: 20px; display: block;  }
.breadcrumb-container{ margin-bottom: 20px; }
.breadcrumb-container .title{ width: 100%; font-size: 18px; line-height: 40px; text-align: left; float: left; color: #ff416d; }
</style>
