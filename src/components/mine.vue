<template>
  <div id="mine" class="header_margintop ">
    <mt-header title="我的" fixed></mt-header>
    <div class="flex header_top">
      <div class="header_img"><img src="../assets/images/icons/my_gray.png"/></div>
      <div class="header_top_left">
        <div class="header_name">千江有水千江月</div>
        <div class="header_phone">17621081111</div>
      </div>
    </div>

    <div class="main ">

    </div>

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
      // console.log('mine beforeRouteEnter')
      // if (from.name === '') { //判断是从哪个路由过来的，若是detail页面不需要刷新获取新数据，直接用之前缓存的数据即可
      //   to.meta.isBack = true;
      // }
      next();
    },
    // keep-alive 组件激活时调用。
    activated() {
      var that = this
      // console.log('mine activated ', that.$route.meta.isBack)
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      if (!that.$route.meta.isBack) {
        // console.log('mine activated----', '表明需要获取新数据，否则就不再请求，直接使用缓存的数据')
        that.selected = "mine"
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      that.$route.meta.isBack = false
    }
  }
</script>

<style scoped>
  .flex{display: flex;}
  .header_top{align-items: center;height: 15vh;background-color: #26a2ff;color:#fff;padding: 20px;}
  .header_top .header_img{width: 50px;height: 50px;border-radius: 50px;background-color: #fff;border: 5px solid #fff;display: flex;}
  .header_top .header_img img{width: 100%;display: block;}
  .header_top .header_top_left{padding-left: 10px;}
  .header_top .header_top_left .header_name{font-size: 18px;}
  .header_top .header_top_left .header_phone{font-size: 15px;padding-top: 5px;}

  .main{padding: 5px 5px 100px 5px;}

</style>
