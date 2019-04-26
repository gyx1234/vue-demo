import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import indexGoodsDetail from '@/components/indexGoodsDetail.vue'
import mine from '@/components/mine.vue'
import buyCart from '@/components/buyCart.vue'
import mine_emit from '@/components/emit/mine_emit.vue'
import brother from '@/components/brother/brother.vue'

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
    },
    {
      path: '/emit/mine_emit',
      name: 'mine_emit',
      component: mine_emit,
      meta: {
        keepAlive: true, //此组件需要被缓存
        isBack: false
      }
    },
    {
      path: '/brother/brother',
      name: 'brother',
      component: brother,
      meta: {
        keepAlive: true, //此组件需要被缓存
        isBack: false
      }
    }
  ]
})
