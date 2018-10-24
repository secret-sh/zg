<template>
	<el-row v-loading="loading" class="livekcbox">
		<template>
			<h3 class="contitle">往期汇总</h3>
			<el-table :data="zgovercoursedate.slice((currentPage-1)*pageSize,currentPage*pageSize)" border max-height="100%" @selection-change="handleSelectionChange">
				<el-table-column prop="city" label="地市"
					:filters="allcoursefilters"
					:filter-method="filterTag"
					filter-placement="bottom-end">
					<template slot-scope="scope">
				        <slot :type="scope.row.city" disable-transitions>{{scope.row.city}}</slot>
			        </template>
				></el-table-column>
				<el-table-column prop="date" label="日期" width="150"></el-table-column>
				<el-table-column prop="classfy" label="项目"></el-table-column>
				<el-table-column prop="livecon" width="350" label="讲座内容"></el-table-column>
				<el-table-column prop="entrance" label="听课入口">
					<template slot-scope="scope">
						<el-button size="small" @click="livecourseopen(scope.row)" type="info">已结课</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[5, 10, 15, 20]"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="overalltotal">
		    </el-pagination>
		</template>
	</el-row>
</template>

<script>
export default {
  name: 'zgovercourse',
  data() {
    return {
    	loading: true,
    	zgovercoursedate:[],
    	currentPage: 1,
    	pageSize: 5,
    	overalltotal: 0,
    	allcoursefilters:[],
    	NowDate: ''
    }
  },
  mounted: function(){
  	this.getAjax();
  },
  methods:{
  	getAjax:function(argument) {	//读取直播课列表
  		var that = this;
  		this.$axios.get('./static/json/zgzbk.json')
  		.then(function(response){
  			//即将直播数据判断;
			that.NowDate = new Date().getTime();
			const zgliveingArr = new Array();
			for(let i=0; i<response.data.zbktablebody.length; i++){
				const zbkDate = new Date(response.data.zbktablebody[i].date).getTime();
				if(that.NowDate>zbkDate){
					zgliveingArr.push(response.data.zbktablebody[i])
				}
			}
  			that.zgovercoursedate = zgliveingArr
  			that.overalltotal = that.zgovercoursedate.length
  			//向父组建传直播场次
  			that.$emit('overalltotal', that.overalltotal)
  			const zjarray = new Array();
  			for(let i=0; i<that.overalltotal; i++){
				zjarray.push(response.data.zbktablebody[i].city);
  			}
  			const zjarrayb = new Array();
  			for(let j=0; j<zjarray.length; j++){
  				if (zjarrayb.indexOf(zjarray[j]) === -1) {
		            zjarrayb.push(zjarray[j]);
		        }
  			}
  			for(let i=0; i<zjarrayb.length; i++){
				that.allcoursefilters.push({ text:zjarrayb[i] , value:zjarrayb[i] });
  			}
  			setTimeout(function(){
				that.loading = false
  			},300);
  		})
  		.catch(function(error){
  			console.log("已结束直播课列表请求错误" + error);
  		});
  	},
  	livecourseopen:function(row){
  		this.$notify({
  			type:'warning',
  			duration:2000,
  			title:'提示',
  			message:'此场讲座已经结束 无法查看'
  		})
  	},
  	handleSizeChange(val){
		this.pageSize = val;
	},
	handleCurrentChange(val){
		this.currentPage = val;
	},
	handleSelectionChange(val) {
        this.livecoursedate = val;
    },
    filterTag(value, row) {
		return row.city === value;
	},
    filterHandler(value, row, column) {
		const property = column['property'];
		return row[property] === value;
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
