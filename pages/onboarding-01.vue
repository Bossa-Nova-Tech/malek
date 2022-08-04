<template>
  <main class="caixa mx-auto">
    <Flicking :options="{ align: 'prev' }" :plugins="plugins">
      <div class="pb-5 width-page">
        <h1 class="text-center malek-x">Seja bem vindo</h1>
        <div class="d-flex justify-content-between mx-auto cont-img">
          <img src="~/assets/img/ilustracao/clipboard.png" alt="" />
          <img
            class="left"
            src="~/assets/img/ilustracao/copo-cafe-direita.png"
            alt=""
          />
        </div>
        <p class="mx-auto">
          Aqui você vai poder criar e enviar propostas comerciais, organizar a
          sua agenda e distribuir e acompanhar tarefas para a sua equipe
        </p>
      </div>

      <div class="width-page">
        <h1 class="text-center malek-x">Gestão de vendas</h1>
        <div class="d-flex justify-content-between mx-auto cont-img">
          <img src="~/assets/img/ilustracao/copo-cafe-esquerda.png" alt="" />
          <img src="~/assets/img/ilustracao/tablet-direita.png" alt="" />
        </div>
        <p class="mx-auto">
          Crie com poucos cliques propostas comerciais com a identidade visual
          da sua empresa
        </p>
      </div>

      <div class="width-page">
        <h1 id="gerenciamento" class="text-center malek-x">
          Gerenciamento <br />de tarefas
        </h1>
        <div class="d-flex justify-content-between mx-auto cont-img">
          <img
            class="tablet-left"
            src="~/assets/img/ilustracao/tablet-esquerda.png"
            alt=""
          />
          <img id="caneta" src="~/assets/img/ilustracao/caneta.png" alt="" />
        </div>
        <p class="mx-auto">
          Organize a agenda da semana sua e dos profissionais da sua equipe,
          para garantir mais produtividade
        </p>
      </div>

      <div class="pb-5 width-page">
        <h1 class="text-center malek-x">Financeiro</h1>
        <div class="d-flex justify-content-between mx-auto cont-img">
          <img
            class="mx-auto"
            src="~/assets/img/ilustracao/contas.png"
            alt=""
          />
        </div>
        <p class="mx-auto">
          Organize contas a pagar e a receber em um só lugar
        </p>
      </div>
      <div slot="viewport" class="flicking-pagination"></div>
    </Flicking>
  </main>
</template>

<script>
import { Flicking } from '@egjs/vue-flicking';
import { Pagination } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/pagination.css';

export default {
  components: {
    Flicking,
  },
  data() {
    return {
      plugins: [new Pagination({ type: 'bullet' })],
    };
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

span {
  color: aqua;
}

.cont-img {
  max-height: 350px;
  padding-bottom: 2.5rem;
}

.width-page {
  width: 100%;
}
#gerenciamento {
  padding-bottom: 2.1rem;
}

#caneta {
  object-fit: contain;
}
</style>

<style>
.flicking-pagination-bullet-active {
  background-color: #0047bb;
}
</style>
