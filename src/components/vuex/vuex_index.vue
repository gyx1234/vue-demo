<template>
  <div class="header_margintop ">
    <mt-header title="vuex" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>

    <router-link to="/vuex/vuex01" class="flex router_link">
      <div>vuex01</div><i class="iconfont icon-arrow-right"></i>
    </router-link>

    <router-link to="/vuex/vuex02" class="flex router_link">
      <div>vuex02</div><i class="iconfont icon-arrow-right"></i>
    </router-link>

  </div>
</template>

<script>

  export default {
    name: "vuex_index",
    data() {return{}},
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
      console.log('双向绑定 created 创建')
    },
    mounted () {
      console.log('双向绑定 mounted 完成挂载')
    },
  }
</script>

<style scoped>
  .flex{display: flex;}
  a:-webkit-any-link {cursor: pointer;text-decoration: none;color: #000;}
  .router_link{justify-content: space-between;align-items: center;height: 40px;border-bottom: 1px solid #f2f2f2;padding: 1px 10px;}
</style>
