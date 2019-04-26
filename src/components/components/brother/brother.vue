<template>
    <div id="brother">
      <mt-header title="兄弟组件通信" fixed>
        <router-link to="" slot="left">
          <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
</template>

<script>
    export default {
        name: "brother"
    }
</script>

<style scoped>

</style>
