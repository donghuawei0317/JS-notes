<template>
    <div class="home_list">
      <h2>热门图书</h2>
      <div class="list_box">
        <Book v-for="val in 10"></Book>
      </div>
    </div>
</template>

<script>
  import Book from './book';
    export default {
        name: "index",
      components:{
          Book,
      }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .home_list{
    padding-bottom: 2rem;
    h2{
      height: 1rem;
      line-height: 1rem;
      padding: 0 .2rem;
      box-sizing: border-box;
      color:#ccc;
      font-size: .6rem;
    }
    .list_box{
      overflow: hidden;
      padding-top:.2rem;
      .book_box{
        width: 50%;
        float:left;
        height: 6rem;
        /*background: #00a77b;*/
        text-align: center;
        margin-bottom: .5rem;
        img{
          width: 90%;
        }
      }
    }
  }
</style>
