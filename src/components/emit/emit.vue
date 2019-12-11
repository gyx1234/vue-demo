
<template>
  <div>
    <button v-on:click="sendMsg">向父组件传参</button>  <!-- 这里用简单的绑定方法触发传参-->
  </div>
</template>

<script>
  export default {
    name: 'emit',
    data() {
      return {
       aaa:{a:1,b:2}
      }
    },
    methods: {
      sendMsg: function () { //传参方法
        this.$emit('headCallBack', this.aaa, '第二个参数', '第三个参数'); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
      }
    }
  }
</script>
<style scoped>

</style>
