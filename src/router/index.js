import Vue from 'vue'
import Router from 'vue-router'
// import index from '@/components/index.vue'
// import indexGoodsDetail from '@/components/indexGoodsDetail.vue'
// import mine from '@/components/mine.vue'
// import buyCart from '@/components/buyCart.vue'
// import mine_emit from '@/components/emit/mine_emit.vue'
// import brother from '@/components/brother/brother.vue'
// import timer from '@/components/timer.vue'
// import fuxiangzi_fu from '@/components/fuxiangzi/fuxiangzi_fu'
// import fuxiangzi_zi from '@/components/fuxiangzi/fuxiangzi_zi'
// import vuex01 from '@/components/vuex/vuex01.vue'
// import vuex02 from '@/components/vuex/vuex02.vue'

const indexVue = resolve => require(['@/components/index'], resolve)
const indexGoodsDetailVue = resolve => require(['@/components/indexGoodsDetail'], resolve)
const mineVue = resolve => require(['@/components/mine'], resolve)
const buyCartVue = resolve => require(['@/components/buyCart'], resolve)
const mine_emitVue = resolve => require(['@/components/emit/mine_emit'], resolve)
const brotherVue = resolve => require(['@/components/brother/brother'], resolve)
const timerVue = resolve => require(['@/components/timer'], resolve)
const fuxiangzi_fuVue = resolve => require(['@/components/fuxiangzi/fuxiangzi_fu'], resolve)
const fuxiangzi_ziVue = resolve => require(['@/components/fuxiangzi/fuxiangzi_zi'], resolve)

const vuex_Index = resolve => require(['@/components/vuex/vuex_index'], resolve)
const vuex01Vue = resolve => require(['@/components/vuex/vuex01'], resolve)
const vuex02Vue = resolve => require(['@/components/vuex/vuex02'], resolve)
const shuangX_index = resolve => require(['@/components/shuangxiang/shuangx_index'], resolve)
const shuangX_01 = resolve => require(['@/components/shuangxiang/shuangx_01'], resolve)
const shuangX_02 = resolve => require(['@/components/shuangxiang/shuangx_02'], resolve)
const shuangX_03 = resolve => require(['@/components/shuangxiang/shuangx_03'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: indexVue,
      meta: {
        keepAlive: true, //此组件需要被缓存
        isBack: false
      }
    },
    {
      path: '/indexGoodsDetail',
      name: 'indexGoodsDetail',
      component: indexGoodsDetailVue,
      meta: {
        keepAlive: true, //此组件需要被缓存
        isBack: false
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: mineVue,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/buyCart',
      name: 'buyCart',
      component: buyCartVue,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/emit/mine_emit',
      name: 'mine_emit',
      component: mine_emitVue,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/brother/brother',
      name: 'brother',
      component: brotherVue,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },

    {
      path: '/timer',
      name: 'timer',
      component: timerVue,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/fuxiangzi/fuxiangzi_fu',
      name: 'fuxiangzi_fu',
      component: fuxiangzi_fuVue,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/fuxiangzi/fuxiangzi_zi',
      name: 'fuxiangzi_zi',
      component: fuxiangzi_ziVue,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },{
      path: '/vuex/vuex_index',
      name: 'vuex_index',
      component: vuex_Index,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/vuex/vuex01',
      name: 'vuex01',
      component: vuex01Vue,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/vuex/vuex02',
      name: 'vuex02',
      component: vuex02Vue,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },{
      path: '/shuangxiang/shuangx_index',
      name: 'shuangx_index',
      component: shuangX_index,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },{
      path: '/shuangxiang/shuangx_01',
      name: 'shuangx_01',
      component: shuangX_01,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },{
      path: '/shuangxiang/shuangx_02',
      name: 'shuangx_02',
      component: shuangX_02,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },{
      path: '/shuangxiang/shuangx_03',
      name: 'shuangx_03',
      component: shuangX_03,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },

  ]
})
