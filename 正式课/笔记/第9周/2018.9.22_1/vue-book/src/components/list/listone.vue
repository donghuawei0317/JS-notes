<template>
  <div class="list_one">
    <div class="pic_box">
      <img :src="item.bookCover" alt="">
    </div>
    <div class="content_box">
      <h3 class="title">{{item.bookName}}</h3>
      <p class="desc">{{item.bookInfo}}</p>
      <div class="price">￥{{item.bookPrice}}</div>
      <button @click="remove">删除</button>
      <button @click="collect">收藏</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: ['item'],
    methods: {
      remove(){
        this.$store.commit('removeListOne', this.item);//推荐使用commit改变store中的数据
      },
      collect(){
        this.$store.commit('addCollect',this.item)
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .list_one {
    display: flex;
    border-bottom: 1px solid #007aff;
    .pic_box {
      flex: 4;
      img {
        width: 100%;
      }
    }
    .content_box {
      flex: 6;
      .title {
        font-size: .8rem;
      }
      .desc {
        font-size: .6rem;
      }
      .price {
        font-size: .5rem;
        color: red;
      }
      button {
        font-size: .35rem;
        background: red;
        width: 2rem;
        height: 1rem;
        border-radius: .5rem;
        border: none;
        outline: none;
        color: #fff;
      }
    }
  }
</style>
