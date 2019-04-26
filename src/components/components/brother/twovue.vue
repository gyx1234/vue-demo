<template>
  <div id="twovue">

  </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    name: "twovue",
    methods: {
      acceptList: function () {
        eventBus.$on('add', (message) => {
          this.lists.push({name: message, isFinish: false})
        })
      }
    },
    created: function () {
      this.acceptList()
    },
  }
</script>

<style scoped>

</style>
