<template>
  <el-aside class="leftmenu">
    <el-scrollbar class="hiddenX" style="height:100%">
      <el-menu :default-active="$route.path" background-color="transparent" text-color="#333" active-text-color="#ff416d" @open="handleOpen" @close="handleClose" :collapse="isCollapse" unique-opened mode="vertical" router>
          <el-row class="leftmenutoolbox">
            <div @click.prevent="leftmenucollapse" class="tools"><i class="el-icon-menu"></i></div>
          </el-row>
          <template v-for="(leftmenu,index) in $router.options.routes">
            <el-submenu :index="leftmenu.name" v-if="leftmenu.children">
                <template slot="title"><i :class="leftmenu.icon"></i><span slot="title">{{leftmenu.name}}</span></template>
                <el-menu-item v-for="leftmenuchild in leftmenu.children" :index="leftmenuchild.path" :key="leftmenuchild.path"><i :class="leftmenuchild.icon"></i>{{leftmenuchild.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="!leftmenu.children" :index="leftmenu.path"><i :class="leftmenu.icon"></i><span slot="title">{{leftmenu.name}}</span></el-menu-item>
          </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
export default {
  name: 'LeftMenu',
  data: function () {
    return {
      activeIndex: '',
      isCollapse: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    leftmenucollapse:function(){
      this.isCollapse = !this.isCollapse
    }
  },
  computed:{
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  }
}
</script>

<style scoped>
.leftmenu{ width:auto !important; display: flex; background: #fff; }
.leftmenu .el-menu:not(.el-menu--collapse) { width: 200px; flex: 0 0 200px; }
.leftmenu .el-menu .el-menu-item.is-active{ background-color: #eee !important; }
.leftmenutoolbox{ width: 100%; display: block; padding: 0px 0px; }
.leftmenutoolbox .tools{ width: 60px; height: 60px; font-size: 20px; text-align: center; line-height: 60px; color: #333; }

</style>
