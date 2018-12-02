// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './assets/axios'
import './assets/font/iconfont.css'	//引入自定义图标样式
import VCharts from 'v-charts' //引入图表
import VueAMap from 'vue-amap'; //引入高德地图

Vue.use(VCharts)
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '20ec544268cc790a81b520241a710555',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11' // 版本号
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
