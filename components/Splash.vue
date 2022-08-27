<template>
  <div :class="{ loader: true, fadeout: !isLoading }">
    <img
      id="splash"
      src="~/assets/img/android-chrome-512x512.png"
      alt=""
      width="400"
    />
  </div>
</template>
<script>
export default {
  name: 'Splash',
  props: {
    isLoading: Boolean,
  },
};
</script>
<style lang="scss" scoped>
#splash {
  display: flex;
  object-position: center;
  object-fit: contain;
  margin-inline: auto;
}

.loader {
  background-color: #ffffff;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: block;
  overflow: hidden;
  padding-top: 23vh;
  position: fixed;
}

.fadeout {
  animation: fadeout 2s forwards;
}

@keyframes fadeout {
  from {
    opacity: 100%;
  }
  to {
    opacity: 0%;
    visibility: hidden;
  }
}
</style>
