<template>
  <el-card class="zbcard" shadow="hover">
    <div slot="header" class="clearfix">
      <span>好课推荐</span>
    </div>
    <div class="text item">
      <el-carousel class="kctjbox" indicator-position="outside" height="200px">
        <el-carousel-item v-for="(zghkitem,index) in zghktjitems" :key="index">
          <a :href="zghkitem.imghref" target="_blank" class="zghktjitem">
            <img :src="zghkitem.imgsrc" :alt="zghkitem.title" :title="zghkitem.title">
            <h3>{{ zghkitem.title }}</h3>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'zghktj',
  data() {
    return {
    	zghktjitems:[
    		{
    			title: '2019国家公务员笔试课程_国家公务员考试备考',
    			imgsrc: 'http://hlj.offcn.com/zg/images/slide1.jpg',
    			imghref: 'http://hlj.offcn.com/zg/2019gkbskc/'
    		},
        {
          title: '2019国家公务员笔试课程_国家公务员考试备考',
          imgsrc: 'http://hlj.offcn.com/zg/images/slide2.jpg',
          imghref: 'http://hlj.offcn.com/zg/2019gkbskc/'
        },
        {
          title: '2019国家公务员笔试课程_国家公务员考试备考',
          imgsrc: 'http://hlj.offcn.com/zg/images/slide3.jpg',
          imghref: 'http://hlj.offcn.com/zg/2019gkbskc/'
        }
    	]
    }
  }
}
</script>

<style>
.zbcard{ text-align: left;  }
.zbcard .el-card__header span{ font-size: 17px; font-weight: bold;  }
.zghktj{ background: #ff5b5b; color: #fff; }

.kctjbox .el-carousel__container{ border-radius: 8px; overflow: hidden; }
.zghktjitem{ width: 100%; height: 100%; position: relative; color: #fff; display: flex; justify-content: center; align-items: center;  }
.zghktjitem img{ width: 100%; height: 100%; position: relative; }
.zghktjitem h3{ position: absolute; width: 100%; height: auto; left: 0; bottom: 0; font-size: 15px; padding: 5px 10px; background: rgba(0,0,0,0.4);
 display: block; text-overflow: ellipsis; white-space: nowrap; font-weight: bold; line-height: 30px; overflow: hidden; }
</style>
