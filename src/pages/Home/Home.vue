<template>
  <el-row class="fullscreen">
    <Header></Header>
    
    <el-col class="main">
      <LeftMenu></LeftMenu>

      <el-container class="main-con">
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
import Footer from '@/components/Footer'
import zghktj from '@/pages/Public/zghktj'

export default{
  name: 'Home',
  components: {
    Header, LeftMenu, Footer, zghktj
  }
}
</script>

<style scoped>
.fullscreen{ width: 100%; height: 100%; position: absolute; overflow: hidden; left: 0; top: 0; bottom: 30px;}
.fullscreen .main{ height: 100%; display: flex; position: relative; overflow: hidden; }
.fullscreen .main .main-con{ flex: 1; padding: 20px; display: block;  }
.breadcrumb-container{ margin-bottom: 20px; }
.breadcrumb-container .title{ width: 100%; font-size: 18px; line-height: 40px; text-align: left; float: left; color: #ff416d; }

.hometop{ width: 100%; color: #fff; background: -webkit-linear-gradient(left top,#ff845e,#ff3d5d); padding: 20px 0px 0px; }
</style>
