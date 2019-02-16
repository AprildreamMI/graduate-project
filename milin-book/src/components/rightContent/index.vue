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
    display: flex;
    flex-direction: column;
    background-color: #E8ECF0;
    padding: 20px 20px 0 20px;
    flex: 1;
    overflow: auto;
  }
</style>
