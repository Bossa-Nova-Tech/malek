<template>
  <main class="d-flex flex-column align-items-center">
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

        <NuxtLink to="/painel-tarefas-relatorio">
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
</template>

<script>
export default {
  layout: 'auth',
  head() {
    return {
      title: `Painel |  ${process.env.title}`,
    };
  },
};
</script>

<style lang="scss" scoped>
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
</style>
