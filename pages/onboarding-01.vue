<template>
  <main class="caixa mx-auto">
    <div :class="{ loader: true, fadeout: !isLoading }">
      <img
        id="splash"
        src="~/assets/img/android-chrome-512x512.png"
        alt=""
        width="400"
      />
    </div>
    <Flicking :options="{ align: 'prev' }" :plugins="plugins">
      <section>
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
        <p class="pb-4">Organize contas a pagar e a receber em um só lugar</p>
        <NuxtLink to="/cadastro-empresa-01">
          <button class="d-flex mx-auto">Começar</button>
        </NuxtLink>
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
  name: 'LoadingScreen',
  props: ['isLoading'],
  components: {
    Flicking,
  },
  data() {
    return {
      plugins: [new Pagination({ type: 'bullet' })],
    };
  },

  head() {
    return {
      title: `Onboarding |  ${process.env.title}`,
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  padding-bottom: 5rem;

  div {
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    max-height: 21.875rem;
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
    max-width: 18.75rem;
    margin-left: auto;
    margin-right: auto;
    padding-top: 3.75rem;
    color: var(--gray-40);
  }
  button {
    max-width: 300px;
    justify-content: center;
  }
}

#gerenciamento {
  padding-bottom: 2.1rem;
}

#caneta {
  object-fit: contain;
}

#splash {
  object-fit: contain;
}

.loader {
  background-color: #ffffff;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: block;
  overflow: hidden;
  padding-top: 23vh;
  position: fixed;
}

.fadeout {
  animation: fadeout 3s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>

<style>
.flicking-pagination-bullet-active {
  background-color: #0047bb;
}
</style>
