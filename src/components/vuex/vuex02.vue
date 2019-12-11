<template>
  <div class="header_margintop ">
    <mt-header title="vuex02" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>


  </div>
</template>

<script>

  export default {
    name: "vuex01",
    data() {
      return {

      }
    },
    computed: {

    },
    watch: {
      $route(to, from) {
        console.log('watch11111111', to, from)

      }
    },
    methods: {

    },
    mounted () {

    },
    beforeRouteEnter(to, from, next) {
      next();
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
