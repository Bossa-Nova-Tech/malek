<template>
  <aside>
    <div v-if="!$screen.lg" class="header-mobile text-center">
      <img
        v-if="$auth.user.role === 'administrator' && companiesData.logo_url"
        alt="foto"
        :src="companiesData.logo_url"
        width="140"
        height="140"
        class="my-5 profile rounded-circle"
      />
      <img
        v-if="$auth.user.role !== 'administrator' && $auth.user.photo_url"
        alt="foto"
        :src="$auth.user.photo_url"
        width="140"
        height="140"
        class="my-5 profile rounded-circle"
      />

      <div class="d-flex align-items-center justify-content-center mb-2">
        <h4 class="mb-0">Olá {{ $auth.user.name }}</h4>

        <config :companies-data="companiesData" />
      </div>

      <p class="pb-3">Acompanhe as ordens de serviço hoje</p>
    </div>

    <ul>
      <li>
        <NuxtLink to="/propostas">
          <svg
            width="55"
            height="57"
            viewBox="0 0 55 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.375 24.6667L24.7917 30.0833L36.9792 17.8958M21.8125 46.875L25.7667 52.1472C26.3547 52.9313 26.6487 53.3233 27.0092 53.4635C27.3249 53.5862 27.6751 53.5862 27.9908 53.4635C28.3513 53.3233 28.6453 52.9313 29.2333 52.1472L33.1875 46.875C33.9814 45.8164 34.3784 45.2871 34.8626 44.883C35.5082 44.3442 36.2704 43.9631 37.0888 43.7699C37.7026 43.625 38.3643 43.625 39.6875 43.625C43.4733 43.625 45.3662 43.625 46.8593 43.0065C48.8502 42.1819 50.4319 40.6002 51.2565 38.6093C51.875 37.1162 51.875 35.2233 51.875 31.4375V16C51.875 11.4496 51.875 9.17436 50.9894 7.43633C50.2105 5.90751 48.9675 4.66454 47.4387 3.88557C45.7006 3 43.4254 3 38.875 3H16.125C11.5746 3 9.29936 3 7.56133 3.88557C6.03251 4.66454 4.78954 5.90751 4.01057 7.43633C3.125 9.17436 3.125 11.4496 3.125 16V31.4375C3.125 35.2233 3.125 37.1162 3.74348 38.6093C4.56812 40.6002 6.14984 42.1819 8.1407 43.0065C9.63384 43.625 11.5267 43.625 15.3125 43.625C16.6357 43.625 17.2973 43.625 17.9112 43.7699C18.7296 43.9631 19.4918 44.3442 20.1374 44.883C20.6216 45.2871 21.0186 45.8164 21.8125 46.875Z"
              stroke="#ff5a00"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="{
                isActive: $route.name === 'propostas',
              }"
            />
          </svg>

          <p>Propostas</p>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/ordem-de-servicos">
          <svg
            width="54"
            height="51"
            viewBox="0 0 54 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6 12.4136L23.4 23.0039M12.6 12.4136H5.4L3 5.3534L5.4 3L12.6 5.3534V12.4136ZM44.4216 4.7439L38.1153 10.9277C37.1649 11.8597 36.6896 12.3257 36.5116 12.863C36.355 13.3357 36.355 13.8449 36.5116 14.3175C36.6896 14.8549 37.1648 15.3209 38.1153 16.2528L38.6847 16.8112C39.6352 17.7432 40.1104 18.2092 40.6584 18.3838C41.1404 18.5374 41.6596 18.5374 42.1416 18.3838C42.6896 18.2092 43.1649 17.7432 44.1153 16.8112L50.0143 11.0268C50.6496 12.5427 51 14.2031 51 15.9437C51 23.0923 45.0902 28.8874 37.8 28.8874C36.9211 28.8874 36.0623 28.8031 35.2314 28.6424C34.0647 28.4168 33.4813 28.304 33.1276 28.3385C32.7517 28.3753 32.5664 28.4306 32.2332 28.6054C31.9199 28.7698 31.6055 29.078 30.9769 29.6945L13.8 46.5378C11.8118 48.4874 8.58823 48.4874 6.6 46.5378C4.61178 44.5882 4.61178 41.4272 6.6 39.4776L23.7769 22.6343C24.4055 22.0179 24.7199 21.7096 24.8876 21.4023C25.0658 21.0757 25.1222 20.894 25.1597 20.5253C25.1949 20.1785 25.0799 19.6065 24.8498 18.4624C24.6859 17.6477 24.6 16.8055 24.6 15.9437C24.6 8.79508 30.5098 3 37.8 3C40.2132 3 42.4752 3.635 44.4216 4.7439ZM27.0001 33.594L40.2 46.5376C42.1882 48.4872 45.4118 48.4872 47.4 46.5376C49.3882 44.5879 49.3882 41.427 47.3999 39.4774L36.5408 28.8292C35.772 28.7579 35.0225 28.6219 34.2979 28.4269C33.3641 28.1756 32.3399 28.358 31.6552 29.0294L27.0001 33.594Z"
              stroke="#ff5a00"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="{
                isActive: $route.name === 'ordem-de-servicos',
              }"
            />
          </svg>

          <p>Ordem de Serviço</p>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/clientes">
          <svg
            width="53"
            height="51"
            viewBox="0 0 53 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.6593 3L33.97 17.8107L50.3186 20.2003L38.489 31.7224L41.2808 48L26.6593 40.3107L12.0379 48L14.8297 31.7224L3 20.2003L19.3486 17.8107L26.6593 3Z"
              stroke="#ff5a00"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="{
                isActive: $route.name === 'clientes',
              }"
            />
          </svg>

          <p>Clientes</p>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/cobranca">
          <svg
            width="51"
            height="51"
            viewBox="0 0 51 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.625 31.5C17.625 34.3995 19.9755 36.75 22.875 36.75H27.75C30.8566 36.75 33.375 34.2316 33.375 31.125C33.375 28.0184 30.8566 25.5 27.75 25.5H23.25C20.1434 25.5 17.625 22.9816 17.625 19.875C17.625 16.7684 20.1434 14.25 23.25 14.25H28.125C31.0245 14.25 33.375 16.6005 33.375 19.5M25.5 10.875V14.25M25.5 36.75V40.125M48 25.5C48 37.9264 37.9264 48 25.5 48C13.0736 48 3 37.9264 3 25.5C3 13.0736 13.0736 3 25.5 3C37.9264 3 48 13.0736 48 25.5Z"
              stroke="#ff5a00"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="{
                isActive: $route.name === 'cobranca',
              }"
            />
          </svg>

          <p>Cobranças</p>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/orcamento">
          <svg
            width="46"
            height="51"
            viewBox="0 0 46 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.67 4.44L5.16 9.12C4.46479 10.0469 4.11718 10.5104 4.12524 10.8984C4.13226 11.236 4.29056 11.5526 4.55644 11.7608C4.86196 12 5.44131 12 6.6 12H39.9C41.0587 12 41.638 12 41.9436 11.7608C42.2094 11.5526 42.3677 11.236 42.3748 10.8984C42.3828 10.5104 42.0352 10.0469 41.34 9.12L37.83 4.44M8.67 4.44C9.066 3.912 9.264 3.648 9.51493 3.4576C9.73718 3.28895 9.98885 3.16312 10.2571 3.0865C10.56 3 10.89 3 11.55 3H34.95C35.61 3 35.94 3 36.2429 3.0865C36.5111 3.16312 36.7628 3.28895 36.9851 3.4576C37.236 3.648 37.434 3.912 37.83 4.44M8.67 4.44L4.44 10.08C3.90571 10.7924 3.63857 11.1486 3.44887 11.5408C3.28054 11.8889 3.15777 12.2572 3.08359 12.6367C3 13.0643 3 13.5095 3 14.4L3 40.8C3 43.3202 3 44.5804 3.49047 45.543C3.9219 46.3897 4.61031 47.0781 5.45704 47.5095C6.41965 48 7.67976 48 10.2 48L36.3 48C38.8202 48 40.0804 48 41.043 47.5095C41.8897 47.0781 42.5781 46.3897 43.0095 45.543C43.5 44.5804 43.5 43.3202 43.5 40.8V14.4C43.5 13.5095 43.5 13.0643 43.4164 12.6367C43.3422 12.2572 43.2195 11.8889 43.0511 11.5408C42.8614 11.1486 42.5943 10.7924 42.06 10.08L37.83 4.44M32.25 21C32.25 23.3869 31.3018 25.6761 29.614 27.364C27.9261 29.0518 25.6369 30 23.25 30C20.8631 30 18.5739 29.0518 16.886 27.364C15.1982 25.6761 14.25 23.3869 14.25 21"
              stroke="#ff5a00"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="{
                isActive: $route.name === 'orcamento',
              }"
            />
          </svg>
          <p>Orçamentos</p>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/usuarios">
          <svg
            width="56"
            height="51"
            viewBox="0 0 56 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M53 48V43C53 38.3404 49.8131 34.4252 45.5 33.315M36.75 3.7269C40.4148 5.21036 43 8.80328 43 13C43 17.1967 40.4148 20.7896 36.75 22.2731M40.5 48C40.5 43.3406 40.5 41.0109 39.7388 39.1732C38.7239 36.7229 36.7771 34.7761 34.3268 33.7612C32.4891 33 30.1594 33 25.5 33H18C13.3406 33 11.0109 33 9.17317 33.7612C6.72288 34.7761 4.77614 36.7229 3.7612 39.1732C3 41.0109 3 43.3406 3 48M31.75 13C31.75 18.5228 27.2728 23 21.75 23C16.2272 23 11.75 18.5228 11.75 13C11.75 7.47715 16.2272 3 21.75 3C27.2728 3 31.75 7.47715 31.75 13Z"
              stroke="#ff5a00"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="{
                isActive: $route.name === 'usuarios',
              }"
            />
          </svg>
          <p>Usuários</p>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/tipos-de-servicos">
          <b-img src="~/assets/img/icones/service-icon.svg"></b-img>

          <p>Serviços</p>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/formularios">
          <svg
            width="42"
            height="51"
            viewBox="0 0 42 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.56977 0C4.37445 0 0.904053 3.45045 0.904053 7.64577V43.3542C0.904053 47.5496 4.37472 51 8.56977 51H34.0572C38.2525 51 41.7179 47.5496 41.7179 43.3542V7.64577C41.7179 3.45045 38.2525 0 34.0572 0L8.56977 0ZM13.6702 10.201H28.9575C29.6338 10.1985 30.2834 10.4646 30.7637 10.9409C31.2436 11.4173 31.515 12.0651 31.5175 12.7414C31.5204 13.4213 31.2514 14.0741 30.7708 14.5547C30.2898 15.0353 29.637 15.3043 28.9575 15.3018H13.6702C12.9903 15.3042 12.3375 15.0353 11.8569 14.5547C11.376 14.0741 11.1074 13.4213 11.1099 12.7411C11.1127 12.0648 11.3838 11.4173 11.864 10.9409C12.344 10.4642 12.9939 10.1981 13.6702 10.201H13.6702ZM13.6702 20.402H21.3109C21.984 20.4045 22.6287 20.6731 23.1042 21.149C23.5802 21.6247 23.8485 22.2693 23.8513 22.9423C23.8552 23.6193 23.5895 24.2704 23.1131 24.7517C22.6364 25.2326 21.9882 25.5048 21.3109 25.5073H13.6701C12.9896 25.5101 12.3361 25.2405 11.8551 24.7584C11.3741 24.2767 11.1059 23.6228 11.1098 22.942C11.1126 22.2657 11.3837 21.6183 11.864 21.1415C12.3439 20.6651 12.9938 20.3991 13.6701 20.4019L13.6702 20.402ZM28.9566 20.402H28.957C29.6333 20.3995 30.2829 20.6656 30.7631 21.1419C31.243 21.6183 31.5145 22.2658 31.5169 22.9424C31.5209 23.623 31.2526 24.2772 30.772 24.7589C30.291 25.2405 29.6375 25.5102 28.9569 25.5074C28.2796 25.5049 27.631 25.2331 27.1547 24.7517C26.678 24.2704 26.4126 23.6194 26.4165 22.9424C26.419 22.2693 26.6876 21.6247 27.1632 21.1491C27.6392 20.6731 28.2839 20.4045 28.9569 20.402L28.9566 20.402ZM13.6702 30.6084H28.9575C29.6338 30.6056 30.2834 30.872 30.7633 31.3484C31.2436 31.8247 31.5147 32.4722 31.5175 33.1485C31.5147 33.8248 31.2436 34.4726 30.7633 34.949C30.2834 35.4254 29.6335 35.6915 28.9572 35.689H13.6707C12.9944 35.6915 12.3445 35.4254 11.8646 34.949C11.3843 34.4727 11.1132 33.8248 11.1104 33.1485C11.1132 32.4722 11.3843 31.8244 11.8646 31.348C12.3445 30.8717 12.9944 30.6056 13.6707 30.6081L13.6702 30.6084Z"
              fill="#FF5A00"
            />
          </svg>

          <p>Formulários</p>
        </NuxtLink>
      </li>
    </ul>

    <div
      v-if="$screen.lg"
      class="d-flex mt-5 align-items-center justify-content-between"
    >
      <div class="photo mr-2">
        <img
          v-if="companiesData.logo_url && $auth.user.role === 'administrator'"
          :src="companiesData.logo_url"
          width="50"
          height="50"
          class="rounded-circle"
        />
        <img
          v-else
          :src="$auth.user.photo_url"
          width="50"
          height="50"
          class="rounded-circle"
        />
      </div>
      <div class="mx-2">
        <p class="name">{{ $auth.user.name }}</p>
        <p class="email">{{ $auth.user.email }}</p>
      </div>
      <img
        src="~/assets/img/icones/logout-icon.svg"
        role="button"
        @click="logout"
      />
    </div>
  </aside>
