<template>
  <div :class="{ fadeout: !loading }">
    <img src="~/assets/img/V1.webp" />
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true,
  }),
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  height: 100vh;
  width: 100%;
  place-items: center;
  background-color: #ffffff;
  position: absolute;
  z-index: 99;
  img {
    max-width: 300px;
    width: 100%;
  }
}
.fadeout {
  animation: fadeout 1s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
