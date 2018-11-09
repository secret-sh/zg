<template>
	<div class="msbox">
		<el-row :span="24" class="mskchead clearfix">
			<div class="mskctp" v-for="(mskcli,index) in mskclists" :key="index" :class="{mskctpfull:fullcontrl==index}" @click.stop="mskcfullscreen(index)">
        <transition name="slide-top">
          <span class="el-icon-close" v-if="fullcontrl==index" @click.stop="mskcfullclose(index)"></span>
        </transition>
				<i><img :src="mskcli.imgsrc" alt=""></i>
				<h3>{{mskcli.kcleibie}}</h3>
				<h5>{{mskcli.kcmsgf}}</h5>
        <transition name="slide-left">
          <div class="kcchildbox" v-if="fullcontrl==index">
            <template v-if="mskcli.kcchild">
              <el-tabs>
                <el-tab-pane v-for="(mskcsubli,index) in mskcli.kcchild" :key="index" :label="mskcsubli.kname">
                  <div class="kcsubcontent" v-html="mskcsubli.kintro"></div>
                  <a :href="mskcsubli.knamebtn.knamebtnhref" class="el-button el-button--success is-round">{{mskcsubli.knamebtn.knamebtntxt}}</a>
                  <!-- 活动推荐开始 -->
                  <div class="kcchildbox mshdtjbox">
                    <el-card class="mscon" shadow="never">
                      <div slot="header" class="clearfix" >
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
	
	</div>
</template>

<script>
import zghktj from '@/pages/Public/zghktj'
export default {
  name: 'mscourse',
  data() {
    return {
    	mskclists:[],
    	fullcontrl:-1
    }
  },
  mounted: function(){
  	this.getAjax()
  },
  methods: {
  	getAjax: function(argument) {
  		var that = this
  		that.$axios.get('./static/json/mskc.json')
  		.then(function(response){
  			that.mskclists = response.data
  		})
  		.catch(function(error){
  			console.log("课程列表请求错误" + error);
  		})
  	},
  	mskcfullscreen:function(event){
  		this.fullcontrl = event
  	},
    mskcfullclose:function(e){
      this.fullcontrl = 9
      console.log(this.fullcontrl);
    }
  },
  components:{
  	zghktj
  }
}
</script>

<style scoped>
.mshdtjbox .mscon{ width: 100%; margin-top: 30px; margin-left: -20px; }

.mskclistbx{ width: 100%; display: flex; flex-wrap: wrap; justify-content: flex-start; }
.mskclistbx .el-card{ width: 200px; margin: 6px; height: auto; display:block; }
.mskclistbx .image{ width: 100%; display: block; overflow: hidden; }
.mskclistbx .image img{ width: 100%; height: 150px; display: block; }
.mskclistbx .image img:hover{ opacity: 0.6 }

.mskclistbx .bottom{ font-weight: normal; line-height:26px; }
.mskclistbx .cardfoot{ padding: 8px; font-size: 15px; font-weight: normal; line-height: 24px; }
.mskclistbx .cardfoot h4{ width: 100%; line-height: 30px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: normal; }
.mskclistbx .classfy{ font-size: 13px; color: #999; }
.mskclistbx .classfy i{ margin-right: 5px; }
.mskclistbx .cardfoot .button{ float: right; margin: 6px 0px 6px 5px; }

.mskchead{ width: 100%; display: flex; flex-wrap: wrap; justify-content: space-between; }
.mskchead .mskctp .el-icon-close{ font-size: 22px; position: absolute; top: 20px; right: 20px; }
.mskchead .mskctp *{ transition: 0.4s all; }
.mskctp{ width: 150px; background: #fff; border-radius: 10px; overflow: hidden; padding: 1% 0px; box-sizing: border-box; text-align: center; margin: 5px; cursor: pointer; order: 1; flex-grow: 1; position: relative; }
.mskctp i{ width:140px; display: block; margin: 0 auto; }
.mskctp i img{ width: 100%; display: block; }
.mskctp h3{ font-size: 20px; color: #555; line-height: 36px; margin-top: 15px; }
.mskctp h5{ font-size: 14px; color: #999; line-height: 30px; font-weight: normal; }
.mskctp:hover i img{ transform: scale(1.1); }
.mskchead .mskctp .kcchildbox,.mskchead .mskctp .el-icon-close{ transition: 0s all; }
.kcchildbox .el-button{ margin: 10px; text-decoration: none; }

.mskctpfull{ min-width: 100%; margin: 10px 0px; order: 2; flex-grow: 6; text-align: left; padding-left: 60px; }
.mskctpfull i{ width: 300px; float: right; margin: 50px 20px 20px 50px;  }
.mskctpfull h3{ margin: 30px 0px 5px; font-size: 34px; line-height: 50px; color: #2c5df4; }
.mskctpfull h5{ margin-bottom: 30px; }
.mskctpfull p{ color: #444; font-size: 17px; line-height: 30px; }
.kcsubcontent{ color: #444; font-size: 14px; line-height: 26px;  }
.mskchead .mskctp.mskctpfull *{ transition: 1s all; }
</style>
