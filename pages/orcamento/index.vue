<template>
  <div class="pb-5">
    <PainelHeader :tela="telaName" />
    <main class="container">
      <PainelAside class="mobile" />
      <section>
        <div v-if="!$screen.lg" class="d-flex align-items-center mb-5">
          <b-form-input type="text" placeholder="Pesquisar"></b-form-input>
          <img
            rel="preload"
            class="ml-3"
            src="~/assets/img/icones/sliders.svg"
          />
        </div>
        <div v-else class="d-flex align-items-center mb-5">
          <button class="mr-4">Exportar</button>
          <button class="mr-4">Relatórios</button>
          <!--           <button @click="$bvModal.show('criar-orcamento')">Criar</button>
 -->
        </div>
        <Listing :budget-data="budgetsData" />
        <b-modal id="em-breve" hide-footer centered>
          <b-card class="animation-modal d-flex mx-auto">
            <h1 class="text-center">Em breve teremos a tela de orçamentos!</h1>
          </b-card>
        </b-modal>
        <Add />
      </section>
    </main>
  </div>
</template>

<script>
import PainelHeader from '~/components/layout/PainelHeader.vue';
import PainelAside from '~/components/layout/PainelAside.vue';
import Add from '~/components/budget/Add.vue';
import Listing from '~/components/budget/Listing.vue';

export default {
  components: { PainelHeader, PainelAside, Add, Listing },
  layout: 'auth',

  async asyncData({ $axios }) {
    const budgets = await $axios.get('budgets');
    const budgetsData = budgets.data;
    console.log('budgets :: ', budgets.data);
    return { budgetsData };
  },

  data: () => {
    return {
      telaName: 'Orçamentos',
      budgetsData: [],
    };
  },
  mounted() {
    this.$bvModal.show('em-breve');
  },
};
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: 1fr 3fr;

  section {
    padding-left: 3rem;
  }

  img {
    margin-right: 3rem;
  }

  button {
    width: 50%;
  }
}
.animation-modal h1 {
  transform-origin: center;
  animation: scaleAndColor 3s infinite ease-in-out;
}

@keyframes scaleAndColor {
  0% {
    transform: scale(1);
    color: #ff5a00;
  }
  50% {
    transform: scale(1.2);
    color: #ffae42;
  }
  100% {
    transform: scale(1);
    color: #ff8c00;
  }
}

@media (max-width: 1000px) {
  main {
    grid-template-columns: 1fr;

    section {
      padding-left: 0rem;
    }

    img {
      margin-right: 0rem;
    }

    .mobile {
      display: none;
    }
  }
}
</style>
