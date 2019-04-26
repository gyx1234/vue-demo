
<template>
  <div>
    <h1>我是熊大</h1>
    <button @click="sendToXiongEr">Click Me</button>
  </div>
</template>

<script>
  import bus from '../../assets/js/eventbus.js'

  export default {
    name: 'onevue',
    data() {
      return {
      }
    },
    methods: {
      sendToXiongEr:function(){
        //给熊二发送消息
        //触发msgToXiongEr事件
        bus.$emit("msgToXiongEr",'熊二，光头强来了');
      }
    },
    created() {
    }
  };
</script>
<style scoped>

</style>
