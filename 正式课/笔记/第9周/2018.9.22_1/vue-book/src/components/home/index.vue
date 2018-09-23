<template>
  <div>
    <MyTil til="首页">首页</MyTil>
    <Banner></Banner>
    <List></List>
  </div>
</template>

<script>
  import MyTil from '@/common/title.vue';
  import Banner from './banner.vue';
  import List from './list.vue'
  export default {
    name: "index",
    components: {
      MyTil,Banner,List
    }
  }
</script>

<style scoped>

</style>
