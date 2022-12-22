<template>
  <div class="vh-100">
    <PainelHeader v-if="$screen.lg" :tela="telaName" />
    <main class="p-0">
      <PainelAside />
      <!-- <div v-if="$screen.lg" class="d-flex justify-content-center">
        <b-tabs pills class="mx-auto" align="center">
          <b-tab id="em-atraso" title="Em atraso" class="mt-4">
            <ListingPast :tasks-data="tasksDataOverdue" />
          </b-tab>

          <b-tab id="hoje" title="Hoje" active class="mt-4">
            <Listing :tasks-data="tasksData" />
          </b-tab>

          <b-tab id="futuras" title="Futuras" class="mt-4">
            <ListingFuture :tasks-data="tasksDataFuture" />
          </b-tab>

          <Add />

          <div class="footer">
            <button class="" @click="$bvModal.show('criar')">
              Criar Ordem de Serviço
            </button>
          </div>
        </b-tabs>
      </div> -->
    </main>
  </div>
</template>

<script>
import PainelHeader from '~/components/layout/PainelHeader.vue';
import PainelAside from '~/components/layout/PainelAside.vue';
/* import Add from '~/components/tasks/Add.vue';
import Listing from '~/components/tasks/Listing.vue';
import ListingPast from '~/components/tasks/ListingPast.vue';
import ListingFuture from '~/components/tasks/ListingFuture.vue'; */

export default {
  components: {
    /* Add,
    Listing,
    ListingPast,
    ListingFuture, */
    PainelHeader,
    PainelAside,
  },

  data: () => {
    return {
      telaName: 'Painel',
      tasksData: [],
    };
  },
  head() {
    return {
      title: `Painel | ${process.env.title}`,
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3fr;
  max-width: 71.25rem;
  margin-left: auto;
  margin-right: auto;

  .footer {
    width: 100%;
    height: 6rem;
    background: var(--gray-10);
    padding: 1.5rem;
    position: inherit;
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.05);
  }
}

@media screen and (max-width: 991px) {
  main {
    grid-template-columns: 1fr;

    .footer {
      width: 100%;
      height: 6rem;
      background: var(--gray-10);
      padding: 1.5rem;
      position: fixed;
      bottom: 0;
      box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
