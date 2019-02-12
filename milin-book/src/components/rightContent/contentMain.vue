<template>
  <div class="main">
      <slot></slot>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
  .main {
    position: relative;
    width: 100%;
    padding: 20px 20px 0 20px;
    flex: 1;
    min-width: 1090px;
    overflow: auto;
  }
</style>
