<template>
  <div>
    <header>
      <div class="bg-separado"></div>

      <div class="titulo container">
        <img src="~/assets/img/logo-bg-white.png" alt="" width="140" />
        <div>
          <h1>Olá Moisés,</h1>
          <p>Acompanhe por aqui o desempenho geral da sua empresa</p>
        </div>
      </div>
    </header>

    <aside class="container pl-5">
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
    </aside>
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
  img {
    position: relative;
    top: -30px;
    margin-right: 40px;
  }
  .titulo {
    display: flex;
    align-items: flex-end;
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
}

aside {
  a {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    img {
      width: 3.125rem;
      height: 3.125rem;
    }
    p {
      font-weight: 600;
      font-size: 1rem;
      color: var(--gray-60);
    }
  }
}
</style>
