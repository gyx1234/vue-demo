<template>
  <div id="app">
    <!--<mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">-->
      <!--<router-link to="" slot="left">-->
        <!--<mt-button icon="back" @click="$router.back(-1)">返回</mt-button>-->
      <!--</router-link>-->
    <!--</mt-header>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!--<router-view></router-view>-->
  </div>
</template>
<script>
  export default {
    name: 'App',
    methods: {},
    created() {
      console.log('App created 创建')
    },
    mounted() {
      console.log('App mounted 安装 完成挂载')
    },
    updated() {
      console.log('App updated 更新')
    },
    destroyed() {
      console.log('App destroyed 摧毁 ')
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  .mint-tabbar > .mint-tab-item.is-selected {
    color: #3ac9a7;
    /*color: #000;*/
    /*background-color: #fafafa;*/
  }
  .header_margintop{margin-top: 40px;}

</style>
