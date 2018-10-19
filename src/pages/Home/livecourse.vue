<template>
	<el-row>
		<el-col :span="24" class="livecoursebox">
			<template>
				<el-table :data="livecoursedate" border size="small" max-height="100%">
					<el-table-column prop="city" label="地市"></el-table-column>
					<el-table-column prop="date" label="日期"></el-table-column>
					<el-table-column prop="livecon" label="讲座内容"></el-table-column>
					<el-table-column prop="entrance" label="听课入口">
						<template slot-scope="scope">
							<el-button size="small">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</el-col>
		<el-card class="zbcard">
			<div slot="header" class="clearfix">
				<span>卡片名称</span>
				<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
			</div>
			<div class="text item">
				aaa
			</div>
		</el-card>
	</el-row>
</template>

<script>
export default {
  name: 'livecourse',
  data() {
    return {
    	livecoursedate:[
    		{
    			city: '哈尔滨',
    			date: '10月20日 19:00',
    			livecon: '【教师招聘】黑龙江呼兰教师招聘试题解析讲座',
    			entrance: 'http://19.offcn.com/class-35452/'
    		}
    	],
    	activeIndex: '/Home/livecourse/',
      	isCollapse: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.livecoursebox{ text-align: center; margin-bottom: 20px; }
.livecoursebox .el-table{ width: 100%; }
.zbcard{ width: 400px; }
</style>
