<template>
  <div>
    <Til>列表页</Til>
    <div class="list_box">
      <ListOne v-for="(val,index) in dataList" :key="index" :item="val"></ListOne>
    </div>
  </div>
</template>

<script>
  //引入title组件
  import Til from '@/common/title.vue'
  import ListOne from './listone.vue'
  import {mapState} from 'vuex'
  export default {
    name: "index",
    components: {
      Til,
      ListOne,
    },
    created(){
      this.$store.dispatch('getListData', {A: 1, B: 2})
    },
    computed: mapState(['dataList'])
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .list_box {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }

</style>
