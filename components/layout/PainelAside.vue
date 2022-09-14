<template>
  <aside>
    <div v-if="!$screen.lg" class="header-mobile text-center">
      <img src="~/assets/img/logo-bg-white.png" width="140" class="my-5" />
      <h4>Olá {{ $auth.user.name }},</h4>
      <p class="pb-3">acompanhe as ordens de serviço hoje</p>
    </div>

    <ul>
      <li>
        <NuxtLink to="/propostas">
          <img src="~/assets/img/icones/proposta.svg" alt="" />
          <p>Propostas</p>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/ordem-de-servicos">
          <img src="~/assets/img/icones/ordem.svg" alt="" />
          <p>Ordem de Serviço</p>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/clientes">
          <img src="~/assets/img/icones/clientes.svg" alt="" />
          <p>Clientes</p>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/cobranca">
          <img src="~/assets/img/icones/cobranca.svg" alt="" />
          <p>Cobrança</p>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/orcamento">
          <img src="~/assets/img/icones/orcamento.svg" alt="" />
          <p>Orçamento</p>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/colaboradores">
          <img src="~/assets/img/icones/colaboradores.svg" alt="" />
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
}

@media screen and (max-width: 991px) {
  aside {
    padding-left: 0rem;

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
