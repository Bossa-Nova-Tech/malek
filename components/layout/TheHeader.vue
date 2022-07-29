<template>
  <header class="d-flex align-items-center">
    <NuxtLink to="/">
      <img src="~/assets/img/icones/seta-voltar.svg" alt="" />
    </NuxtLink>
    <h1><slot></slot></h1>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>

<style lang="scss" scoped>
header {
  color: #ffffff;
  background: radial-gradient(
    108.61% 221.61% at 104.58% 0%,
    #76b4ff 0%,
    #0f4181 100%
  );
  margin-bottom: 1.25rem;

  h1 {
    padding: 3.313rem 0rem 2.188rem 2.813rem;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 150%;
    margin-bottom: 0px;
  }

  img {
    padding: 1.063rem 0rem 0rem 1.875rem;
  }
}
</style>
