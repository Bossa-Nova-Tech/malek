<template>
  <div class="d-flex flex-column">
    <header v-if="$screen.lg">
      <div class="top"></div>
      <div class="container">
        <div class="logo position-relative">
          <b-img src="~/assets/img/logo-desktop-painel.svg" alt="" />
        </div>
        <div class="hello d-flex flex-column mt-5">
          <h3>Olá {{ $auth.user.name }},</h3>
          <p>Acompanhe por aqui o desempenho geral da sua empresa</p>
        </div>
      </div>
    </header>
    <div class="d-flex">
      <AsideMenu />
      <Nuxt />
    </div>
  </div>
</template>
<script>
import AsideMenu from '~/components/layout/AsideMenu.vue';
export default {
  components: { AsideMenu },
};
</script>
<style lang="scss" scoped>
@media screen and (min-width: 992px) {
  .container {
    width: min(59.125rem, 100%);
    margin-inline: auto;
    padding-inline: 1.5rem;
  }
  header {
    .top {
      background: linear-gradient(82.86deg, #003283 -10.8%, #6d92d8 113.3%);
      min-height: 7.125rem;
      background: url('~/assets/img/top-painel-adm.svg');
      background-size: cover;
      background-repeat: no-repeat;
    }
    .logo {
      margin-top: -2.5625rem;
    }
    .hello {
      padding-left: 9.375rem;
      margin-bottom: 5rem;
    }
  }
  main {
    display: grid;
    grid-template-columns: 1fr 3fr;
    .create {
      height: 2.5rem;
    }
    h2 {
      font-size: 1.5rem;
    }
  }
}
</style>
