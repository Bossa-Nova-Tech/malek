<template>
  <div>
    <header>
      <div v-if="$screen.lg">
        <div class="bg-separado"></div>

        <div class="titulo container">
          <img
            src="~/assets/img/bom-humor.png"
            width="140"
            class="rounded-circle"
          />
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
          <h1>{{ tela }}</h1>
        </b-container>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    tela: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  padding-bottom: 3.125rem;
  .bg-separado {
    height: 6.25rem;
    background-image: url(~/assets/img/top-painel.png);
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
      background-color: #ffffff;
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
    background: radial-gradient(
      106.17% 238.89% at 2.47% 100%,
      #ff762b 63.54%,
      #f4af2f 100%
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
