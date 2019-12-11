<template>
  <div class="header_margintop ">
    <mt-header title="监听计时器" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <div>{{one_time}}</div>
    <div>{{fontSize}}</div>

    <div>输入框-watch</div>
    <input type="text" v-model="onename"/>
    <div>输入框-computed</div>
    请输入1：<input type="text" v-model="firstname"/>
    <br>
    <br>
    请输入2：<input type="text" v-model="lastname"/>
    <br>
    <br>
    结果1-2：<input type="text" v-model="threename" disabled/>
    <br>
    <br>
    computed：<input type="text" v-model="forname"/>
    <br>
  </div>
</template>

<script>

  var timer_one = null

  export default {
    name: "timer",
    data() {
      return {
        one_time: '',
        fontSize: '字体',
        onename: '',
        firstname: '',
        lastname: '',
        threeOne: 'computed-set',
      }
    },
    computed: {

      // threename 不可在data里面定义,
      threename: function () {
        // console.log('threename-输入框-computed：',this.fullname)
        return this.firstname + "-" + this.lastname
      },
      // get和set用法
      forname: {
        get() {
          return this.threeOne
        },
        set(val) {
          //监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
          //val就是fullName的最新属性值
          console.log('forname-set-输入框-computed：', val)
        }
      }
    },
    watch: {
      onename: function () {
        console.log('输入框内容-watch', this.onename)
      },
      fontSize: function (newValue, oldValue) {
        this.fontSize = '字体后'
        // console.log(newValue,oldValue)
        // console.log(`字体后 value: ${oldValue} -> ${newValue}`);
      },
    },
    methods: {
      timeOne(endTimer) {
        var hour = 0
        var minute = 0
        var second = 0
        var nowTime = new Date()
        var ts = nowTime.getTime()
        var now = Math.round(ts / 1000).toString()
        // 时间差
        var leftTime = endTimer - now
        var day = 0 // 天
        if (leftTime >= 0) {
          day = Math.floor(leftTime / 60 / 60 / 24) // 天
          hour = Math.floor(leftTime / 60 / 60 % 24) // 小时（24小时内）
          minute = Math.floor(leftTime / 60 % 60)
          second = Math.floor(leftTime % 60)
          // leftTime--
        }
        if (day <= 9) day = '0' + day
        if (hour <= 9) hour = '0' + hour
        if (minute <= 9) minute = '0' + minute
        if (second <= 9) second = '0' + second
        return day + '天' + hour + '小时' + minute + '分' + second + '秒'
      },
    },
    mounted() {
      var that = this
      // var nowTime = new Date()
      // var ts = nowTime.getTime()
      // var now = Math.round(ts / 1000).toString()
      // console.log('时间时间时间', ts, now)
      clearInterval(timer_one) // 防止数据请求两次  清除计时器
      // timer_one = setInterval(function () {
      that.one_time = that.timeOne(1561234653)
      // console.log(111111, that.timeOne(1560234653))
      // }, 1000)

    },
    destroyed() {
      // console.log('timer destroyed 摧毁 ')
      fontSize()
    },
    beforeRouteEnter(to, from, next) {
      next();
    },
    activated() {
      var that = this
      if (!that.$route.meta.isBack) {
        that.fontSize = '字体前'
      }
      that.$route.meta.isBack = false
    },
  }
</script>

<style scoped>

</style>
