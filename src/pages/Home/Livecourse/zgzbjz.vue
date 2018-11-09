<template>
	<div class="zgzbjz">
		<el-row :gutter="20" class="zgzbjz_changci">
			<el-col :span="6">
				<div class="zgzbjz_changci_bq changci_all">
					<p>共直播场次</p>
					<h3><strong>{{ liveing + liveover }}</strong><span>场</span></h3>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="zgzbjz_changci_bq changci_liveing">
					<p>即将直播</p>
					<h3><strong>{{ liveing }}</strong><span>场</span></h3>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="zgzbjz_changci_bq changci_over">
					<p>往期直播</p>
					<h3><strong>{{ liveover }}</strong><span>场</span></h3>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-button-group style="margin-bottom: 10px;">
				<template v-for="(buttontab,index) in buttontabs">
					<el-button :class="{active:iscur==index}" @click.prevent="livetabSelect(index,buttontab.component)">{{ buttontab.name }}</el-button>
				</template>
			</el-button-group>
			<el-row>
				<transition name="slide-fade" appear>
					<el-col v-show="livetabview==='zgliveingcourse'">
						<zgliveingcourse v-on:livealltotal="livealltotalFun"></zgliveingcourse>
					</el-col>
				</transition>
				<transition name="slide-fade" appear>
					<el-col v-show="livetabview==='zgovercourse'">
						<zgovercourse v-on:overalltotal="overalltotalFun"></zgovercourse>
					</el-col>
				</transition>
			</el-row>
			<!-- <keep-alive>
				<transition name="slide-fade" mode="out-in">
					<component v-bind:is="livetabview"></component>
				</transition>
			</keep-alive> -->
		</el-row>

	</div>
</template>

<script>
import zgliveingcourse from '@/pages/Home/Livecourse/zgliveingcourse'
import zgovercourse from '@/pages/Home/Livecourse/zgovercourse'
export default {
  name: 'zgzbjz',
  data() {
    return {
    	livetabview:'zgliveingcourse',
    	buttontabs:[
    		{name:"即将直播", component:"zgliveingcourse"},
    		{name:"往期汇总", component:"zgovercourse"}
    		],
    	iscur:0,
    	total: 0,
    	liveing: 0,
    	liveover: 0
    }
  },
  components:{
  	zgliveingcourse, zgovercourse
  },
  methods:{
  	livetabSelect:function(tabindex,tabcomponent){
  		this.iscur = tabindex;
  		this.livetabview = tabcomponent;
  	},
  	allcoursedateFun:function(data){
  		this.total = data
  	},
  	livealltotalFun:function(data){
  		this.liveing = data
  	},
  	overalltotalFun:function(data){
  		this.liveover = data
  	}
  	
  }
}
</script>

<style scoped>
*{ text-align: left; }
a,a:hover{ text-decoration: none; }
.zgzbjz{ width: 100%; display: flex; flex-wrap: wrap; flex-direction: column; }
.zgzbjz_changci{ margin-bottom: 20px; text-align: left; }
.zgzbjz_changci_bq{ min-width: 100px; padding: 10px; background: #fff; color: #666; border: 1px solid #eee; border-radius: 5px; }
.zgzbjz_changci_bq p{ display: block; font-size: 14px; line-height: 30px; }
.zgzbjz_changci_bq h3{ font-size: 16px; height: 40px; vertical-align: bottom; font-weight: normal; display: block; }
.zgzbjz_changci_bq h3 strong{ font-size: 30px; line-height: 40px; font-weight: normal; margin-right: 5px; font-style: italic; display: inline-block; max-width: 150px;
 text-overflow: ellipsis; white-space: nowrap; overflow: hidden; padding-right: 5px; }
.zgzbjz_changci_bq h3 span{ display: inline-block; vertical-align: top; line-height: 50px; }

.changci_all h3 strong{ color: #f60; }
.changci_liveing h3 strong{ color: #00deff; }
.changci_over h3 strong{ color: #5991ff; }
.changci_huifang h3 strong{ color: #666; }

.el-table-filter__wrap{ margin-bottom: 0px !important; }
.el-button.active{ background: #2c5df4; color: #fff; border-color:#2c5df4; }
</style>
