import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 页面组件
//默认首页
import Index from '@/pages/Index'

//内容查询
import Home from '@/pages/Home/Home'
import ggsearch from '@/pages/Home/ggsearch'
import mscourse from '@/pages/Home/mscourse'
import wxcourse from '@/pages/Home/wxcourse'
import livecourse from '@/pages/Home/livecourse'
import examgroup from '@/pages/Home/examgroup'

//个人信息
import userinfo from '@/pages/User/userinfo'

Vue.use(Router)
Vue.use(ElementUI)
export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      icon: 'el-icon-star-off',
      component: Index
    },
    {
      path: '/Home/ggsearch/',
      name: '热门平台',
      icon: 'el-icon-search',
      component: Home,
      children: [
        {
          name: '公告查询',
          icon: 'el-icon-news',
          component: ggsearch,
          path: '/Home/ggsearch/'
        },
        {
          name: '面授课程',
          icon: 'el-icon-edit',
          component: mscourse,
          path: '/Home/mscourse/'
        },
        {
          name: '网校课程',
          icon: 'el-icon-document',
          component: wxcourse,
          path: '/Home/wxcourse/'
        },
        {
          name: '直播课',
          icon: 'el-icon-view',
          component: livecourse,
          path: '/Home/livecourse/'
        },
        {
          name: '考试大军',
          icon: 'el-icon-location',
          component: examgroup,
          path: '/Home/examgroup/'
        }
      ]
    },
    {
      path: '/User/',
      name: '个人信息',
      icon: 'el-icon-info',
      component: userinfo
    }
    
  ]
})
