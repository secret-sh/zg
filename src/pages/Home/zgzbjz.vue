<template>
	<div class="zgzbjz">
		<el-row :gutter="20" class="zgzbjz_changci">
			<el-col :span="6">
				<div class="zgzbjz_changci_bq changci_all">
					<p>共直播场次</p>
					<h3><strong>14056</strong><span>场</span></h3>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="zgzbjz_changci_bq changci_liveing">
					<p>即将直播</p>
					<h3><strong>14056</strong><span>场</span></h3>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="zgzbjz_changci_bq changci_over">
					<p>已结束直播</p>
					<h3><strong>14056</strong><span>场</span></h3>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="zgzbjz_changci_bq changci_huifang">
					<p>录播</p>
					<h3><strong>14056</strong><span>场</span></h3>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-button-group style="margin-bottom: 10px;">
				<el-button type="primary" plain>所有直播</el-button>
				<el-button type="primary" plain>即将直播</el-button>
				<el-button type="primary" plain>已结束直播</el-button>
			</el-button-group>
			<template>
				<h3 class="zgtabletitle">所有直播</h3>
				<el-table :data="livecoursedate" size="medium" border max-height="100%">
					<el-table-column prop="city" label="地市"></el-table-column>
					<el-table-column prop="date" label="日期"></el-table-column>
					<el-table-column prop="livecon" label="讲座内容"></el-table-column>
					<el-table-column prop="entrance" label="听课入口">
						<template slot-scope="scope">
							<a class="el-button" href="" target="_blank">查看</a>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</el-row>				
	</div>
</template>

<script>
export default {
  name: 'zgzbjz',
  data() {
    return {
    	livecoursedate:[
    		{
    			city: '哈尔滨',
    			date: '10月21日 19:00',
    			livecon: '【教师招聘】黑龙江呼兰教师招聘试题解析讲座',
    			entrance: 'http://19.offcn.com/class-35452/'
    		},
    		{
    			city: '哈尔滨',
    			date: '10月17日 19:00',
    			livecon: '【教师招聘】黑龙江呼兰教师招聘试题解析讲座',
    			entrance: 'http://19.offcn.com/class-35452/'
    		},
    		{
    			city: '哈尔滨',
    			date: '10月24日 19:00',
    			livecon: '【教师招聘】黑龙江呼兰教师招聘试题解析讲座',
    			entrance: 'http://19.offcn.com/class-35452/'
    		},
    		{
    			city: '哈尔滨',
    			date: '10月26日 19:00',
    			livecon: '【教师招聘】黑龙江呼兰教师招聘试题解析讲座',
    			entrance: 'http://19.offcn.com/class-35452/'
    		}
    	],
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
.zgzbjz_changci_bq h3 strong{ font-size: 30px; line-height: 40px; font-weight: bold; margin-right: 10px; font-style: italic; display: inline-block; max-width: 150px;
 text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
.zgzbjz_changci_bq h3 span{ display: inline-block; vertical-align: top; line-height: 50px; }

.changci_all h3 strong{ color: #f60; }
.changci_liveing h3 strong{ color: #00deff; }
.changci_over h3 strong{ color: #5991ff; }
.changci_huifang h3 strong{ color: #666; }

.changci_all:hover{ background: url(../../assets/img/zbkbg1.jpg) no-repeat center; -webkit-background-size: 100% 100%;background-size: 100% 100%; }
.changci_liveing:hover{ background: url(../../assets/img/zbkbg2.jpg) no-repeat center; -webkit-background-size: 100% 100%;background-size: 100% 100%; }
.changci_over:hover{ background: url(../../assets/img/zbkbg3.jpg) no-repeat center; -webkit-background-size: 100% 100%;background-size: 100% 100%; }
.changci_huifang:hover{ background: url(../../assets/img/zbkbg4.jpg) no-repeat center; -webkit-background-size: 100% 100%;background-size: 100% 100%; }
.changci_all:hover,.changci_liveing:hover,.changci_over:hover,.changci_huifang:hover,.changci_all:hover h3 strong,.changci_liveing:hover h3 strong,.changci_over:hover h3 strong,.changci_huifang:hover h3 strong{ color: #fff; }
.zgtabletitle{ width: 100%; display: block; line-height: 50px; font-size: 20px; font-weight: bold; text-align: left; margin-bottom: 5px; }
</style>
