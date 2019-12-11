<template>
  <div class="header_margintop ">
    <mt-header title="双向绑定01" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>

    <div>{{name}}</div>
  </div>
</template>

<script>

  export default {
    name: "shuangx_01",
    data() {
      return {
        name: ''
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
      console.log('双向绑定 created 创建')
    },
    mounted () {
      console.log('双向绑定 mounted 完成挂载')

      var Book = {}
      var name = '';
      Book.name = 'vue权威指南';  // 你取了一个书名叫做vue权威指南
      console.log('Book.name 111：', Book.name)  // 《vue权威指南》

      // console.log('Book：',Book.name);
      Object.defineProperty(Book, 'name', {
        set: function (value) {
          name = value
          console.log('set 你取了一个书名叫做' + value)
          // return 'set 你取了一个书名叫做' + value
        },
        get: function () {
          // console.log('get：《' + name + '》')
          return 'get：《' + name + '》'
        }
      })

      Book.name = 'vue权威指南';  // 你取了一个书名叫做vue权威指南
      // console.log('Book：',Book);
      this.name = Book
      console.log('Book.name 222：', Book.name)  // 《vue权威指南》
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
