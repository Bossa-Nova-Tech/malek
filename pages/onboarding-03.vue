<template>
  <main>
    <h1 class="text-center malek-x">Gerenciamento <br />de tarefas</h1>
    <div class="d-flex justify-content-between mx-auto cont-img">
      <img src="~/assets/img/ilustracao/Tablet-left.svg" alt="" />
      <img src="~/assets/img/ilustracao/caneta.svg" alt="" />
    </div>
    <img
      class="d-flex mx-auto"
      src="~/assets/img/ilustracao/dots-03.svg"
      alt=""
    />
    <p class="mx-auto">
      Organize a agenda da semana sua e dos profissionais da sua equipe, para
      garantir mais produtividade
    </p>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 150%;
  padding-top: 5.875rem;
  padding-bottom: 4.375rem;
}
p {
  text-align: center;
  max-width: 300px;
  font-weight: 500;
  font-size: 0.938rem;
  line-height: 150%;
  padding-top: 3.75rem;
}

.cont-img {
  position: relative;
  max-width: 700px;
  padding-bottom: 2.5rem;
}

.left {
  position: absolute;
  right: 0px;
}
</style>
