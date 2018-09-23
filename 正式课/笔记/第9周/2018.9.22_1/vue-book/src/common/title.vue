<template>
  <div class="til">
    <!--<h2>{{til}}</h2>-->
    <h2><slot></slot></h2>
  </div>
</template>

<script>
  export default {
    data(){
      return {};
    },
    props: ['til']
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .til {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.5rem;
    background: #0fa6ea;
    text-align: center;
    line-height: 1.5rem;
  }
</style>