</template>

<script>
import Config from '../Config.vue';
export default {
  components: { Config },
  data() {
    return {
      photo_url: null,
      photo: null,
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
      password: null,
      complement: null,
      name: null,
      companiesData: [],
    };
  },
  async mounted() {
    const companie = await this.$axios.get(
      'companies/' + this.$auth.user.company_id,
    );
    this.companiesData = companie.data;
    this.companiesData = this.companiesData.data;
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
aside {
  padding-left: 3rem;

  ul {
    display: grid;
    gap: 10px;

    li :hover {
      background-color: var(--primary-20);
      border-radius: 0.5rem;
    }

    a {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 10px;
      text-decoration: none;

      img {
        width: 3.125rem;
        height: 3.125rem;
      }

      p {
        font-weight: 600;
        font-size: 1rem;
        color: var(--gray-60);
        text-align: center;
      }
    }
  }

  .photo {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100px;
  }

  .name {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--gray);
  }

  .email {
    color: var(--gray);
    font-size: 0.75rem;
  }

  .isActive {
    fill: #ffc8aa;
  }
}

@media screen and (max-width: 991px) {
  aside {
    padding-left: 0rem;

    .profile {
      background-color: #ffffff;
    }

    .header-mobile {
      background: url(~/assets/img/bg-painel.png) no-repeat;
      background-size: cover;

      h4,
      p {
        color: var(--gray-10);
      }
    }

    ul {
      padding: 20px;
      margin-left: auto;
      margin-right: auto;
      max-width: 25rem;
      grid-template-columns: 1fr 1fr;

      li {
        background-color: var(--primary-20);
        border-radius: 0.5rem;
      }

      a {
        display: grid;
        justify-content: center;
        justify-items: center;
        padding: 20px;
      }
    }
  }
}

@media screen and (min-height: 1024px) and (max-width: 991px) {
  aside {
    padding-left: 0rem;

    .profile {
      background-color: #ffffff;
    }

    .header-mobile {
      background: url(~/assets/img/bg-painel.png) no-repeat;
      background-size: cover;

      h4,
      p {
        color: var(--gray-10);
      }
    }

    ul {
      padding: 20px;
      margin-inline: auto;
      min-width: 500px;
      grid-template-columns: 1fr 1fr;

      li {
        background-color: var(--primary-20);
        border-radius: 0.5rem;
        margin: 0.5rem;
        padding: 1rem;
      }

      a {
        display: grid;
        justify-content: center;
        justify-items: center;
      }
    }
  }
}
</style>
