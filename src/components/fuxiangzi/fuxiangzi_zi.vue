<template>
  <div class="mian">
    <div>熊二-------子组件：</div>
    <p>01：{{fuvue}}</p>

  </div>
</template>

<script>
    export default {
      name: "fuxiangzi_zi",
      props:['fuvue'],
      data() {
        return {
        }
      },
      methods: {
      },
      mounted() {
        console.log('子组件',this.fuvue)
      },
    }
</script>

<style scoped>
.mian{color:#0acf97;}
</style>
