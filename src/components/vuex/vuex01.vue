<template>
  <div class="header_margintop ">
    <mt-header title="vuex01" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>

    <section class="joinState">
      <div class="joinStateHead">
        <span class="h3">全国通讯录</span>
        <span class="joinStatus" @click="invokePushItems(item)">加入收藏列</span>
      </div>
    </section>

    <conditionFilter></conditionFilter>

    <!--判断全局管理的 showFooter -->
    <div v-if="isShow">来自buyCart mine页面就显示isShow：showFooter--{{isShow}}</div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex';
  import conditionFilter from '@/components/conditionFilter'

  export default {
    name: "vuex01",
    components: {conditionFilter},
    data() {
      return {
        item:{
          id:'01',
          productName: '苹果',
          price:'1.7元/斤'
        }
      }
    },
    computed: {
      // ...mapState({  //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
      //   isShow: state => state.footerStatus.showFooter //注意这些与上面的区别就是state.footerStatus,
      //   //里面定义的showFooter是指footerStatus.js里state的showFooter
      // }),
      //你也可以用下面的mapGetters来获取isShow的值，貌似下面的更简洁
      ...mapGetters('footerStatus',{ //footerStatus指的是modules文件夹下的footerStatus.js模块
        isShow:'isShow' //第一个isShow是我自定义的只要对应template里v-if="isShow"就行，
                        //第二个isShow是对应的footerStatus.js里的getters里的isShow
      }),
      ...mapGetters('collection', { //用mapGetters来获取collection.js里面的getters
        arrList: 'renderCollects'
      })
    },
    watch: {
      $route(to, from) {
        console.log('watch11111111', to, from)

        // 来自buyCart mine页面就显示
        if (from.name == 'buyCart' || from.name == 'mine') {
          this.$store.dispatch('footerStatus/showFooter') //这里改为'footerStatus/showFooter',
        } else {
          this.$store.dispatch('footerStatus/hideFooter') //同上注释
        }
      }
    },
    methods: {
      ...mapActions('collection', [ //collection是指modules文件夹下的collection.js
        'invokePushItems'  //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
      ])
    },
    mounted () {
      this.$store.dispatch('footerStatus/hideFooter')
    },
    beforeRouteEnter(to, from, next) {
      next();
    },
    activated() {
      var that = this
      if (!that.$route.meta.isBack) {
        // that.$store.dispatch('footerStatus/hideFooter')
        console.log(that.isShow)
      }
      that.$route.meta.isBack = false
    },
  }
</script>

<style scoped>

</style>
