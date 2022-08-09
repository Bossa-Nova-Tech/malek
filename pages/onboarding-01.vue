<template>
  <main class="caixa mx-auto">
    <Flicking :options="{ align: 'prev' }" :plugins="plugins">
      <section class="pb-5">
        <h1 class="primary-80">Seja bem vindo</h1>
        <div>
          <img src="~/assets/img/ilustracao/clipboard.png" alt="" />
          <img src="~/assets/img/ilustracao/copo-cafe-direita.png" alt="" />
        </div>
        <p>
          Aqui você vai poder criar e enviar propostas comerciais, organizar a
          sua agenda e distribuir e acompanhar tarefas para a sua equipe
        </p>
      </section>

      <section>
        <h1 class="primary-80">Gestão de vendas</h1>
        <div>
          <img src="~/assets/img/ilustracao/copo-cafe-esquerda.png" alt="" />
          <img src="~/assets/img/ilustracao/tablet-direita.png" alt="" />
        </div>
        <p>
          Crie com poucos cliques propostas comerciais com a identidade visual
          da sua empresa
        </p>
      </section>

      <section>
        <h1 id="gerenciamento" class="primary-80">
          Gerenciamento <br />de tarefas
        </h1>
        <div>
          <img src="~/assets/img/ilustracao/tablet-esquerda.png" alt="" />
          <img id="caneta" src="~/assets/img/ilustracao/caneta.png" alt="" />
        </div>
        <p>
          Organize a agenda da semana sua e dos profissionais da sua equipe,
          para garantir mais produtividade
        </p>
      </section>

      <section>
        <h1 class="primary-80">Financeiro</h1>
        <div>
          <img
            class="mx-auto"
            src="~/assets/img/ilustracao/contas.png"
            alt=""
          />
        </div>
        <p>Organize contas a pagar e a receber em um só lugar</p>
      </section>
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
section {
  width: 100%;

  div {
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    max-height: 350px;
    padding-bottom: 2.5rem;
  }

  h1 {
    font-size: 1.5rem;
    line-height: 150%;
    text-align: center;
    font-weight: 700;
    padding-top: 5.875rem;
    padding-bottom: 4.375rem;
  }

  p {
    font-weight: 500;
    font-size: 0.938rem;
    line-height: 150%;
    text-align: center;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 3.75rem;
    color: var(--gray-40);
  }
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
