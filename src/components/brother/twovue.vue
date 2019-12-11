<template>
  <div>
    <h1>我是熊二</h1>
    <div>{{msg}}</div>
  </div>
</template>

<script>
  import bus from '../../assets/js/eventbus.js'

  export default {
    name: "twovue",
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      two() {
        var that = this
        bus.$on("msgToXiongEr",function(msg){
          that.msg = msg
          console.log("自定义的事件触发，接收到的数据"+msg);
        })
      }
    },
    created() {
      // this.two()
    },
    beforeRouteEnter(to, from, next) {
      next()
    },
    activated() {
      this.msg=''
      this.two()
    }
  }
</script>

<style scoped>

</style>
