<template>
    <div id="brother" class="header_margintop ">
      <mt-header title="兄弟组件通信" fixed>
        <router-link to="" slot="left">
          <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
        </router-link>
      </mt-header>

      <onevue></onevue>
      <div>------------------------------</div>
      <twovue></twovue>
    </div>
</template>

<script>
  import onevue from '@/components/brother/onevue'
  import twovue from '@/components/brother/twovue'

  export default {
    name: "brother",
    components: {onevue,twovue},
    data() {
      return {
      }
    },
  }
</script>

<style scoped>

</style>
