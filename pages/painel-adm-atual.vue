<template>
  <div class="div-geral">
    <header v-if="$screen.md">
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
    <main v-if="$screen.md" class="container">
      <aside v-if="$screen.md">
        <NuxtLink to="/propostas" class="d-flex my-4 align-items-center">
          <img src="~/assets/img/icones/proposta.svg" alt="" />
          <p class="pl-4">Propostas</p>
        </NuxtLink>
        <NuxtLink
          to="/ordem-de-servicos"
          class="d-flex align-items-center my-4"
        >
          <img src="~/assets/img/icones/ordem.svg" alt="" />
          <p class="pl-4 py-0">Ordem de Serviço</p>
        </NuxtLink>
        <NuxtLink to="/clientes" class="d-flex align-items-center my-4">
          <img src="~/assets/img/icones/clientes.svg" alt="" />
          <p class="pl-4">Clientes</p>
        </NuxtLink>

        <NuxtLink to="/cobranca" class="d-flex align-items-center my-4">
          <img src="~/assets/img/icones/cobranca.svg" alt="" />
          <p class="pl-4">Cobrança</p>
        </NuxtLink>
        <NuxtLink to="/orcamento" class="d-flex align-items-center my-4">
          <img src="~/assets/img/icones/orcamento.svg" alt="" />
          <p class="pl-4">Orçamento</p>
        </NuxtLink>

        <NuxtLink to="/colaboradores" class="d-flex align-items-center my-4">
          <img src="~/assets/img/icones/colaboradores.svg" alt="" />
          <p class="pl-4">Colaboradores</p>
        </NuxtLink>
      </aside>
      <div class="ml-5 d-flex">
        <div>
          <b-tabs pills class="mx-auto caixa w-100">
            <b-tab id="hoje" title="Hoje" active>
              <h2 class="mt-5 ml-3">Acontecendo Hoje</h2>
              <Listing :tasks-data="tasksData" />
            </b-tab>
            <b-tab id="relatorio" title="Relatório">b </b-tab>
          </b-tabs>
        </div>
        <div>
          <b-button
            class="create ml-2 m-0 border-0"
            @click="$bvModal.show('criar')"
            >Criar Ordem de Serviço</b-button
          >
        </div>
      </div>
    </main>
    <main v-else class="d-flex flex-column align-items-center">
      <header class="d-flex flex-column align-items-center">
        <img src="~/assets/img/logo-bg-white.png" alt="" />
        <h3>Olá {{ $auth.user.name }},</h3>
        <p>acompanhe as ordens de serviço hoje</p>
      </header>

      <section class="d-flex">
        <div class="m-auto">
          <NuxtLink to="/propostas">
            <img src="~/assets/img/icones/proposta.svg" alt="" />
            <p>Propostas</p>
          </NuxtLink>

          <NuxtLink to="/ordem-de-servicos">
            <img src="~/assets/img/icones/ordem.svg" alt="" />
            <p>Ordem de Serviço</p>
          </NuxtLink>

          <NuxtLink to="/clientes">
            <img src="~/assets/img/icones/clientes.svg" alt="" />
            <p>Clientes</p>
          </NuxtLink>

          <NuxtLink to="/cobranca">
            <img src="~/assets/img/icones/cobranca.svg" alt="" />
            <p>Cobrança</p>
          </NuxtLink>

          <NuxtLink to="/orcamento">
            <img src="~/assets/img/icones/orcamento.svg" alt="" />
            <p>Orçamento</p>
          </NuxtLink>

          <NuxtLink to="/colaboradores">
            <img src="~/assets/img/icones/colaboradores.svg" alt="" />
            <p>Colaboradores</p>
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Listing from '~/components/tasks/Listing.vue';
export default {
  components: { Listing },
  layout: 'auth',
  async asyncData({ $axios }) {
    const tasks = await $axios.get('tasks');
    const tasksData = tasks.data;
    console.log('tasks :: ', tasks.data);
    return { tasksData };
  },
  head() {
    return {
      title: `Painel |  ${process.env.title}`,
    };
  },
};
</script>

<style lang="scss" scoped>
.div-geral {
  height: 100vh;
}
main {
  header {
    background-image: url(~/assets/img/bg-painel.png);
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    font-weight: 500;
    line-height: 150%;
    color: var(--gray-10);
    img {
      padding: 3.125rem 0rem 1.875rem 0rem;
    }
    h3 {
      font-size: 1rem;
    }
    p {
      font-size: 0.75rem;
      padding-bottom: 1.25rem;
    }
  }
  section {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.9375rem;
      padding: 1.5625rem;
    }
    a {
      display: grid;
      width: 9.3125rem;
      height: 9.375rem;
      padding: 1.25rem 0.75rem 1.25rem 0.75rem;
      justify-items: center;
      background-color: var(--primary-10);
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
      text-align: center;
      color: var(--primary-80);
    }
  }
}
@media screen and (min-width: 768px) {
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
  aside > a {
    color: var(--gray-60);
    font-weight: 600;
  }
  aside {
    margin-bottom: 18.5rem;
  }
  main {
    display: grid;
    grid-template-columns: 1fr 3fr;
    .create {
      background: var(--primary-50);
      height: 2.5rem;
      border-radius: 8px;
    }
  }
}
</style>
