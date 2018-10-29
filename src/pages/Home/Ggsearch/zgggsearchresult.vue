<template>
	<el-row v-loading="loading" class="livekcbox">
		<template>
			<h3 class="contitle">搜索结果</h3>
			<el-table :data="allggdate.slice((currentPage-1)*pageSize,currentPage*pageSize)" border max-height="100%" @selection-change="handleSelectionChange">
				<el-table-column prop="city" label="地市" width="90"></el-table-column>
				<el-table-column prop="date" label="日期" width="110"></el-table-column>
				<el-table-column prop="classfy" label="项目" width="130"></el-table-column>
				<el-table-column prop="ggtitle" label="公告名称"></el-table-column>
        <el-table-column prop="peoplenum" width="100" label="招聘人数"></el-table-column>
				<el-table-column prop="ggbtns" label="操作" width="300">
					<template slot-scope="scope">
            <a v-if="ggbtn.entrance" class="el-button el-button--mini" :class="'el-button--'+ggbtn.type" v-for="(ggbtn,index) in allggdate[scope.$index].ggbtns" :href="ggbtn.entrance" target="_black">{{ ggbtn.name }}</a>
            <el-button v-if="!ggbtn.entrance" size="mini" v-for="(ggbtn,index) in allggdate[scope.$index].ggbtns" :key="index" @click="livecourseopen(scope.row)" :href="ggbtn.entrance" :type="ggbtn.type">{{ ggbtn.name }}</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 15, 20, 30]"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="zgalltotal">
		    </el-pagination>
		</template>
	</el-row>
</template>

<script>
export default {
  props:['seachresult'],
  name: 'zgggsearchresult',
  data() {
    return {
    	loading: true,
    	allggdate:[],
    	currentPage: 1,
    	pageSize: 10,
    	zgalltotal: 0,
    	allcoursefilters:[],
    	NowDate: ''
    }
  },
  created: function(){
    var that = this;
    console.log(that.seachresult)
    if (that.seachresult.length === 0) {
      console.log('默认无数据')
    }else{
      that.allggdate = that.seachresult
      that.loading = false
    }
  },
  methods:{
  	livecourseopen:function(row){
  		//console.log(row)
  	},
  	handleSizeChange(val){
  		this.pageSize = val;
  	},
  	handleCurrentChange(val){
  		this.currentPage = val;
  	},
  	handleSelectionChange(val) {
      this.livecoursedate = val;
    }
    
  }
}
</script>

<style scoped>
*{ text-align: left; }
a,a:hover{ text-decoration: none; }
.el-pagination{ display: block; background: #fff; border: 1px solid #eee; padding: 10px; text-align: right; }
.livekcbox{ width: 100%; display: block; }
</style>
