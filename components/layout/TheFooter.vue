<template>
  <footer class="push">
    <div class="container d-flex bg-white">
      <button class="mx-auto"><slot></slot></button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
};
</script>

<style lang="scss" scoped>
footer {
  background-color: #ffffff;
  box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.05);
  div {
    padding: 25px 0px 33px 0px;
    max-width: 20.625rem;
  }
  button {
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    color: #ffffff;
    background: #000066;
    border-radius: 8px;
    padding: 10px 0px 10px 0px;
  }
}
</style>
