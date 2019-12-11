<template>
  <div>
    <ul>
      <li v-for="(val,index) in arrList" :key="index">
        <h5>{{val.productName}}</h5>
        <p>{{val.price}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions} from 'vuex';
  export default {
    name: 'conditionFilter',
    data() {
      return {
      }
    },
    computed:{
      // ...mapState({  //用mapState来获取collection.js里面的state的属性值
      //    arrList:state=>state.collection.collects
      // }),
      ...mapGetters('collection',{ //用mapGetters来获取collection.js里面的getters
        arrList:'renderCollects'
      })

    }
  }
</script>
