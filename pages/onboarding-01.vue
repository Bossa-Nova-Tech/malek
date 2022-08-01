<template>
  <main>
    <Flicking :options="{ align: 'prev' }">
      <div class="flicking-panel">
        <h1 class="text-center malek-x">Seja bem vindo</h1>
        <div class="d-flex justify-content-between mx-auto cont-img">
          <img src="~/assets/img/ilustracao/blue clipboard.svg" alt="" />
          <img
            class="left"
            src="~/assets/img/ilustracao/cup of coffee right.svg"
            alt=""
          />
        </div>
        <img
          class="d-flex mx-auto"
          src="~/assets/img/ilustracao/dots-01.svg"
          alt=""
        />
        <p class="mx-auto">
          Aqui você vai poder criar e enviar propostas comerciais, organizar a
          sua agenda e distribuir e acompanhar tarefas para a sua equipe
        </p>
      </div>

      <div class="flicking-panel">
        <h1 class="text-center malek-x">Gestão de vendas</h1>
        <div class="d-flex justify-content-between mx-auto cont-img">
          <img src="~/assets/img/ilustracao/cup of coffee left.svg" alt="" />
          <img src="~/assets/img/ilustracao/Tablet-right.svg" alt="" />
        </div>
        <img
          class="d-flex mx-auto"
          src="~/assets/img/ilustracao/dots-02.svg"
          alt=""
        />
        <p class="mx-auto">
          Crie com poucos cliques propostas comerciais com a identidade visual
          da sua empresa
        </p>
      </div>
    </Flicking>
  </main>
</template>

<script>
import { Flicking } from '@egjs/vue-flicking';

export default {
  components: {
    Flicking,
  },
};
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
  max-height: 350px;
  padding-bottom: 2.5rem;
}

.cont-img img {
  width: 100%;
}
</style>
