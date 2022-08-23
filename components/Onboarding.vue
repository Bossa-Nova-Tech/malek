<template>
  <div class="animate">
    <Flicking :options="{ align: 'prev' }" :plugins="plugins">
      <section>
        <h1 class="primary-80">Seja bem vindo</h1>
        <div>
          <img
            src="~/assets/img/ilustracao/clipboard-desktop.png"
            alt=""
            class="desktop"
          />
          <img
            src="~/assets/img/ilustracao/clipboard.png"
            alt=""
            class="mobile"
          />
          <img
            src="~/assets/img/ilustracao/copo-cafe-direita.png"
            alt=""
            class="mobile"
          />
        </div>
        <p>
          Aqui você vai poder criar e enviar propostas comerciais, organizar a
          sua agenda e distribuir e acompanhar tarefas para a sua equipe
        </p>
      </section>

      <section>
        <h1 class="primary-80">Gestão de vendas</h1>
        <div>
          <img
            src="~/assets/img/ilustracao/tablet-desktop.jpg"
            alt=""
            class="desktop"
          />
          <img
            src="~/assets/img/ilustracao/copo-cafe-esquerda.png"
            alt=""
            class="mobile pb-3"
          />
          <img
            src="~/assets/img/ilustracao/tablet-direita.png"
            alt=""
            class="mobile"
          />
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
          <img
            src="~/assets/img/ilustracao/tablet-esquerda.png"
            alt=""
            class="mobile"
          />

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
  </div>
</template>
<script>
import { Flicking } from '@egjs/vue-flicking';
import '@egjs/flicking-plugins/dist/pagination.css';
import { Pagination } from '@egjs/flicking-plugins';
export default {
  name: 'Onboarding',
  components: {
    Flicking,
  },
  data: () => {
    return {
      plugins: [new Pagination({ type: 'bullet' })],
    };
  },
};
</script>

<style lang="scss" scoped>
.animate {
  animation: animate 1s;
}
@keyframes animate {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
section {
  width: 100%;
  padding-bottom: 5rem;

  div {
    display: flex;
    justify-content: space-between;
    min-height: 21.875rem;
    padding-bottom: 2.5rem;
    img {
      object-fit: contain;
    }

    .desktop {
      display: none;
    }
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

@media (min-width: 600px) {
  section {
    div {
      justify-content: center;
      .desktop {
        display: grid;
      }

      .mobile {
        display: none;
      }
    }
  }
}
</style>

<style>
.flicking-pagination-bullet-active {
  background-color: #0047bb;
}
</style>
