<template>
  <mt-tabbar v-model="message" fixed>
    <mt-tab-item id="index">
      <img slot="icon" :src="this.atabs[0]">
      首页
    </mt-tab-item>
    <mt-tab-item id="buyCart">
      <img slot="icon" v-bind:src="this.atabs[1]">
      购物车
    </mt-tab-item>
    <mt-tab-item id="mine">
      <img slot="icon" v-bind:src="this.atabs[2]">
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
  export default {
    props:{
      selected: String,
      tabs:Array,
    },
    data(){
      return{
        //选中的tabbar值message为外面页面传入的值selected
        message:this.selected,
        //这里使用的icon图标为图片，所以需要加图片改变的传入，若使用阿里图标，则不用加
        atabs:this.tabs,
      }
    },
    watch: {
      $route () {
        // console.log("改变路由")
      },
      message: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定去向
        switch(val){
          case "index":
            this.$router.push({path: "/index.html"})
            break;
          case "buyCart":
            this.$router.push({path: "/buyCart"})
            break;
          case "mine":
            this.$router.push({path: "/mine"})
            break;
        }
      }
    },
    activated() {
      this.message = this.selected
      this.tabs = this.atabs
    }
  }
</script>
