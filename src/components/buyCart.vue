<template>
  <div id="buyCart" class="header_margintop ">
    <mt-header title="购物车" fixed></mt-header>

    <div class="checkbox main">
      <div v-for="(item,index) in cartList">
        <div v-if="item.productcount!=0" class="flex label_div">
          <label class="label_com flex label_box">
            <!-- v-model 双向数据绑定命令 -->
            <input class="checkItem label_left" type="checkbox" :value="item.productid" v-model="checkData"
                   v-on:click="checkOne($event, index, item.id, item.productid,item.productprice,item.productcount)">
            <div class="flex label_right">
              <div class="cart_img"><img :src="item.img_url"/></div>
              <div class="cart_ct flex">
                <div class="product_name">{{item.productname}}</div>
                <div class="product_price">¥ {{(item.productprice * item.productcount)|addZero}}</div>
              </div>
            </div>
          </label>
          <div class="flex icon_add">
            <i class="iconfont icon-jian"
               v-on:click="minTapp(index, item.productcount, item.productid, item.productname, item.productprice, item.unitname)"></i>
            <div class="add_num">{{item.productcount}}</div>
            <i class="iconfont icon-jia1"
               v-on:click="addTap(index, item.productcount, item.productid, item.productname, item.productprice, item.unitname)"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="footer_label flex">
      <label for="quan" class="label_com footer_checkbox flex">
        <input id="quan" type="checkbox" v-on:click="checkAll($event)">
        <div class="footer_checkbox_lt"> 全选</div>
      </label>
      <div class="footer_label_rt flex">
        <div class="total" v-model="cartList">合计：¥ {{tatalPrice|addZero}}</div>
        <div class="set_btn">结算</div>
      </div>
    </div>

    <tabbar :selected="selected" :tabs='tabs'></tabbar>
  </div>
</template>

<script>
  import tabbar from '@/components/tabbar'
  import Ports from '@/utils/ports/ports.js'
  import {Toast} from 'mint-ui';

  export default {
    name: "buyCart",
    components: {tabbar},
    data() {
      return {
        selected: "buyCart,hehe",
        tabs: [require("../assets/images/icons/home_gray.png"), require("../assets/images/icons/cart_green.png"), require("../assets/images/icons/my_gray.png")],
        cartList: [],
        checkData: [], // 双向绑定checkbox数据数组
        tatalPrice: 0,
        goodsPrice: [],
      }
    },
    watch: { // 监视双向绑定的数据数组
      checkData: { // 监视双向绑定的数组变化
        handler() {
          if (this.checkData.length == this.cartList.length) {
            document.querySelector('#quan').checked = true;
          } else {
            document.querySelector('#quan').checked = false;
          }
        },
        deep: true
      }
    },
    methods: {
      // 勾选单个商品
      checkOne(e, index, cartid, productid, productprice, productcount) {
        var that = this
        // console.log('勾选单个商品', e.target.checked, cartid, productid, productprice,productcount)
        console.log('勾选单个商品---单商品总价---', e, (Number(productprice) * Number(productcount)).toFixed(2))
        if (e.target.checked) {
          that.tatalPrice += Number(productprice) * Number(productcount)
          that.tatalPrice.toFixed(2)
        } else {
          that.tatalPrice -= Number(productprice) * Number(productcount)
          that.tatalPrice.toFixed(2)
        }
      },
      // 点击全选事件
      checkAll(e) {
        var that = this
        if (e.target.checked) {
          that.tatalPrice = 0
          that.cartList.forEach((el, i) => {
            // 数组里没有这一个value才push，防止重复push
            if (that.checkData.indexOf(el.productid) == '-1') {
              that.checkData.push(el.productid)
            }
            that.tatalPrice += (Number(el.productprice) * Number(el.productcount))
          })
        } else { // 全不选选则清空绑定的数组
          that.checkData = []
          that.tatalPrice = 0
        }
        // console.log(22222222, that.checkData)
      },
      // 减购物车
      minTapp(index, num, productid, name, price, unitname) {
        var that = this
        // console.log('减购物车', index, num, productid, name, price, unitname)
        // if (Number(that.cartList[index].productcount) === 0) {
        //   that.cartList[index].productcount === 0
        //   return
        // }
        that.$post(Ports.changeCart, {
          userid: 10118,
          Productid: productid,
          Productname: name,
          Productprice: price,
          Productcount: -1,
          Productunitname: unitname
        }).then((res) => {
          // console.log('减购物车', res)
          if (res.state === 1) {
            that.cartList[index].productcount--
            if (document.querySelector('#quan').checked) {
              that.tatalPrice -= Number(price)
            }
          } else {
            Toast({message: '减少失败', duration: 1000})
          }
        })
      },
      // 添加购物车
      addTap(index, num, productid, name, price, unitname) {
        // console.log('添加购物车',index, num, productid, name, price, unitname)
        var that = this
        if (Number(that.cartList[index].num) <= Number(that.cartList[index].productcount)) {
          Toast({message: '只有这么多了', duration: 1000})
          return
        }
        that.$post(Ports.changeCart, {
          userid: 10118,
          Productid: productid,
          Productname: name,
          Productprice: price,
          Productcount: 1,
          Productunitname: unitname
        }).then((res) => {
          // console.log('添加购物车', res)
          if (res.state === 1) {
            that.cartList[index].productcount++
            if (document.querySelector('#quan').checked) {
              that.tatalPrice += Number(price)
            }
          } else {
            Toast({message: '添加失败', duration: 1000});
          }
        })
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
    created() {
      // console.log('buyCart created 创建')
    },
    mounted() {
      // console.log('buyCart mounted 安装 完成挂载')
      var that = this
      // that.cartFn()
    },
    updated() {
      // console.log('buyCart updated 更新')
    },
    destroyed() {
      // console.log('buyCart destroyed 摧毁 ')
    },
    // 钩子函数来判断页面来源：
    beforeRouteEnter(to, from, next) {
      // console.log('buyCart beforeRouteEnter', to.meta.isBack)
      if (from.name === '') {
        to.meta.isBack = true;
      }
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
  .main{padding: 0px 10px 100px 10px;}
  #buyCart{}
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
  .label_div .icon_add .icon-jia1{color:#3ac9a7;}
  /*修改checkbox默认样式 start*/
  .label_com input[type='checkbox']{width: 20px;height: 20px;background-color: #fff;-webkit-appearance:none;border: 1px solid #c9c9c9;border-radius: 2px;outline: none;}
  .label_com input[type=checkbox]:checked{background: url("../assets/images/gou.png")no-repeat center;}
  /*修改checkbox默认样式 over*/
  .footer_label{padding: 0px 0px 55px 10px;position: fixed;bottom: 0;left: 0;right: 0;align-items: center;justify-content: space-between;background-color: #fff;height: 40px;background-color: #f2f2f2;}
  .footer_label .footer_checkbox{font-size: 13px;align-items: center;}
  .footer_label .footer_checkbox .footer_checkbox_lt{padding:0 5px; color:#666;}
  .footer_label .footer_label_rt{font-size: 13px;height: 40px;align-items: center;}
  .footer_label .footer_label_rt .total{padding: 0 5px;}
  .footer_label .footer_label_rt .set_btn{height: 40px;background-color: #3ac9a7;display: flex;align-items: center;width: 60px;text-align: center;justify-content: center;color: #fff;}
</style>
