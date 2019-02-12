<template>
  <div class="main">
    <div class="main-content">
      <slot></slot>
    </div>
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
