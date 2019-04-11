<template>
  <div id="indexGoodsDetail">
    <mt-header title="详情页" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="goods_img">
      <img :src="goodsDetail.img_url"/>
    </div>
    <div class="detail_main">
      <div class="detail_name">
        {{goodsDetail.name}}
      </div>
      <div class="detail_nums">
        当前库存 {{goodsDetail.num}}
      </div>
      <div class="detail_price">
        <span>¥</span> {{goodsDetail.price}}
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import Ports from '@/utils/ports/ports.js'

  export default {
    name: "indexGoodsDetail",
    data() {
      return {
        goodsId: '',
        goodsDetail: {}
      }
    },
    methods: {
			// 商品列表
			details: function (id) {
			  var that = this
			  console.log('商品詳情id-------')
			  that.$post(Ports.getProductDetails, {id: id}).then((res) => {
			    console.log('获取商品列表', res)
			  })
			},
    },
    created() {
      // console.log('indexGoodsDetail created 创建')
    },
    mounted() {
      // 	console.log('indexGoodsDetail mounted 安装 完成挂载')
      // var that = this
      // var goodsId = this.$route.query.goodsId
      // var goodsId = this.$route.params.goodsId
      // that.goodsId = goodsId

      // that.$post(Ports.getProductDetails, {id: 1514,userid: 10118}).then((res) => {
      //   console.log('获取商品列表', res)
      // })

    },
    updated() {
      // console.log('indexGoodsDetail updated 更新')
    },
    destroyed() {
      // console.log('indexGoodsDetail destroyed 摧毁 ')
    },
    // 钩子函数来判断页面来源：
    beforeRouteEnter(to, from, next) {
      console.log('indexGoodsDetail beforeRouteEnter', to.meta.isBack)
      if (from.name === 'mine') { //判断是从哪个路由过来的，若是detail页面不需要刷新获取新数据，直接用之前缓存的数据即可
        to.meta.isBack = true;
      }
      next();
    },
    // keep-alive 组件激活时调用。
    activated() {
      // Toast('提示信息');
      var that = this
      console.log('indexGoodsDetail activated ', that.$route.meta.isBack)
      if (!that.$route.meta.isBack) {
        console.log('indexGoodsDetail activated----', '表明需要获取新数据，否则就不再请求，直接使用缓存的数据')
        // var goodsId = this.$route.params.goodsId
        var goodsId = this.$route.query.id
        this.goodsId = goodsId
        console.log('indexGoodsDetail activated：', goodsId)
        that.$post(Ports.getProductDetails, {id: this.goodsId,userid: 10118}).then((res) => {
          console.log('获取商品详情', res)
          that.goodsDetail = res.data
        })
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      that.$route.meta.isBack = false
    }
  }
</script>

<style scoped>
  .goods_img{width: 100%;height: 40vh;display: flex;align-items: center;justify-content: center;}
  .goods_img img{height: 100%}
  .detail_main{padding: 10px;}
  .detail_main .detail_name{overflow:hidden;text-overflow:-o-ellipsis-lastline;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;word-wrap:break-word;font-size: 16px;}
  .detail_nums{padding:10px 0;color: #999;font-size: 13px;}
  .detail_price{font-size: 18px;color:#FF262B;font-family:Helvetica;}
  .detail_price span{font-size: 13px;}
</style>
