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
            alt="foto"
            height="140"
            class="profile rounded-circle"
          />
          <img
            v-if="companiesData.logo_url"
            :src="companiesData.logo_url"
            width="140"
            alt="foto"
            height="140"
            class="profile rounded-circle"
          />
          <div>
            <div class="d-flex align-items-center mb-3">
              <h1 class="mb-0">Olá {{ $auth.user.name }}</h1>
              <config :companiesData="companiesData" />
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
            <img
              alt="seta para voltar"
              src="~/assets/img/icones/seta-voltar.svg"
            />
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
      companiesData: [],
      photo_url: null,
      address: null,
      number: null,
      district: null,
      city: null,
      cep: null,
      state: null,
      phone: null,
      complement: null,
      email: null,
      fantasy_name: null,
      cnpj: null,
      cpf: null,
      state_registration: null,
      social_reason: null,
      email: null,
      complement: null,
      photo: null,
      name: null,
      password: null,
    };
  },
  props: {
    tela: {
      type: String,
      default: null,
    },
  },
  async mounted() {
    const companie = await this.$axios.get(
      'companies/' + this.$auth.user.company_id,
    );

    this.companiesData = companie.data;
    this.companiesData = this.companiesData.data;

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
