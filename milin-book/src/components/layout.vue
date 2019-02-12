<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
  .layout {
    width: 100%;
    height: 100vh;
    display: flex;
  }
</style>
