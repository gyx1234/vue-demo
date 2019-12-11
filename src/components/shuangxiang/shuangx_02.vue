<template>
  <div class="header_margintop ">
    <mt-header title="双向绑定02" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>

    <div>{{name}}</div>
  </div>
</template>

<script>

  export default {
    name: "shuangx_02",
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
      console.log('双向绑定2 created 创建')
    },
    mounted () {
      console.log('双向绑定2 mounted 完成挂载')

      function defineReactive(data, key, val) {
        // console.log(data, key, val)
        observe(val); // 递归遍历所有 子属性
        Object.defineProperty(data, key, {
          enumerable: true,
          configurable: true,
          get: function() {
            // console.log('get'+val)
            return val;
          },
          set: function(newVal) {
            val = newVal;
            console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
          }
        });
      }
      function observe(data) {
        if (!data || typeof data !== 'object') {
          return;
        }
        Object.keys(data).forEach(function(key) {
          // console.log(data, key, data[key])
          defineReactive(data, key, data[key])
        })
      }

      var library = {
        book1: {
          name: ''
        },
        book2: ''
      };
      observe(library);
      library.book1.name = 'vue权威指南'; // 属性name已经被监听了，现在值为：“vue权威指南”
      library.book2 = '没有此书籍';  // 属性book2已经被监听了，现在值为：“没有此书籍”
      this.name = library
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
