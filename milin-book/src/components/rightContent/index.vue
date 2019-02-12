<template>
  <div class="right-content">
    <slot></slot>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
  .right-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #E8ECF0;
    flex: 1;
    overflow: auto;
  }
</style>
