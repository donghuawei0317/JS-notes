<template>
  <div class="banner">
    <!--<mySwiper :ary="arr" v-if="arr.length"></mySwiper>-->
    <mySwiper :ary="arr"></mySwiper>
  </div>
</template>

<script>
  //import mySwiper from '@/common/myswiper.vue'
  import mySwiper from '@/common/myswiper_2.vue'
  import axios from 'axios'
  export default {
    name: "index",
    data(){
      return {
        //arr:[]
      }
    },
    components: {
      mySwiper,
    },
    created(){
      //this.$store.dispatch('getBannerData');
    },
    computed:{
      arr(){
        return this.$store.state.bannerData;
      }
    },
    created(){
      this.$store.dispatch('getBannerData');
    }
  }
</script>

<style scoped>
  .banner {
    height: 4rem;
    background: #0aeeaa;
    margin-top: 1.5rem;
  }
</style>
