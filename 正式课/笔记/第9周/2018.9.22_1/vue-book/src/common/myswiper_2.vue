<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in ary" :key="index"><img :src="item.src" alt=""></div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "index",
    props:['ary'],
    /*mounted(){
      this.swiperInit();
    },*/
    updated(){
      this.swiperInit();
    },
    methods: {
      //自定义初始化swiper的方法
      swiperInit(){
        new Swiper('.swiper-container', {
          //autoplay: true,
          autoplay:{
            disableOnInteraction: false,
          },
          pagination:{
            el:'.swiper-pagination',
          },
        })
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .swiper-container {
    height: 100%;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
