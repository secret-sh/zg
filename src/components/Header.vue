<template>
  <el-header>
    <el-row>
      <el-col :span="4" class="logowidth">
        <div class="logo"><img src="@/assets/img/logo.png" :alt="headtitle"></div>
      </el-col>
      <!-- <el-col :span="1">
        <div @click.prevent="leftmenucollapse" class="tools"><i class="el-icon-menu"></i></div>
      </el-col> -->
      <!-- <el-col :span="10" :offset="1">
        <el-menu class="el-menu-demo" active-text-color="#ff416d" @open="handleOpen" @close="handleClose" mode="horizontal" router>
          <template v-for="(leftmenu,index) in $router.options.routes">
            <el-submenu :index="leftmenu.name" v-if="leftmenu.children">
                <template slot="title"><span slot="title">{{leftmenu.name}}</span></template>
                <el-menu-item v-for="leftmenuchild in leftmenu.children" :index="leftmenuchild.path" :key="leftmenuchild.path"><i :class="leftmenuchild.icon"></i>{{leftmenuchild.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="!leftmenu.children" :index="leftmenu.path"><span slot="title">{{leftmenu.name}}</span></el-menu-item>
          </template>
        </el-menu>
      </el-col> -->
      <el-col :span="4" class="userinfo">
        <!-- 未登录 -->
        <!-- <el-button size="medium" type="danger">登录</el-button> -->
        <!-- 已登录 -->
        <el-dropdown>
          <span class="el-dropdown-link userinfo-con">
            <img src="@/assets/img/logo.png" :alt="headtitle">XXX
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
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  data: function () {
    return {
      headtitle: '黑龙江中公教育',
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed:{
    // onRoutes() {
    //   return this.$router.path.push('/', '');
    // }
  }
}
</script>

<style scoped>
.el-header{ padding: 0px 10px; line-height: 60px; background: rgba(255,255,255,1); box-shadow: 0px 5px 20px #d5e8ff; z-index: 10; position: relative;}
.el-header .logowidth{ width: 190px; }
.logo{ width: 100%; display: block; height:60px; padding: 13px 5px; position: relative; text-align: left; box-sizing: border-box;
border-right-width: 1px; border-color: hsla(62,77%,76%,.3); border-right-style: solid; }
.logo img{ height: 100%; display: inline-block; }
.el-header .el-menu{ background: transparent; }
.el-header .el-menu .el-submenu .el-submenu__title span,.el-header .el-menu .el-menu-item span{ font-size: 15px; }
.el-header .tools{ width: 60px; height: 60px; font-size: 20px; text-align: center; line-height: 60px; color: #333; }
.el-header .tools:active{ background: #334156; }
.el-header .userinfo{ height: 60px; padding: 0 15px 0 0; color: #333; text-align: right; float: right; }
.el-header .userinfo .el-dropdown{ display: inline-block; position: relative; }
.userinfo-con{ width: 100%; cursor: pointer; color: #333; text-align: right; }
.userinfo-con img{ width: 40px; height: 40px; border-radius: 50%; margin: 10px; float: right; }
</style>
