<template>
	<el-row>
		<el-col :span="24" class="livecoursebox">
			<zgzbjz></zgzbjz>
		</el-col>
	</el-row>
</template>

<script>
import zghktj from '@/pages/Public/zghktj'
import zgzbjz from '@/pages/Home/Livecourse/zgzbjz'
export default {
  name: 'livecourse',
  data() {
    return {
    	activeIndex: '/Home/Livecourse/livecourse/',
      	isCollapse: false
    }
  },
  methods: {
  },
  components:{
  	zghktj,zgzbjz
  }
}
</script>

<style scoped>
.livecoursebox{ text-align: center; margin-bottom: 20px; }
.livecoursebox .el-table{ width: 100%; }
</style>
