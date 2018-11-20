<template>
		<div id="app">
			<router-view/>
		</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{ margin: 0; padding: 0;}
html,body{ height: 100%; margin: 0; padding: 0; background: #f1f6f9; }
ul,li{ list-style-type: none; padding: 0;}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.hiddenX .el-scrollbar__wrap{ overflow-x: hidden !important; }
.hiddenY .el-scrollbar__wrap{ overflow-x: hidden !important; }
.hiddenALL .el-scrollbar__wrap{ overflow: hidden !important; }
.scrollmb0{ margin-bottom: 0px !important;  }
.el-table-filter__wrap{ margin-bottom: 0px !important; overflow-x:hidden; }
.contitle{ width: 100%; display: block; line-height: 50px; font-size: 20px; font-weight: bold; text-align: left; }
.el-menu{ border-right:none; }
.el-menu--vertical{ background: #fff; }
.msbox .el-tabs__content{ overflow: visible; }
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
.fadein-enter-active,.fadein-leave-active{
    opacity: 1;
    transition:opacity .7s;
    -webkit-transition:opacity .7s;
  }
.fadein-enter,.fadein-leave {
    opacity: 0;
    transition:opacity .7s;
    -webkit-transition:opacity .7s;
}

.slide-right-enter {
    transform: translateX(-100%);
}
.slide-left-enter {
    transform: translateX(100%);
}
.slide-top-enter {
    transform: translateY(100%);
}

/*主色调颜色修改*/
.el-button--primary{ background-color: #2c5df4; border-color: #2c5df4; }
.el-button--danger{ background-color: #f42c56; border-color: #f42c56; }
.el-button--success{ background-color: #00c9af; border-color: #00c9af; }
.el-button--warning{ background-color: #f5af09; border-color: #f5af09; }

.el-tabs__item:hover{ color: #2c5df4; }
.el-tabs__item.is-active{ color: #2c5df4; }
.el-tabs__active-bar{ background-color: #2c5df4; }

</style>
