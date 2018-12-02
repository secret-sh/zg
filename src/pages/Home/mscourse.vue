<template>
	<div class="msbox">
    <!-- 项目介绍及课程活动 -->
		<el-row :span="24" class="mskchead clearfix">
			<div class="mskctp" v-for="(mskcli,index) in mskclists" :key="index" :class="{mskctpfull:fullcontrl==index}" @click.stop="mskcfullscreen(index)">
        <transition name="slide-top">
          <span class="el-icon-close" v-if="fullcontrl==index" @click.stop="mskcfullclose(index)"></span>
        </transition>
				<i><img :src="mskcli.imgsrc" alt=""></i>
				<h3>{{mskcli.kcleibie}}</h3>
				<h5>{{mskcli.kcmsgf}}<el-rate v-if="fullcontrl==index" v-model="mskcli.kcstar" score-template="{value}" text-color="#ff9900" show-score disabled></el-rate></h5>
        <transition name="slide-left">
          <div class="kcchildbox" v-if="fullcontrl==index">
            <template v-if="mskcli.kcchild">
              <el-tabs>
                <el-tab-pane v-for="(mskcsubli,index) in mskcli.kcchild" :key="index" :label="mskcsubli.kname">
                  <div class="kcsubcontent" v-html="mskcsubli.kintro"></div>
                  <a :href="mskcsubli.knamebtn.knamebtnhref" class="el-button el-button--success is-round">{{mskcsubli.knamebtn.knamebtntxt}}</a>
                  <!-- 活动推荐开始 -->
                  <div class="kcchildbox mshdtjbox" v-if="mskcsubli.khdlist">
                    <el-card class="mscon" shadow="never">
                      <div slot="header" class="clearfix">
                        <span>活动推荐</span>
                      </div>
                      <div class="text item">
                        <div class="mskclistbx">
                          <el-card ref="mskccard" :body-style="{ padding: '0px' }" shadow="hover" v-for="(mskchd,index) in mskcsubli.khdlist" :key="index">
                            <a class="image" :href="mskchd.knamesubhref"><img :src="mskchd.knamesubimg"></a>
                            <div class="cardfoot">
                              <h4>{{ mskchd.knamesubtitle }}</h4>
                              <div class="bottom clearfix">
                                <span class="classfy">{{mskcsubli.kname}}</span>
                                
                              </div>
                            </div>
                          </el-card>
                        </div>
                      </div>
                    </el-card>
                  </div>
                  <!-- 活动推荐结束 -->
                </el-tab-pane>
              </el-tabs>
            </template>
          </div>
        </transition>
        
			</div>
		</el-row>
    
    <el-row :span="24" class="mskcbody clearfix">
      <el-col :span="16">
        <el-card class="khead" shadow="never">
          <div slot="header" class="clearfix">
            <h3 class="contitle">历年考试招录情况一览</h3>
          </div>
          <div class="text item">
            <template>
              <VLine v-if="vchartline" :data="kslnkq" width="100%" :settings="peoChartSet"></VLine>
            </template>
          </div>
        </el-card>
      </el-col>

      <el-col :span="7" :offset="1">
        <el-card class="khead" shadow="never">
          <div slot="header" class="clearfix">
            <h3 class="contitle">2018黑龙江省考各系统招录人数</h3>
          </div>
          <div class="text item">
            <template>
              <VPie v-if="vchartpie" :data="hljgwyfl"></VPie>
            </template>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :span="24" class="mskcbody clearfix">
      <el-card class="khead" shadow="never">
        <div slot="header" class="clearfix">
          <h3 class="contitle">寻找附近上课地点</h3>
        </div>
        <div class="text item">
          <el-row :span="24" class="mc">
            <el-col :span="5">
              <div style="height: 340px;">
                <el-steps direction="vertical" :active="xkactive">
                  <el-step title="查找附近中公教育" description="黑龙江46家分部任你挑选"></el-step>
                  <el-step title="预约到店" description="方便快捷 不走弯路"></el-step>
                  <el-step title="签约上课" description="签订协议 真材实料"></el-step>
                </el-steps>
              </div>
            </el-col>
            <el-col :span="18" :offset="1">
              <template>
                <el-amap vid="msamap" :center="msmapconfig.center" :zoom="msmapconfig.zoom" class="msamap">
                  <el-amap-info-window
                    :position="msmapconfig.txtintro.position"
                    :content="msmapconfig.txtintro.content"
                    :visible="msmapconfig.txtintro.visible"
                    :events="msmapconfig.txtintro.events">
                  </el-amap-info-window>
                </el-amap>
              </template>
            </el-col>
          </el-row>
          <el-row :span="24" class="mc">
            <el-col :span="12" v-if="xkactive === 0">
              <el-button type="primary" @click="getzgHLJ()">开始查找</el-button>
            </el-col>
            <el-col :span="12" v-if="xkactive === 1">
              <div class="subtitle">您当前所在的位置: <strong>{{cityselectval}}</strong></div>
              <template>
                <el-select class="cityselect" v-model="cityselectval" @change="cityselecthandle()" placeholder="请选择" clearable>
                  <el-option v-for="(hljzgadd,index) in hljzgaddress" :key="index" :label="hljzgadd.city" :value="hljzgadd.city"></el-option>
                </el-select>
              </template>
            </el-col>
            <el-col :span="24" class="mc" v-if="xkactive === 2">
              <el-card class="khead" shadow="never">
                <div slot="header" class="clearfix">
                  <h3 class="contitle">中公教育黑龙江分部详细信息</h3>
                </div>
                <div class="text item">
                  <template>
                    <el-tabs v-model="cityselectval" type="card">
                      <el-tab-pane class="el-row" v-for="(hljzgadd,index) in hljzgaddress" :key="index" :name="hljzgadd.city" :label="hljzgadd.city">
                        <dl v-for="(hljzgal,index) in hljzgadd.citychilds" class="el-col-11 hljzglist">
                          <dt>{{hljzgal.title}}</dt>
                          <dd><i class="el-icon-location icon-address"></i>{{hljzgal.address}}</dd>
                          <dd><i class="el-icon-phone icon-tel"></i>{{hljzgal.tel}}</dd>
                          <el-button type="warning" @click="hljcityyy(index,hljzgal.title,hljzgal.poicenter)" size="small">预约到店</el-button>
                        </dl>
                      </el-tab-pane>
                    </el-tabs>
                  </template>
                </div>
              </el-card>
            </el-col>
            <el-col :span="16" :offset="4" class="mc" v-if="xkactive === 3">
              <h3 class="msstep3title">★ 请如实填写个人信息到店上课 ★</h3>
              <el-form ref="msform" :model="msyyform" label-width="80px" width="100%">
                <el-form-item label="分部名称"
                  :rules="{ required: true, message: '请输入分部名称', trigger: 'blur' }"
                >
                  <el-input v-model="msyyform.zgfb" placeholder="请输入分部名称" disabled></el-input>
                  <el-tooltip class="item" effect="dark" content="重新选择上课地点" placement="top-start">
                    <i class="el-icon-refresh zgfbrefresh" @click="refreshzgfb()"></i>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="学员姓名"
                  :rules="{ required: true, message: '请输入学员姓名', trigger: 'blur' }"
                ><el-input v-model="msyyform.name" placeholder="请输入学员姓名" clearable></el-input></el-form-item>
                <el-form-item label="手机号码"
                  :rules="[
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { type: 'tel', message: '请输入正确的手机号码', trigger: ['blur', 'change'] }
                  ]"
                ><el-input v-model="msyyform.tel" placeholder="请输入手机号码" clearable></el-input>
                </el-form-item>
                <el-form-item label="到店时间"
                  :rules="{ required: true, message: '请选择到店时间', trigger: 'blur' }"
                >
                  <el-date-picker type="datetime" placeholder="选择日期时间" v-model="msyyform.time" default-time="12:00:00"></el-date-picker>
                </el-form-item>
                <el-form-item label="上课时间"
                  :rules="{ required: true, message: '请选择上课时间', trigger: 'blur' }"
                >
                  <el-radio-group v-model="msyyform.sksj">
                    <el-radio label="任意时间均可"></el-radio>
                    <el-radio label="只能周一至周五上课"></el-radio>
                    <el-radio label="只能周六、日上课"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item style="text-align: center;">
                  <el-button @click="submitmsform('msform')" type="primary">OK 提交</el-button>
                  <el-button @click="resetmsform('msform')">取消</el-button>
                </el-form-item>
              </el-form>
            </el-col>

          </el-row>
          
        </div>
      </el-card>
    </el-row>

    
	
	</div>
