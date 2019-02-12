<template>
  <div class="header header-fixed">
    <slot></slot>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
  .header {
    display: flex;
    width: 100%;
    height: 50px;
    background-color: white;
  }
</style>
