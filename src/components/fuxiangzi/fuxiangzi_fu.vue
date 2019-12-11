<template>
  <div class="header_margintop ">

    <mt-header title="父组件向子组件传值-父组件" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>

    <div>父组件-----熊大</div>

    <br/>
    <hr/>
    <br/>

    <fuxiangzi_zi v-bind:fuvue="title"></fuxiangzi_zi>

  </div>
</template>

<script>
  import fuxiangzi_zi from '@/components/fuxiangzi/fuxiangzi_zi'

  export default {
    name: "fuxiangzi_fu",
    data() {
      return {
        title: '我是熊大啊',
      }
    },
    components: {fuxiangzi_zi},
    methods: {},
    mounted() {
      console.log('父组件')
    },
  }
</script>

<style scoped>

</style>
