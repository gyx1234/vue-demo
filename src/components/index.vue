<template>
  <div id="index" class="header_margintop">
    <mt-header title="首页" fixed></mt-header>
    <!--商品分类-->
    <nav class="typesHeader flex ">
      <div class="typesList" v-for="(goodstypes,$index) in goodsTypes" :key="goodstypes.id"
           v-on:click="toggle($index, goodstypes.id)" :class="{active:$index==active}">
        {{goodstypes.name}}
      </div>
    </nav>
    <!--商品列表-->
    <div class="flex main">
      <div class="goods_list" v-for="(item, index) in goodsList" :key="item.id">
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
            <i v-if="item.shoppingcart.length>0" class="iconfont icon-jian" v-on:click="minTapp(index, item.num, item.id, item.name, item.price, item.unitname, 'gou', item.shoppingcart[0])" ></i>
            <div v-if="item.shoppingcart.length>0" class="add_num">{{item.shoppingcart[0].productcount}}</div>
            <!--<div v-else class="add_num"></div>-->
            <i class="iconfont icon-jia1" v-on:click="addTap(index, item.num, item.id, item.name, item.price, item.unitname, 'gou', item.shoppingcart[0])"></i>
          </div>
        </div>
      </div>
    </div>
    <tabbar :selected="selected" :tabs='tabs'></tabbar>
  </div>
</template>

<script>
  import Ports from '@/utils/ports/ports.js'
  import tabbar from '@/components/tabbar'
  import { Toast } from 'mint-ui'

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
        typeIndex: 0, // 首页默认显示哪条数据
      }
    },
    methods: {
      // 减购物车
      minTapp(index, num, id, name, price, unitname, gou, shoppingcart) {
        var that = this
        // console.log('减购物车',index, num, id, name, price, unitname, gou, shoppingcart)
        that.$post(Ports.changeCart, {userid: 10118, Productid: id, Productname: name, Productprice: price, Productcount: -1, Productunitname: unitname}).then((res) => {
          // console.log('减购物车', res)
          if (res.state === 1) {
            that.goodsList[index].shoppingcart[0].productcount--
            if(that.goodsList[index].shoppingcart[0].productcount === 0 ) {
              that.goodsList[index].shoppingcart.length = 0
            }
          } else {
            Toast({message: '减少失败',duration: 1000})
          }
        })
      },
      // 添加购物车
      addTap(index, num, id, name, price, unitname, gou, shoppingcart) {
        // console.log('添加购物车',index, num, id, name, price, unitname, gou, shoppingcart)
        var that = this
        // if (gou === 'gou') {
        // }
        if (num === '0') {
          Toast({message: '已售罄',duration: 1000})
          return
        }
        if (that.goodsList[index].shoppingcart[0] !== undefined) {
          if (Number(that.goodsList[index].shoppingcart[0].productcount) >= 999) {
            Toast({message: '商品添加数量已达到上限',duration: 1000});
            return
          }
          if (Number(that.goodsList[index].num) <= Number(that.goodsList[index].shoppingcart[0].productcount)) {
            Toast({message: '只有这么多了',duration: 1000})
            return
          }
        }
        that.$post(Ports.changeCart, {userid: 10118, Productid: id, Productname: name, Productprice: price, Productcount: 1, Productunitname: unitname}).then((res) => {
          // console.log('添加购物车', res)
          if (res.state === 1) {
            if (that.goodsList[index].shoppingcart[0] === undefined) {
              that.goodsList[index].shoppingcart.push({unitname: '', productcount: '1', productid: id, status: '1'})
              // 商品详情加
              that.proDeNum = 1
            } else {
              that.goodsList[index].shoppingcart[0].productcount++
            }
          } else {
            Toast({message: '添加失败',duration: 1000});
          }
        })
      },
      // 切换菜单
      toggle(index, id) {
        this.active = index
        console.log('toggle', index, id)
        this.typeIndex = index
        this.goodslist(id) // 商品列表
      },
      // 跳转详情页
      goodsDetail(e) {
        console.log('点击商品', e)
        this.$router.push({path: '/indexGoodsDetail', query: {id: e}})
        // this.$router.push({name: 'indexGoodsDetail', params: {goodsId: e}})
      },
      // 商品列表
      goodslist: function (id) {
        var that = this
        that.$post(Ports.getProductList, {top_type: id, userid: 10118}).then((productList) => {
          // console.log('---id----获取商品列表------：', id, productList.data)
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
          // console.log('获取分类', getTypes)
          if (getTypes.state === 1) {
            that.goodsTypes = getTypes.data
            var goodsTypesId = getTypes.data[that.typeIndex].id
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
      that.goodstypes()
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
      if (from.name === 'indexGoodsDetail' || from.name === 'mine') { //判断是从哪个路由过来的，若是detail页面不需要刷新获取新数据，直接用之前缓存的数据即可
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
        that.goodstypes() // 商品分类
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
  .main .goods_list .goods_img img {width: 100%;}
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
