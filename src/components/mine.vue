<template>
  <div id="mine">
    <mt-header title="我的"></mt-header>
    <div class="main">我的{{selected}}</div>
    <tabbar :selected="selected" :tabs='tabs'></tabbar>
  </div>
</template>

<script>
  import tabbar from '@/components/tabbar'

  export default {
    name: "mine",
    components:{tabbar},
    data() {
      return {
        selected:"mine",
        tabs:[require("../assets/images/icons/home_gray.png"),require("../assets/images/icons/cart_gray.png"), require("../assets/images/icons/my_green.png")],
      }
    },
    created () {
      // console.log('mine created 创建')
    },
    mounted () {
      console.log('mine mounted 安装 完成挂载')
    },
    updated () {
      // console.log('mine updated 更新')
    },
    destroyed () {
      // console.log('mine destroyed 摧毁 ')
    },
    // 钩子函数来判断页面来源：
    beforeRouteEnter(to, from, next) {
    },
    // keep-alive 组件激活时调用。
    activated() {
    }
  }
</script>

<style scoped>
  .main{padding: 5px 5px 60px 5px;}

</style>
