<template>
  <div class="box">
    <button @click="getAll">
      点击测试
    </button>
  </div>
</template>
<script>
import * as api from '../../api'
export default {
  data () {
    return {

    }
  },
  methods: {
    getAll () {
      api.getAll().then(res => {
        if (res.data.code === 0) {
          console.log(res.data.data)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
    margin: 0 auto;
    margin-top: 100px;
    button {
      width: 30px;
      height: 30px;
      background-color: blue;
      margin: 50px 50px;
    }
  }
</style>
