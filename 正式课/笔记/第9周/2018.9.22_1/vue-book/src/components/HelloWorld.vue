<template>
  <div class="hello">
    <!--加keep-alive是为了保证第一次进来加载数据-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Tab></Tab>
  </div>
</template>

<script>
  import Tab from '@/common/tabs.vue';
  export default {
    name: 'HelloWorld',
    components: {
      //注册本组件要使用的组件
      Tab,
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