</template>

<script>
import zghktj from '@/pages/Public/zghktj'
import VLine from 'v-charts/lib/line.common'
import VPie from 'v-charts/lib/pie.common'
export default{
  name: 'mscourse',
  data() {
    this.peoChartSet = {
      yAxisType: ['人'],
      yAxisName: ['人数'],
      area: true
    }
    return {
    	mskclists:[],  // 面授课程列表
      kslnkq:{},  //历年考情
      hljgwyfl:{},
      hljzgaddress:null,
      youraddress:null,
    	fullcontrl:-1,
      vchartline:false,
      vchartpie:false,
      zgpfstar:5, //类别详情打分
      xkactive:0, //选课步骤进度
      cityselectval:'请选择',
      msyyform:{
        zgfb:'',
        name: '',
        tel:'',
        time:'',
        sksj:''  
      },
      msmapconfig:{
        zoom: 18,
        center: [126.616862,45.733828],
        txtintro:{
          position: [126.616862,45.733828],
          content: '黑龙江中公教育',
          visible: true,
          events: {
            close() {
              console.log('地图标记关闭');
            }
          }
        }
      }
    }
  },
  mounted: function(){
  	this.getMskc()
    this.getLnkq()
    this.gethljgwyfl()
  },
  methods: {
  	getMskc: function(argument) {  //获取面授课程数据
  		var that = this
  		that.$axios.get('./static/json/mskc.json')
  		.then(function(response){
  			that.mskclists = response.data
  		})
  		.catch(function(error){
  			console.log("课程列表请求错误" + error);
  		})
  	},
    getLnkq:function(){ //获取历年考试招录情况一览数据
      var that = this
      that.$axios.get('./static/json/datalqkn.json')
      .then(function(response){
        that.kslnkq = response.data
        that.vchartline = true
      })
      .catch(function(error){
          console.log("获取历年考情数据失败" + error);
      })
    },
    gethljgwyfl:function(){ //获取2018黑龙江省考招录数据
      var that = this
      that.$axios.get('./static/json/datahljgwyfl.json')
      .then(function(response){
        that.hljgwyfl = response.data
        that.vchartpie = true
      })
      .catch(function(error){
          console.log("获取2018黑龙江省考各系统招录人数失败" + error);
      })
    },
    getzgHLJ:function(){  //获取黑龙江中公信息
      var that = this
      that.$axios.get('./static/json/zgaddress.json')
      .then(function(response){
        that.hljzgaddress = response.data
        that.msmapconfig.zoom = 6;
        that.xkactive = 1;
      })
      .catch(function(error){
          console.log("获取获取黑龙江中公信息失败" + error);
      })
    },
    cityselecthandle:function($event){  //第二部下拉框选择处理
      this.xkactive = 2;
    },
    hljcityyy:function(index,hljzgaltt,hljzgalpoicenter){ //地市分部预约开始
      this.xkactive = 3;
      var that = this
      that.msyyform.zgfb = hljzgaltt
      that.msmapconfig = {
        zoom: 18,
        center:hljzgalpoicenter,
        txtintro:{
          position: hljzgalpoicenter,
          content: hljzgaltt,
          visible: true,
          events: {
            close() {
              console.log('地图标记关闭');
            }
          }
        }
      }
    },
    refreshzgfb:function(){
      this.xkactive = 2;
    },
    submitmsform:function(formName){ //表单提交
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetmsform:function(formName){ //表单重置
      this.$refs[formName].resetFields();
    },
  	mskcfullscreen:function(event){
  		this.fullcontrl = event
  	},
    mskcfullclose:function(e){
      this.fullcontrl = -1
    }
  },
  components:{
  	zghktj,VLine,VPie
  }
}
</script>

<style scoped>
.mshdtjbox .mscon{ width: 100%; margin-top: 30px; margin-left: -20px; }

.mskclistbx{ width: 100%; display: flex; flex-wrap: wrap; justify-content: flex-start; }
.mskclistbx .el-card{ width: 270px; margin: 7px; height: auto; display:block; }
.mskclistbx .image{ width: 100%; display: block; overflow: hidden; }
.mskclistbx .image img{ width: 100%; height: 150px; display: block; }
.mskclistbx .image img:hover{ opacity: 0.6 }

.mskclistbx .bottom{ font-weight: normal; line-height:26px; }
.mskclistbx .cardfoot{ padding: 8px; font-size: 15px; font-weight: normal; line-height: 24px; }
.mskclistbx .cardfoot h4{ width: 100%; line-height: 30px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: normal; }
.mskclistbx .classfy{ font-size: 13px; color: #999; }
.mskclistbx .classfy i{ margin-right: 5px; }
.mskclistbx .cardfoot .button{ float: right; margin: 6px 0px 6px 5px; }

.mskchead{ width: 100%; display: flex; flex-wrap: wrap; justify-content: space-between; margin-bottom: 30px; }
.mskchead .mskctp .el-icon-close{ font-size: 22px; position: absolute; top: 20px; right: 20px; }
.mskchead .mskctp *{ transition: 1s all; }
.mskctp{ width: 150px; background: #fff; border-radius: 10px; overflow: hidden; padding: 1% 0px; box-sizing: border-box; text-align: center; margin: 5px; cursor: pointer; order: 1; flex-grow: 1; position: relative; }
.mskctp i{ width:140px; display: block; margin: 0 auto; }
.mskctp i img{ width: 100%; display: block; }
.mskctp h3{ font-size: 20px; color: #555; line-height: 36px; margin-top: 15px; }
.mskctp h5{ font-size: 14px; color: #999; line-height: 30px; font-weight: normal; }
.mskctp:hover i img{ transform: scale(1.1); }
.mskchead .mskctp .kcchildbox,.mskchead .mskctp .el-icon-close{ transition: 0s all; }
.kcchildbox .el-button{ margin: 10px; text-decoration: none; }

.mskctpfull{ min-width: 100%; margin: 10px 0px; order: 2; flex-grow: 6; text-align: left; padding-left: 60px; }
.mskctpfull i{ width: 300px; float: right; margin: 100px 20px 20px 50px;  }
.mskctpfull h3{ margin: 30px 0px 5px; font-size: 34px; line-height: 50px; color: #2c5df4; }
.mskctpfull h5{ margin-bottom: 30px; }
.mskctpfull p{ color: #444; font-size: 17px; line-height: 30px; }
.kcsubcontent{ color: #444; font-size: 14px; line-height: 26px;  }
.mskchead .mskctp.mskctpfull *{ transition: 1s all; }

.mskcbody{ width: 100%; display: block; margin-bottom: 30px; }
.mc{ display: block; margin-bottom: 20px; }

.khead .contitle{ line-height: 30px; }
.subtitle{ width: 100%; line-height: 40px; font-size: 17px; color: #4162ff; font-weight: bold; }
.msamap{ width: 100%; height: 340px; }
.cityselect{ width: 100%; display: block; margin-bottom: 10px; }

.hljzglist{ background: #fff; padding: 5px 10px; margin-bottom: 10px; border-bottom: 1px dashed #c1ccff; margin-right: 3%; transition: 0.3s all; }
.hljzglist:hover{ background: #eff7ff; cursor: pointer; border-radius: 3px; }
.hljzglist dt{ line-height: 38px; font-size: 17px; font-weight: bold; color: #444; }
.hljzglist dd{ font-size: 13px; line-height: 20px; color: #666; margin-bottom: 5px; }
.hljzglist dd .icon-address{ color: #ff2f51; font-size: 17px; margin-right: 6px; }
.hljzglist dd .icon-tel{ color: #00c2c4; font-size: 17px; margin-right: 6px; }
.msstep3title{ width: 100%; text-align: center; line-height: 40px; margin: 10px 0px 15px; font-size: 26px; color: #00c2c4; font-weight: bold; }
.zgfbrefresh{ font-size: 20px; position: absolute; top: 10px; right: 10px; display: inline-block; }
</style>
