<template>
  <div>
    <header>
      <div v-if="$screen.lg">
        <div class="bg-separado"></div>

        <div class="titulo container">
          <img src="~/assets/img/logo-bg-white.png" width="140" />
          <div>
            <h1>Olá {{ $auth.user.name }},</h1>
            <p>Acompanhe por aqui o desempenho geral da sua empresa</p>
          </div>
        </div>
      </div>

      <div v-else class="mobile">
        <b-container class="d-flex align-items-center">
          <NuxtLink to="/painel-adm-atual">
            <img src="~/assets/img/icones/seta-voltar.svg" />
          </NuxtLink>
          <h1>Clientes</h1>
        </b-container>
      </div>
    </header>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  padding-bottom: 3.125rem;
  .bg-separado {
    height: 6.25rem;
    background-image: url(~/assets/img/top-painel-adm.svg);
    background-repeat: no-repeat;
    background-size: cover;
  }

  .titulo {
    display: flex;
    align-items: flex-end;

    img {
      position: relative;
      top: -30px;
      margin-right: 40px;
    }

    div {
      padding-bottom: 30px;
      h1 {
        font-size: 34px;
        color: var(--gray-60);
        font-weight: 500;
        padding-bottom: 10px;
      }

      p {
        font-size: 16px;
      }
    }
  }

  .mobile {
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
}
</style>
