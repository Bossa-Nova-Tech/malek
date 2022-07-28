<template>
  <main class="d-flex">
    <NuxtLink to="/" class="card-adm">
      <img src="" alt="" />
      <span>Propostas</span>
    </NuxtLink>

    <NuxtLink to="/" class="card-adm">
      <img src="" alt="" />
      <span>Ordem de Serviço</span>
    </NuxtLink>

    <NuxtLink to="/" class="card-adm">
      <img src="" alt="" />
      <span>Clientes</span>
    </NuxtLink>

    <NuxtLink to="/" class="card-adm">
      <img src="" alt="" />
      <span>Cobrança</span>
    </NuxtLink>

    <NuxtLink to="/" class="card-adm">
      <img src="" alt="" />
      <span>Orçamento</span>
    </NuxtLink>

    <NuxtLink to="/" class="card-adm">
      <img src="" alt="" />
      <span>Colaboradores</span>
    </NuxtLink>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
main {
  background-color: #ffffff;
  height: 50vh;
}

.card-adm {
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  width: 149px;
  height: 150px;
  background: var(--malek-blue1);
  color: var(--malek-terciary);
  margin-left: 10px;
}
</style>
