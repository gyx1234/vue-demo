<template>
  <div id="buyCart">
    <mt-header title="购物车"></mt-header>
    <div class="main">购物车{{selected}}</div>

    <tabbar :selected="selected" :tabs='tabs'></tabbar>
  </div>
</template>

<script>
  import tabbar from '@/components/tabbar'

  export default {
    name: "buyCart",
    components:{tabbar},
    data() {
      return {
        selected:"buyCart",
        tabs:[require("../assets/images/icons/home_gray.png"),require("../assets/images/icons/cart_green.png"), require("../assets/images/icons/my_gray.png")],
      }
    },
    created () {
      // console.log('buyCart created 创建')
    },
    mounted () {
      console.log('buyCart mounted 安装 完成挂载')
    },
    updated () {
      // console.log('buyCart updated 更新')
    },
    destroyed () {
      // console.log('buyCart destroyed 摧毁 ')
    },
    // 钩子函数来判断页面来源：
    beforeRouteEnter(to, from, next) {
      // console.log('buyCart beforeRouteEnter', to.meta.isBack)
      // if (from.name === '') { //判断是从哪个路由过来的，若是detail页面不需要刷新获取新数据，直接用之前缓存的数据即可
      //   to.meta.isBack = true;
      // }
      next();
    },
    // keep-alive 组件激活时调用。
    activated() {
      var that = this
      // console.log('buyCart activated ', that.$route.meta.isBack)
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      if (!that.$route.meta.isBack) {
        // console.log('buyCart activated----', '表明需要获取新数据，否则就不再请求，直接使用缓存的数据')
        that.selected = "buyCart"
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      that.$route.meta.isBack = false
    }
  }
</script>

<style scoped>
.main{padding: 5px 5px 60px 5px;}
</style>
