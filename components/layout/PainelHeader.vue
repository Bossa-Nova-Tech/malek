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
            v-if="photo_url"
            :src="photo_url"
            width="140"
            alt="foto"
            height="140"
            class="my-5 profile rounded-circle"
          />
          <div>
            <div class="d-flex align-items-center justify-content-center">
              <h1 class="mb-0">Olá {{ $auth.user.name }}</h1>
              <config
                :address="address"
                :photo_url="photo_url"
                :photo="photo"
                :state="state"
                :number="number"
                :city="city"
                :district="district"
                :cep="cep"
                :fantasy_name="fantasy_name"
                :name="name"
                :social_reason="social_reason"
                :cpf="cpf"
                :cnpj="cnpj"
                :complement="complement"
                :phone="phone"
                :email="email"
                :password="password"
                :state_registration="state_registration"
              />
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
            <img alt="seta para voltar" src="~/assets/img/icones/seta-voltar.svg" />
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
      password: null,
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
      const companiesData = companie.data;
      this.photo_url = companiesData.logo_url;
      if (!this.$auth.user.address) {
        this.address = companiesData.address;
      }
      this.email = this.$auth.user.email;
      if (!this.$auth.user.password) {
        this.password = companiesData.password;
      } else {
        this.password = this.$auth.user.password;
      }
      if (!this.$auth.user.district) {
        this.district = companiesData.district;
      } else {
        this.district = this.$auth.user.district;
      }
      if (!this.$auth.user.photo) {
        this.photo = companiesData.logo;
      }
      if (companiesData.fantasy_name) {
        this.fantasy_name = companiesData.fantasy_name
      }
      if (!this.$auth.user.number) {
        this.number = companiesData.number;
      }
      if (!this.$auth.user.complement) {
        this.complement = companiesData.complement;
      }
      if (!this.$auth.user.state) {
        this.state = companiesData.state;
      }
      if (!this.$auth.user.city) {
        this.city = companiesData.city;
      }
      if (!this.$auth.user.cep) {
        this.cep = companiesData.cep;
      }
      if (!this.$auth.user.cpf) {
        this.cpf = companiesData.cpf;
      }
      this.name = this.$auth.user.name;
      if (!this.$auth.user.photo) {
        this.photo = companiesData.photo;
      }
      if (!this.$auth.user.cnpj) {
        this.cnpj = companiesData.cnpj;
      }
      if (!this.$auth.user.phone) {
        this.phone = companiesData.phone;
      }
      this.state_registration = this.$auth.user.state_registration;
      this.social_reason = this.$auth.user.social_reason;
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
