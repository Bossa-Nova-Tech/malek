<template>
  <div>
    <header>
      <div v-if="$screen.lg">
        <div class="bg-separado"></div>

        <div class="titulo container">
          <img
            v-if="$auth.user.photo_url"
            :src="$auth.user.photo_url"
            width="140"
            height="140"
            class="profile rounded-circle"
          />
          <img
            v-else
            :src="photo_url"
            width="140"
            height="140"
            class="my-5 profile rounded-circle"
          />
          <div>
            <div class="d-flex align-items-center justify-content-center">
              <h1 class="mb-0">Olá {{ $auth.user.name }}</h1>
              <config />
            </div>
            <!-- <h1>Olá {{ $auth.user.name }},</h1>
            <config /> -->
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
  data() {
    return {
      photo_url: null,
    };
  },
  props: {
    tela: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    if (!this.$auth.user.photo_url) {
      const companie = await this.$axios.get(
        'companies/' + this.$auth.user.company_id,
      );
      const companieData = companie.data.logo_url;
      this.photo_url = companieData;
    }
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
