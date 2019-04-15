<template>
  <div id="buyCart" class="header_margintop ">
    <mt-header title="购物车" fixed></mt-header>
    <div class="cart_header">购物车{{selected}}</div>

    <div class="checkbox main">

      <label for="quan" class="label_com">
        <input id="quan" type="checkbox" v-on:click="checkAll($event)"> 全选
      </label>
      <div v-for="(item,index) in cartList" class="flex label_div">
        <label class="label_com flex label_box">
          <!-- v-model 双向数据绑定命令 -->
          <input class="checkItem label_left" type="checkbox" :value="item.productid" v-model="checkData" v-on:click="checkOne(item.id, item.productid)">
          <div class="flex label_right">
            <div class="cart_img"><img :src="item.img_url"/></div>
            <div class="cart_ct flex">
              <div class="product_name">{{item.productname}}</div>
              <div class="product_price">¥ {{item.productprice}}</div>
            </div>
          </div>
        </label>
        <div class="flex icon_add">
          <i class="iconfont icon-jian" v-on:click="minTapp(index, item.productcount, item.id, item.productname, item.productprice, item.unitname, 'che')" ></i>
          <div class="add_num">{{item.productcount}}</div>
          <i class="iconfont icon-jia1" v-on:click="addTap(index, item.productcount, item.id, item.productname, item.productprice, item.unitname, 'che')"></i>
        </div>
      </div>

    </div>

    <tabbar :selected="selected" :tabs='tabs'></tabbar>
  </div>
</template>

<script>
  import tabbar from '@/components/tabbar'
  import Ports from '@/utils/ports/ports.js'
  import { Toast } from 'mint-ui';
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: "buyCart",
    components:{tabbar},
    data() {
      return {
        selected:"buyCart",
        tabs:[require("../assets/images/icons/home_gray.png"),require("../assets/images/icons/cart_green.png"), require("../assets/images/icons/my_gray.png")],
        cartList: [],
        checkData: [], // 双向绑定checkbox数据数组
      }
    },
    watch: { // 监视双向绑定的数据数组
      checkData: { // 监视双向绑定的数组变化
        handler(){
          if(this.checkData.length == this.cartList.length){
            document.querySelector('#quan').checked = true;
          }else {
            document.querySelector('#quan').checked = false;
          }
        },
        deep: true
      }
    },
    methods: {
      // 减购物车
      minTapp(index, num, id, name, price, unitname, gou) {
        var that = this
        console.log('减购物车',index, num, id, name, price, unitname, gou)
        // that.$post(Ports.changeCart, {userid: 10118, Productid: id, Productname: name, Productprice: price, Productcount: -1, Productunitname: unitname}).then((res) => {
        //   // console.log('减购物车', res)
        //   if (res.state === 1) {
        //     that.goodsList[index].shoppingcart[0].productcount--
        //     if(that.goodsList[index].shoppingcart[0].productcount === 0 ) {
        //       that.goodsList[index].shoppingcart.length = 0
        //     }
        //   } else {
        //     Toast({message: '减少失败',duration: 1000})
        //   }
        // })
      },
      // 添加购物车
      addTap(index, num, id, name, price, unitname, gou, shoppingcart) {
        console.log('添加购物车',index, num, id, name, price, unitname, gou)
        var that = this
        that.$post(Ports.changeCart, {userid: 10118, Productid: id, Productname: name, Productprice: price, Productcount: 1, Productunitname: unitname}).then((res) => {
          // console.log('添加购物车', res)
          if (res.state === 1) {
          } else {
            Toast({message: '添加失败',duration: 1000});
          }
        })
      },
      checkOne(cartid, productid) {
        console.log(22222, cartid, productid)
      },
      checkAll(e){ // 点击全选事件
        if(e.target.checked){
          this.cartList.forEach((el,i)=>{
            // 数组里没有这一个value才push，防止重复push
            if(this.checkData.indexOf(el.productid) == '-1'){
              this.checkData.push(el.productid);
            }
          });
        } else { // 全不选选则清空绑定的数组
          this.checkData = [];
        }
      },
      // 购物车列表
      cartFn: function () {
        var that = this
        that.$post(Ports.cartList, {userid: 10118}).then((res) => {
          console.log('购物车列表', res)
          if (res.state === 1) {
            that.cartList = res.data
          } else {
            console.log('请求错误')
          }
        })
      }
    },
    created () {
      // console.log('buyCart created 创建')
    },
    mounted () {
      // console.log('buyCart mounted 安装 完成挂载')
    },
    updated () {
      // console.log('buyCart updated 更新')
    },
    destroyed () {
      // console.log('buyCart destroyed 摧毁 ')
    },
    // 钩子函数来判断页面来源：
    beforeRouteEnter(to, from, next) {
      // console.log('buyCart beforeRouteEnter', to.meta.isBack)
      // if (from.name === '') { //判断是从哪个路由过来的，若是detail页面不需要刷新获取新数据，直接用之前缓存的数据即可
      //   to.meta.isBack = true;
      // }
      next();
    },
    // keep-alive 组件激活时调用。
    activated() {
      var that = this
      // console.log('buyCart activated ', that.$route.meta.isBack)
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      if (!that.$route.meta.isBack) {
        // console.log('buyCart activated----', '表明需要获取新数据，否则就不再请求，直接使用缓存的数据')
        that.selected = "buyCart"
        that.cartFn()
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      that.$route.meta.isBack = false
    }
  }
</script>

<style scoped>
  .flex {display: flex;}
  .cart_header{padding: 10px;}
  .main{padding: 0px 10px 60px 10px;}
  #buyCart .label_div{align-items: center;justify-content: space-between;border-bottom: 1px solid #ccc;}
  #buyCart .label_box{align-items: center;justify-content: space-between;}
  .label_box .label_left{width: 3vw}
  .label_right{}
  .cart_img{width: 80px;}
  .cart_img img{width: 100%;}
  .label_box .cart_ct{flex-direction: column;justify-content: space-between;padding: 6px 2px 12px;}
  .label_box .cart_ct .product_name{font-size: 0.5rem;word-break: break-all;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;height: 2.1rem;color: #666;width: 43vw; }
  .label_box .cart_ct .product_price{font-size: 12px;color:#FF262B;}
  .label_div .icon_add{align-items: center;}
  .label_div .icon_add .iconfont{border-radius:50%;font-size:22px;}
  .label_div .icon_add .icon-jian{color:#d8d7d7;background-color:#f2f2f2;}
  .label_div .icon_add .add_num{min-width:30px;font-size: 10px;color:#F44D4D;text-align: center;}
  .label_div .icon_add .icon-jia1{color:#ff811a;}
  .label_com input[type='checkbox']{width: 20px;height: 20px;background-color: #fff;-webkit-appearance:none;border: 1px solid #c9c9c9;border-radius: 2px;outline: none;}
  .label_com input[type=checkbox]:checked{background: url("../assets/images/gou.png")no-repeat center;}
</style>
