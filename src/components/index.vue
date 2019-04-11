<template>
  <div id="index">
    <mt-header title="首页"></mt-header>
    <!--商品分类-->
    <nav class="typesHeader flex">
      <div class="typesList" v-for="(goodstypes,$index) in goodsTypes" :key="goodstypes.id"
           v-on:click="toggle($index, goodstypes.id)" :class="{active:$index==active}">
        {{goodstypes.name}}
      </div>
    </nav>
    <!--商品列表-->
    <div class="flex main">
      <div class="goods_list" v-for="item in goodsList" :key="item.id">
        <div class="goods_img" v-on:click="goodsDetail(item.id)" :id="item.id">
          <img :src="item.img_url"/>
        </div>
        <div class="goods_name">{{item.name}}</div>
        <div class="goods_bottom flex">
          <div class="goods_bottom_left">
            <div class="goods_price">¥ {{item.price}}</div>
            <div class="goods_stock">库存 {{item.num}}</div>
          </div>
          <div class="goods_bottom_right flex">
            <i class="iconfont icon-jian"></i>
            <div v-if="item.shoppingcart.length>0" class="add_num">{{item.shoppingcart[0].productcount}}</div>
            <div v-else class="add_num">0</div>
            <i class="iconfont icon-jia1"></i>
          </div>
        </div>
      </div>
    </div>
    <tabbar :selected="selected" :tabs='tabs'></tabbar>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Ports from '@/utils/ports/ports.js'
  import tabbar from '@/components/tabbar'

  export default {
    name: 'index',
    components:{tabbar},
    data() {
      return {
        active: 0,
        goodsTypes: [],
        goodsList: [],
        selected:"index",
        tabs:[require("../assets/images/icons/home_green.png"),require("../assets/images/icons/cart_gray.png"), require("../assets/images/icons/my_gray.png")],
      }
    },
    methods: {
      toggle(index, id) {
        this.active = index
        console.log('toggle', index, id)
        this.goodslist(id) // 商品列表
      },
      goodsDetail(e) {
        console.log('点击商品', e)
        this.$router.push({path: '/indexGoodsDetail', query: {id: e}})
        // this.$router.push({name: 'indexGoodsDetail', params: {goodsId: e}})
      },
      // 商品列表
      goodslist: function (id) {
        var that = this
        that.$post(Ports.getProductList, {top_type: id, userid: 10118}).then((productList) => {
          console.log('---id----获取商品列表------：', id, productList.data)
          if (productList.state === 1) {
            that.goodsList = productList.data
          } else {
            console.log('请求错误')
          }
        })
      },
      // 商品分类
      goodstypes: function () {
        var that = this
        that.$post(Ports.getTypes, {}).then((getTypes) => {
          console.log('获取分类', getTypes)
          if (getTypes.state === 1) {
            that.goodsTypes = getTypes.data
            var goodsTypesId = getTypes.data[0].id
            that.goodslist(goodsTypesId) // 商品列表
          } else {
            console.log('请求错误')
          }
        })
      }
    },
    created() {
       // console.log('index created 创建')
    },
    mounted() {
      // console.log('index 安装 完成挂载')
      var that = this
      that.goodstypes() // 商品分类
    },
    updated() {
      // console.log('index  updated 更新')
    },
    destroyed() {
      // console.log('index destroyed 摧毁 ')
    },
    // 钩子函数来判断页面来源：
    beforeRouteEnter(to, from, next) {
      console.log('index beforeRouteEnter', from.name)
      if (from.name === 'indexGoodsDetail') { //判断是从哪个路由过来的，若是detail页面不需要刷新获取新数据，直接用之前缓存的数据即可
        to.meta.isBack = true;
      }
      next();
    },
    // keep-alive 组件激活时调用。
    activated() {
      var that = this
      console.log('index activated ', that.$route.meta.isBack)
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      if (!that.$route.meta.isBack) {
        // console.log('index activated----', '表明需要获取新数据，否则就不再请求，直接使用缓存的数据')
        that.selected = "index"
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      that.$route.meta.isBack = false
    },
    deactivated() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #index {width: 100%;}
  .flex {display: flex}
  .typesHeader{display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: middle;-ms-flex-align: middle;align-items: middle;overflow: auto;color: #000}
  .typesHeader .typesList{ text-align: center;font-size: 16px;-ms-flex-negative: 0;flex-shrink: 0;padding: 10px;}
  .typesHeader .active{color: red;}
  .main {padding: 5px 5px 60px 5px;flex-wrap: wrap;}
  .main .goods_list {width: 44%;margin: 15px 3%;box-sizing: border-box;}
  .main .goods_list .goods_img {width: 100%;display: flex;align-items: center;justify-content: center;border-radius: 8px;position: relative;background-color: #fff;}
  .main .goods_list .goods_img img {width: 100%;max-height: 10.1rem;}
  .main .goods_list .goods_name {font-size: 0.5rem;word-break: break-all;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;padding: 10px 0;height: 2.1rem;}
  .main .goods_list .goods_bottom_left .goods_price {font-size: 1rem;}
  .main .goods_list .goods_bottom_left .goods_stock {font-size: 0.5rem;color: #999;}
  .goods_list .goods_bottom {justify-content: space-between;align-items: center;}
  .goods_list .goods_bottom_right{align-items: center;}
  .goods_list .goods_bottom_right .iconfont{border-radius:50%;font-size:22px;}
  .goods_list .goods_bottom_right .icon-jian{color:#d8d7d7;background-color:#f2f2f2;}
  .goods_list .goods_bottom_right .add_num{min-width:30px;font-size: 10px;color:#F44D4D;text-align: center;}
  .goods_list .goods_bottom_right .icon-jia1{color:#ff811a;}
</style>
