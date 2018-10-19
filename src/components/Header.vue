<template>
  <el-header>
    <el-col :span="4" class="logowidth">
      <div class="logo"><img src="@/assets/img/logo2.png" :alt="headtitle"></div>
    </el-col>
    <!-- <el-col :span="1">
      <div @click.prevent="leftmenucollapse" class="tools"><i class="el-icon-menu"></i></div>
    </el-col> -->
    <!-- <el-col :span="14" :offset="1">
      <el-menu :default-active="activeIndex" background-color="#2b394e" text-color="#fff" active-text-color="#ff416d" class="el-menu-demo" mode="horizontal">
        <el-menu-item :index="index" v-for="(headmenu,index) in headmenus" :key="headmenu.name">{{ headmenu.name }}</el-menu-item>
      </el-menu>
    </el-col> -->
    <el-col :span="4" class="userinfo">
      <!-- 未登录 -->
      <!-- <el-button size="medium" type="danger">登录</el-button> -->
      <!-- 已登录 -->
      <el-dropdown>
        <span class="el-dropdown-link userinfo-con">
          <img src="@/assets/img/logo2.png" :alt="headtitle">XXX
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  data: function () {
    return {
      headtitle: '黑龙江中公教育',
      activeIndex: '1',
      headmenus: [
        {'name': '公告查询'},
        {'name': '面授课程'},
        {'name': '网校课程'},
        {'name': '直播课'},
        {'name': '考试大军'}
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.el-header{ background: #2b394e; padding: 0px; line-height: 60px; }
.el-header .logowidth{ width: 220px; }
.logo{ width: 100%; display: block; height:60px; padding: 13px 5px; position: relative; text-align: left; box-sizing: border-box;
border-right-width: 1px; border-color: hsla(62,77%,76%,.3); border-right-style: solid; }
.logo img{ height: 100%; display: inline-block; }
.el-header .el-menu{ background: transparent; }
.el-header .tools{ width: 60px; height: 60px; font-size: 20px; text-align: center; line-height: 60px; color: #fff; }
.el-header .tools:active{ background: #334156; }
.el-header .userinfo{ height: 60px; padding: 0 15px 0 0; color: #fff; text-align: right; float: right; }
.el-header .userinfo .el-dropdown{ display: inline-block; position: relative; }
.userinfo-con{ width: 100%; cursor: pointer; color: #fff; text-align: right; }
.userinfo-con img{ width: 40px; height: 40px; border-radius: 50%; margin: 10px; float: right; }
</style>
