<template>
	<div class="msbox">
		<el-col :span="24" class="mskclists clearfix">
			<el-card class="mscon" shadow="never">
				<div slot="header" class="clearfix" >
					<span>好课推荐</span>
				</div>
				<div class="text item">
					<el-scrollbar ref="mskcscroll" @mousewheel.native=mskcscroll>
						<div class="mskclistbx">
							<el-card ref="mskccard" :body-style="{ padding: '0px' }" shadow="hover" v-for="(mskcitem,index) in mskclists" :key="index">
								<a class="image" :href="mskcitem.href" target="_blank"><img :src="mskcitem.img"></a>
								<div class="cardfoot">
									<span>{{ mskcitem.title }}</span>
									<div class="bottom clearfix">
										<time class="classfy"><i class="el-icon-bell"></i>{{ mskcitem.classfy }}</time>
										<el-button type="primary" title="查看" class="button" size="mini" icon="el-icon-star-off" circle></el-button>
									</div>
								</div>
							</el-card>
						</div>
					</el-scrollbar>
				</div>
			</el-card>
		</el-col>
		
	</div>
</template>

<script>
import zghktj from '@/pages/Public/zghktj'
export default {
  name: 'mscourse',
  data() {
    return {
    	mskclists:[]
    }
  },
  created:function(){
  	window.addEventListener('scroll', this.mskcscroll, true);
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
  	mskcscroll:function(event){
  		var _this = this;
  		const scrollstep = 10;
  		//event.scrollX = '-' + scrollstep + 'px'
  		var mskccardWidth = _this.$refs.mskccard.length
		if(event.wheelDelta<0){
			console.log('向下滚')
			console.log(_this.$refs.mskcscroll.moveX)
			_this.$refs.mskcscroll.moveX += mskccardWidth
		}else{
			console.log('向上滚')
			_this.$refs.mskcscroll.moveX -= mskccardWidth
			//_this.$refs.mskcscroll && (_this.$refs.mskcscroll.scrollBy(0, -30, false));
		}
  		//console.log(event)
  	}
  },
  components:{
  	zghktj
  }
}
</script>

<style scoped>

.mskclists .image{ width: 100%; display: block; overflow: hidden; }
.mskclists .image img{ width: 100%; height: 150px; }
.mskclists .image img:hover{ opacity: 0.7 }
.mskclists{ display: flex; flex-flow: row nowrap; }

.mskclists .bottom{ font-weight: normal; line-height: 40px; }
.mskclists .cardfoot{ padding: 15px 10px 5px; font-size: 15px; font-weight: bold; line-height: 24px; }
.mskclists .cardfoot span{ width: 100%; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mskclists .classfy{ font-size: 13px; color: #999; }
.mskclists .classfy i{ margin-right: 5px; }
.mskclists .cardfoot .button{ float: right; margin: 6px 0px 6px 5px; }
.mskclists .mscon{ width: 100%; }

.mskclistbx{ width: auto; display: flex; flex-flow: row nowrap }
.mskclistbx .el-card{ min-width: 260px; margin: 5px; height: auto; display: inline-block; }

</style>
