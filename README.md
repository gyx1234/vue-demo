# three

> A Vue.js project

``` bash
# 配置路由
>  路由方法：
   利用组件：<router-link to="/indexGoodsDetail">跳转详情页</router-link>

   利用js（携参）：
   1）this.$router.push({path: '/indexGoodsDetail', query: {id: e}})
       获取参数：this.$route.query.id
       query将参数显示在地址栏

   2）this.$router.push({name: 'indexGoodsDetail', params: {id: e}})
       获取参数：this.$route.params.id
       params携带的参数不会显示在地址栏

# 利用keep-alive实现 vue 缓存缓存问题
    beforeRouteEnter钩子函数来判断页面来源
    activated keep-alive 组件激活时调用

# 安装 Mint UI
   使用Header
   使用Tabbar：将Tabbar实现组件化，利用props动态传值改变选中状态
```

``` bash
# 目录结构
   index 首页
     indexGoodsDetail 商品详情页
   buyCart 购物车
   mine 我的

 组件
   tabber
```



``` bash
# 兄弟组件传值
    brother
        brother 引入onevue 和 twovue 两个组件
        onevue 发送组件
        twovue 接收组件

    >在两个兄弟组件之间通信，需要一个中间的桥梁，在这里我管叫 eventbus，我选择在src/assets/js/eventbus.js 中新建，就写如下两行:
        import Vue from 'vue';
        export default new Vue();

    > onevue 和 twovue 两个组件分包引入 eventbus.js
        onevue ：
            <template>
              <div>
                <h1>我是熊大</h1>
                <button @click="sendToXiongEr">Click Me</button>
              </div>
            </template>

            <script>
              import bus from '../../assets/js/eventbus.js'
              export default {
                name: 'onevue',
                methods: {
                  sendToXiongEr:function(){
                    //给熊二发送消息
                    //触发msgToXiongEr事件
                    bus.$emit("msgToXiongEr",'熊二，光头强来了');
                  }
                },
              };
            </script>
       twovue：
            <template>
              <div>
                <h1>我是熊二</h1>
                <div>{{msg}}</div>
              </div>
            </template>

            <script>
              import bus from '../../assets/js/eventbus.js'

              export default {
                name: "twovue",
                data() {
                  return {
                      msg: ''
                  }
                },
                methods: {
                  two() {
                    var that = this
                    bus.$on("msgToXiongEr",function(msg){
                      that.msg = msg
                      console.log("自定义的事件触发，接收到的数据"+msg);
                    })
                  }
                },
                beforeRouteEnter(to, from, next) {
                  next();
                },
                activated() {
                  this.msg=''
                  this.two()
                }
              }
           </script>

     > brother:
          <template>
              <div id="brother">
                <onevue></onevue>
                <twovue></twovue>
              </div>
          </template>
          <script>
            import onevue from '@/components/brother/onevue'
            import twovue from '@/components/brother/twovue'
            export default {
              name: "brother",
              components: {onevue,twovue},
            }
          </script>

```

``` bash

vuex 基础理解

state 设置的全局访问的state对象

getters 实时监听state值的变化(最新状态)

mutations 也是一个对象，这个对象里面可以放改变state的初始值的方法，具体的用法就是给里面的方法传入参数state或额外的参数,然后利用vue的双向数据驱动进行值的改变

actions 包含任意异步操作，异步触发mutations里面的方法，actions里面自定义的函数接收一个context参数和要变化的形参，context与store实例具有相同的方法和属性，所以它可以执行context.commit(' ')

```

``` bash

vuex数据结构以及读取方法
    step1：（数据初始化定义）state 定义视图所需的原始数据结构，并进行初始化；
    step2：（原始数据请求）使用action获取后台原始数据；
    step3：（数据提取与容错处理）使用mutations将数据存入state中
    tep4：数据调用。最后的数据调用方法省略，在视图中，可随意调用，结合getters可以实现多处调用的格式化（数据共享），结合mapState等方法，可以使代码更为简洁。

```