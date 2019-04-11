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