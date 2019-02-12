<template>
  <div class="left-sidebar">
    <slot></slot>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
  .left-sidebar {
    width: 190px;
    height: 100%;
    background-color: white;
    overflow: hidden;
  }
</style>
