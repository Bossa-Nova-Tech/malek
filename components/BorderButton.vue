<template>
  <div>
    <button>
      <slot></slot>
    </button>
  </div>
</template>
<script>
export default {
  name: 'BorderButton',
};
</script>
<style lang="scss" scoped>
button {
  border: solid 0.0625rem var(--primary-60);
  background-color: #ffffff;
}
</style>
