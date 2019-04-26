<template>
  <div id="mine_emit" class="header_margintop ">
    <mt-header title="子组件向父组件传值" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>

    <emit v-on:headCallBack="headCall"></emit>
    {{msg}}{{hehe}}
  </div>
</template>

<script>
  import emit from '@/components/emit/emit'

  export default {
    name: "mine_emit",
    data() {
      return {
        msg: '',
        hehe: ''
      }
    },
    components: {emit},
    methods: {
      //回调方法，接收子组件传的参数
      headCall: function (msg,hehe) {
        this.msg = msg;
        this.hehe = hehe
        console.log('接收子组件传的参数', msg, hehe)
      }
    },
    // 钩子函数来判断页面来源：
    beforeRouteEnter(to, from, next) {
      next();
    },
    // keep-alive 组件激活时调用。
    activated() {
      var that = this
      if (!that.$route.meta.isBack) {
        that.msg = ""
        that.hehe = ''

      }
      that.$route.meta.isBack = false
    }
  }
</script>

<style scoped>

</style>
