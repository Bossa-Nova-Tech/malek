<template>
  <aside>
    <div v-if="!$screen.lg" class="header-mobile text-center">
      <img
        src="~/assets/img/bom-humor.png"
        width="140"
        class="my-5 profile rounded-circle"
      />
      <h4>Olá {{ $auth.user.name }},</h4>
      <p class="pb-3">acompanhe as ordens de serviço hoje</p>
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

          <p>Cobrança</p>
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
          <p>Orçamento</p>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/colaboradores">
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
                isActive: $route.name === 'colaboradores',
              }"
            />
          </svg>
          <p>Colaboradores</p>
        </NuxtLink>
      </li>
    </ul>

    <div
      v-if="$screen.lg"
      class="d-flex mt-5 align-items-center justify-content-between"
    >
      <div class="photo mr-2">
        <b-img src="~/assets/img/icones/icone-perfil.svg"></b-img>
        {{ $auth.user.photo }}
      </div>
      <div>
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
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>

<style lang="scss" scoped>
aside {
  padding-left: 3rem;
  ul {
    display: grid;
    gap: 20px;
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
</style>
