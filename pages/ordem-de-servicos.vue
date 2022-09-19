<template>
  <div>
    <PainelHeader :tela="telaName" />
    <main class="container p-0">
      <PainelAside v-if="$screen.lg" />

      <div class="d-flex justify-content-center">
        <b-tabs pills class="mx-auto position-relative" align="center">
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
      </div>
    </main>
  </div>
</template>

<script>
import PainelHeader from '~/components/layout/PainelHeader.vue';
import PainelAside from '~/components/layout/PainelAside.vue';
import Add from '~/components/tasks/Add.vue';
import Listing from '~/components/tasks/Listing.vue';
import ListingPast from '~/components/tasks/ListingPast.vue';
import ListingFuture from '~/components/tasks/ListingFuture.vue';

export default {
  components: {
    Add,
    Listing,
    ListingPast,
    ListingFuture,
    PainelHeader,
    PainelAside,
  },
  async asyncData({ $axios }) {
    const tasks = await $axios.get('tasks?status=today');
    const tasksData = tasks.data;
    console.log('tasks :: ', tasks.data);
    const tasksOverdue = await $axios.get('tasks?status=overdue');
    const tasksDataOverdue = tasksOverdue.data;
    console.log('tasks :: ', tasksOverdue.data);
    const tasksFuture = await $axios.get('tasks?status=future');
    const tasksDataFuture = tasksFuture.data;
    console.log('tasks :: ', tasksFuture.data);
    return { tasksData, tasksDataOverdue, tasksDataFuture };
  },

  data: () => {
    return {
      telaName: 'Ordem de serviços',
      tasksData: [],
    };
  },

  head() {
    return {
      title: `Ordem de Serviços | ${process.env.title}`,
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3fr;

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
      background: var(--primary-10);
      padding: 1.5rem;
      position: absolute;
      bottom: 0;
      box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
