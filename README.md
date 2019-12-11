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

    > 在两个兄弟组件之间通信，需要一个中间的桥梁，在这里我管叫 eventbus，我选择在src/assets/js/eventbus.js 中新建，就写如下两行:
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
                  sendToXiongEr:function() {
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

