import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import indexGoodsDetail from '@/components/indexGoodsDetail.vue'
import mine from '@/components/mine.vue'
import buyCart from '@/components/buyCart.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        keepAlive: true, //此组件需要被缓存
        isBack: false
      }
    },
    {
      path: '/indexGoodsDetail',
      name: 'indexGoodsDetail',
      component: indexGoodsDetail,
      meta: {
        keepAlive: true, //此组件需要被缓存
        isBack: false
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine,
      meta: {
        keepAlive: true, //此组件需要被缓存
        isBack: false
      }
    },
    {
      path: '/buyCart',
      name: 'buyCart',
      component: buyCart,
      meta: {
        keepAlive: true, //此组件需要被缓存
        isBack: false
      }
    }
  ]
})
