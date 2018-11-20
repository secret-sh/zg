<template>
  <div class="ggbox">
    <!-- 公告查询 -->
    <el-card class="ggsearchrow" shadow="hover">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
      </div>
      <div class="text item">
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-form-item label="发布日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-select v-model="form.region" placeholder="请选择项目类型">
              <el-option v-for="fmregion in formdefaultdata.region" :key="fmregion" :label="fmregion" :value="fmregion"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地市">
            <template>
            <el-select v-model="form.city" placeholder="请选择地市">
              <el-option v-for="fmcity in formdefaultdata.city" :key="fmcity" :label="fmcity" :value="fmcity"></el-option>
            </el-select>
            </template>
          </el-form-item>
          <!-- <el-form-item label="公告名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="招聘人数" prop='peoplenum' :rules="[ {type:'number',message:'招聘人数必须为数字值'}]">
            <el-input type='peoplenum' v-model.number="form.peoplenum"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button @click.prevent="ggsearch()" type="primary">立即查询</el-button>
            <el-button @click="resetform()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="fullscreenbg">
        <img ref="fullscreenbgimg" src="@/assets/img/bg3.jpg" alt="">
      </div>
    </el-card>
    <!-- 查询结果 -->
    <transition name="slide-fade" appear>
      <div class="gglist" v-if="zgggsearchresult.length>0">
        <zgggsearchresult :seachresult="zgggsearchresult"></zgggsearchresult>
      </div>
    </transition>
    <!-- 公告列表 -->
    <div class="gglist">
      <zgallgglist v-on:allggdate="allggdateFun"></zgallgglist>
    </div>
  </div>
</template>
<script>
import zgallgglist from '@/pages/Home/Ggsearch/zgallgglist'
import zgggsearchresult from '@/pages/Home/Ggsearch/zgggsearchresult'
export default {
  name: 'ggsearch',
  data() {
    return {
      zgallgglist:[],
      form: {
        region: '',
        name: '',
        date: '',
        city: '',
        peoplenum: ''
      },
      formdefaultdata:{
        region:['黑龙江公务员','国家公务员','事业单位','银行招聘','教师招聘','教师资格','医疗卫生','农信社','公选/遴选','社区工作者','三支一扶','招警','考研','军转干/军队文职','会计取证','选调生','国企招聘','辅警'],
        city:['黑龙江','哈尔滨','齐齐哈尔','牡丹江','佳木斯','大庆','鸡西','双鸭山','伊春','七台河','鹤岗','黑河','绥化','大兴安岭'],
      },
      zgggsearchresult:[]
    }
  },
  components: {
    zgallgglist, zgggsearchresult
  },
  methods: {
    ggsearch:function(){
      var ggthis = this
      const ggregion = ggthis.form.region
      const ggcity = ggthis.form.city
      const ggdate = ggthis.form.date
      //ggthis.zgggsearchresult = []
      if (ggregion !== '' || ggcity !== '' || ggdate !== '') {
          const ggloading =   ggthis.$loading({
            lock: true,
            text: '正在查询...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          });
          setTimeout(function(){
            ggthis.zgggsearchresult = ggthis.zgallgglist.filter(function(element) { 
              return element.date == ggdate || element.classfy == ggregion || element.city == ggcity
            });
            ggloading.close();
            if (ggthis.zgggsearchresult.length === 0) {
              ggthis.$alert('没有查到任何数据', '提示', {
                confirmButtonText: '确定'
              }); 
              ggthis.zgggsearchresult =  []
            }
            //console.log(ggthis.zgggsearchresult)
          },1500);
      }else{
         ggthis.$notify({
          type:'error',
          title:'提示',
          message:'未选择任何搜索条件',
          duration:1500
        })
      }
    },
    allggdateFun:function(data){
      this.zgallgglist = data
    },
    resetform:function(formName){
      for (const a in this.form) {
        this.form[a] = ''
      }
      this.zgggsearchresult =  ''
    }
  }
}
</script>

<style>
.ggbox{ width: 100%; }
.ggsearchrow{position: relative; z-index: 4;}
.el-card__header{ font-weight: bold; font-size: 17px; }
.fullscreenbg{ width: 100%; display: block; position: absolute; top: 0px; bottom: 0px; left: 0px; z-index: -1; }
.fullscreenbg img{ width: 100%; height: 100%; display: block; position: absolute; top: 0px; bottom: 0px; left: 0; z-index: -1;
filter: blur(15px); -webkit-filter: blur(15px); opacity: 0.8; }
.ggsearchrow{ margin-bottom: 20px; }
.gglist{ margin:0px 0px 20px; }
</style>
