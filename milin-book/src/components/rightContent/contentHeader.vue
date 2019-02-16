<template>
  <div class="header">
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
    height: 100px;
    min-width: 1090px;
    padding: 20px 20px 0 20px;
    background-color: white;
  }
</style>
