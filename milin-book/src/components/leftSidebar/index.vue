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
    border-right: 1px solid $bg-color-gray;
    box-shadow:0px 1px 7px 2px rgba(40,51,73,0.2);
  }
</style>
