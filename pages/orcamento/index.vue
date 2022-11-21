<template>
  <div class="pb-5">
    <PainelHeader :tela="telaName" />
    <main class="container">
      <PainelAside class="mobile" />
      <section>
        <div v-if="!$screen.lg" class="d-flex align-items-center mb-5">
          <b-form-input type="text" placeholder="Pesquisar"></b-form-input>
          <img class="ml-3" src="~/assets/img/icones/sliders.svg" />
        </div>
        <div v-else class="d-flex align-items-center mb-5">
          <button class="mr-4">Exportar</button>
          <button class="mr-4">Relatórios</button>
          <!--           <button @click="$bvModal.show('criar-orcamento')">Criar</button>
 -->
        </div>
        <Listing :budget-data="budgetsData" />

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
