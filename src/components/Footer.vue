<template>
  <el-footer>
    <el-col :span="20" :offset="2">
      <p>Copyright©1999-{{Nyear}} 北京中公教育科技股份有限公司 .All Rights Reserved</p>
      <p>京ICP备10218183号 京ICP证161188号 京公网安备11010802020593号 出版物经营许可证新出发京批字第直130052号</p>
    </el-col>
  </el-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: function () {
    return {
      Nyear: '2018',
    }
  },
  create:function(){
    const Ndate = new Date();
    this.Nyear = Ndate.getFullYear();
  }
}
</script>

<style scoped>
.el-footer{ height: auto !important; padding: 20px 0px; line-height: 30px; background: rgba(255,255,255,1); font-size: 14px; color: #333; text-align: center; position: relative; bottom: 0; box-sizing: border-box; display: flex; }
</style>
