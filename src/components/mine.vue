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

      <router-link to="/emit/mine_emit" class="flex router_link">
        <div>子组件向父组件传值</div><i class="iconfont icon-arrow-right"></i>
      </router-link>

      <router-link to="/brother/brother" class="flex router_link">
        <div>兄弟组件通信</div><i class="iconfont icon-arrow-right"></i>
      </router-link>

      <router-link to="/timer" class="flex router_link">
        <div>监听计时器timer</div><i class="iconfont icon-arrow-right"></i>
      </router-link>

      <router-link to="/fuxiangzi/fuxiangzi_fu" class="flex router_link">
        <div>父组件向子组件传值</div><i class="iconfont icon-arrow-right"></i>
      </router-link>

      <router-link to="/vuex/vuex_index" class="flex router_link">
        <div>vuex</div><i class="iconfont icon-arrow-right"></i>
      </router-link>


      <!--<router-link to="/shuangxiang/shuangx_index" class="flex router_link">-->
        <!--<div>双向绑定</div><i class="iconfont icon-arrow-right"></i>-->
      <!--</router-link>-->

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

  .main{padding: 0px 5px 100px 5px;}

  a:-webkit-any-link {cursor: pointer;text-decoration: none;color: #000;}
  .main .router_link{justify-content: space-between;align-items: center;height: 40px;border-bottom: 1px solid #f2f2f2;}
</style>
