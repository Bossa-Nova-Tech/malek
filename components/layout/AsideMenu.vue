<template>
  <div>
    <aside v-if="$screen.md">
      <NuxtLink to="/propostas" class="d-flex my-4 align-items-center">
        <img src="~/assets/img/icones/proposta.svg" alt="" />
        <p class="pl-4">Propostas</p>
      </NuxtLink>
      <NuxtLink to="/ordem-de-servicos" class="d-flex align-items-center my-4">
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
      <div class="d-flex mt-5 align-items-center p-0">
        <div class="photo mr-2">
          <!-- <b-img :src="$auth.user.photo"></b-img> -->
          <b-img src="~/assets/img/icones/icone-perfil.svg"></b-img>
          {{ $auth.user.photo }}
        </div>
        <div>
          <p class="name">{{ $auth.user.name }}</p>
          <p class="email">{{ $auth.user.email }}</p>
        </div>
      </div>
    </aside>
  </div>
</template>
<script>
export default {
  name: 'AsideMenu',
};
</script>
<style lang="scss" scoped>
aside > a {
  color: var(--gray-60);
  font-weight: 600;
}
aside {
  margin-bottom: 18.5rem;
}
.photo {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100px;
}
.name,
.email {
  color: var(--gray);
}
.name {
  font-size: 0.8125rem;
  font-weight: 500;
}
.email {
  font-size: 0.75rem;
}
</style>
