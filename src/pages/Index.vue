<template>
  <div v-on:mousemove="bgmove($event)" class="fullscreen">
    <el-col :span="20" :offset="2" class="indexhead">
      <el-col :span="4" class="indextoolbox">
        <div @click.prevent="leftmenucollapse" class="tools"><i class="el-icon-menu"></i></div>
        <transition name="slide-fade" appear>
            <div class="indextooltab" v-show="indexmenu">
              <el-menu class="el-menu-demo" active-text-color="#ff416d" @open="handleOpen" @close="handleClose" mode="vertical" :collapse="false" router>
                <template v-for="(leftmenu,index) in $router.options.routes">
                  <el-submenu :index="leftmenu.name" v-if="leftmenu.children">
                      <template slot="title"><i :class="leftmenu.icon"></i><span slot="title">{{leftmenu.name}}</span></template>
                      <el-menu-item v-for="leftmenuchild in leftmenu.children" :index="leftmenuchild.path" :key="leftmenuchild.path"><i :class="leftmenuchild.icon"></i>{{leftmenuchild.name}}</el-menu-item>
                  </el-submenu>
                  <el-menu-item v-if="!leftmenu.children" :index="leftmenu.path"><i :class="leftmenu.icon"></i><span slot="title">{{leftmenu.name}}</span></el-menu-item>
                </template>
              </el-menu>
            </div>
        </transition>
      </el-col>
      <el-col :span="10" class="webaddress">
        hlj.offcn.com
      </el-col>
    </el-col>
    <el-col :span="20" :offset="2" class="main">
      <el-container class="main-con">
        <div class="indexlogo"><span class="iconfont icon-offcn"></span></div>
        <a class="indexbtn">开启精彩内容</a>
        <h1 class="indexh1"><strong class="indexyear">2019</strong>黑龙江中公教育网络平台</h1>
      </el-container>
    </el-col>
    <div class="fullscreenbg" >
      <img ref="fullscreenbgimg" src="@/assets/img/indexbg1.jpg" alt="">
      <!-- <video class="videoBoxVd" width="100%" height="100%" src="http://gcik47gyt746q6nqdze.exp.bcevod.com/mda-iiid8mr5gw917hf0/src/src-mda-iiid8mr5gw917hf0.mp4" autoplay=""></video> -->
    </div>
  </div>
</template>

<script>
export default{
  name: 'Index',
  data: function(){
    return {
      indexmenu:false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    leftmenucollapse:function() {
      this.indexmenu = !this.indexmenu
    },
    bgmove:function($event){
      //console.log($event.clientX + " " + $event.clientY)
      this.$refs.fullscreenbgimg.style.left = '-' + ($event.clientX)/20 + 'px'
      this.$refs.fullscreenbgimg.style.top = '-' + ($event.clientY)/20 + 'px'
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
.indexhead{ margin-top: 30px; position:relative; z-index: 10; }
.indexlogo{ width: 100%; display: flex; text-align: center; justify-content: center; margin-top: 5%; margin-bottom: 10px;   }
.indexlogo span{ font-size: 260px; font-weight: 100; }
.fullscreen{ width: 100%; height: 100%; position: absolute; overflow: hidden; left: 0; top: 0; bottom: 0; background: #fff; }
.fullscreen .main{ display: flex; position: relative; overflow: hidden;
font-family:'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei'; z-index: 2; }
.fullscreen .main .main-con{ flex: 1; padding: 20px; display: block; text-align: center;  }
.indexh1{ font-size: 26px; letter-spacing: 5px; line-height: 40px; margin: 20px; }
.indexyear{ display: block; }

.indexhead .el-menu,.indexhead .el-menu--inline{ background: transparent !important; }
.el-submenu .el-menu{ background: transparent !important; background-color: transparent !important; }
.indexhead .tools{ width: 60px; height: 60px; font-size: 26px; text-align: center; line-height: 60px; color: #333; }
.indexhead .tools:active{ background: #334156; color: #fff; }

.webaddress{  font-size: 24px; font-weight: bold; float: right; line-height: 60px; text-align: right; position: relative; }
.webaddress:after{ width: 80px; height: 1px; background: #000; content: ''; position:absolute; right: 0px; bottom: 0px; }

.indextoolbox{ width: 60px; height: 60px; display: block; position: relative;}
.indextooltab{ width: 200px; position: absolute; top: 60px; left: 0px; z-index: 15; }

.indexbtn{ width: 200px; border: 1px solid #000; line-height: 50px; font-size: 18px; text-align: center; display: inline-block; margin: 5px; cursor: pointer; }
.indexbtn:hover{ background: #000; color: #fff; }
.fullscreenbg{ width: 100%; display: block; position: absolute; top: 0px; bottom: 0px; left: 0px; z-index: 1; opacity: 0.4;}
.fullscreenbg img,.videoBoxVd{ width: 110%; height: 110%; display: block; position: absolute; top: 0px; bottom: 0px; left: 0; z-index: 1;
filter: blur(15px); -webkit-filter: blur(15px); }
</style>
