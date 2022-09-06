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
  border: solid 0.0625rem var(--primary-80);
  background-color: var(--gray-10);
  color: var(--primary-50);
  padding: 5px 10px;
}
</style>
