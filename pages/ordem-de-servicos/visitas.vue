<template>
  <div>
    <PainelHeader :tela="telaName" />
    <main class="container p-0">
      <PainelAside v-if="$screen.lg" />
      <div class="d-flex justify-content-center">
        <b-tabs pills class="mx-auto position-relative" align="center">
          <b-tab id="em-atraso" title="Em atraso" class="mt-4">
            <!-- <ListingPast :tasks-data="tasksDataOverdue" /> -->
          </b-tab>
          <b-tab id="hoje" title="Hoje" active class="mt-4">
            <Listing :visits-data="visitsData" />
          </b-tab>

          <b-tab id="futuras" title="Futuras" class="mt-4">
            <!-- <ListingFuture /> -->
          </b-tab>
        </b-tabs>
      </div>
    </main>
  </div>
</template>

<script>
import PainelHeader from '~/components/layout/PainelHeader.vue';
import PainelAside from '~/components/layout/PainelAside.vue';
import Listing from '~/components/tasks/visits/Listing.vue';
/* import ListingFuture from '~/components/tasks/visits/ListingFuture.vue';
import ListingPast from '~/components/tasks/visits/ListingPast.vue'; */

export default {
  components: {
    Listing,
    /* ListingFuture,
    ListingPast, */
    PainelHeader,
    PainelAside,
  },
  async asyncData({ $axios }) {
    const visits = await $axios.get('tasks?visits');
    const visitsData = visits.data;
    return { visitsData };
  },

  data: () => {
    return {
      chamarCliente: null,
      telaName: 'Visitas',
      visitsData: [],
    };
  },

  head() {
    return {
      title: `Ordem de Serviços | ${process.env.title}`,
    };
  },
  methods: {
    criar() {
      this.chamarCliente = 1;
      this.$bvModal.show('criar');
    },
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
    .div-botao {
      margin-top: -4rem !important;
      justify-self: end;
      height: 5rem;
      filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.22));
    }
    .botao-criar {
      animation: criar 1.5s ease-in-out;
    }
    @keyframes criar {
      0% {
        scale: 0;
      }

      50% {
        scale: 1.2;
      }
      100% {
        transform: rotate(1deg);
        scale: 1;
      }
    }

    .footer {
      width: 100%;
      height: 6rem;
      background: var(--primary-10);
      padding: 1.5rem;
      position: absolute;
      bottom: 0;
      box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.05);
    }
    .icone-criar {
      margin-top: -40px;
      animation: criar 1.5s ease-in-out;
    }
    @keyframes criar {
      0% {
        scale: 0;
      }

      50% {
        scale: 1.2;
      }
      100% {
        transform: rotate(1deg);
        scale: 1;
      }
    }
  }
}
</style>
