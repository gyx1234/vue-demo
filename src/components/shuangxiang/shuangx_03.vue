<template>
  <div class="header_margintop ">
    <mt-header title="双向绑定03" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <input v-model="message" placeholder="edit me">
    <p>Message is: {{ message }}</p>
  </div>
</template>

<script>

  export default {
    name: "shuangx_03",
    data() {
      return {
        time: '',
        message: ''
      }
    },
    computed: {
    },
    watch: {
      $route(to, from) {
        // console.log('watch11111111', to, from)
      }
    },
    methods: {
    },
    created () {
      console.log('双向绑定3 created 创建')
    },
    mounted () {
      console.log('双向绑定3 mounted 完成挂载')
    },
    beforeRouteEnter(to, from, next) {
      next()
    },
    activated() {
      var that = this
      if (!that.$route.meta.isBack) {
        // that.$store.dispatch('footerStatus/hideFooter')
      }
      that.$route.meta.isBack = false
    },
  }
</script>

<style scoped>

</style>
