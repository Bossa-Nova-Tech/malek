<template>
  <header>
    <b-container class="d-flex align-items-center">
      <NuxtLink to="/painel-adm-atual">
        <img src="~/assets/img/icones/seta-voltar.svg" alt="" />
      </NuxtLink>
      <h1><slot></slot></h1>
    </b-container>
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
    color: #ffffff;
  }

  img {
    padding: 1.063rem 0rem 0rem 1.875rem;
  }
}
</style>
