<template>
  <div>
    <b-button variant="outline-primary border-1"><slot></slot></b-button>
  </div>
</template>
<script>
export default {
  name: 'BorderButton',
};
</script>
<style lang="scss" scoped>
.outline-primary {
  border-color: var(--primary-60);
}
</style>
