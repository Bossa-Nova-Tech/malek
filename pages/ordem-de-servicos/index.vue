<template>
  <div>
    <PainelHeader :tela="telaName" />
    <main class="container p-0">
      <PainelAside v-if="$screen.lg" />
      <div v-if="!$screen.lg" class="div-botao w-50 container justify-content-between d-flex align-items-center">
        <div>
          <b-img rel="preload" alt="botão para criar nova ordem de serviço" src="~/assets/img/icones/criar-4.svg" role="button" class="botao-criar" @click="criar" />
        </div>
        <b-button variant="primary" to="ordem-de-servicos/visitas">Visitas</b-button>
      </div>
      <div class="d-flex justify-content-center">
        <b-tabs pills class="mx-auto position-relative" align="center">
          <b-tab id="em-atraso" title="Em atraso" class="mt-4">
            <ListingPast :tasks-data="tasksDataOverdue" />
          </b-tab>

          <b-tab id="hoje" title="Hoje" active class="mt-4">
            <Listing :watching="telaName" :tasks-data="tasksData" />
          </b-tab>

          <b-tab id="futuras" title="Futuras" class="mt-4">
            <ListingFuture :tasks-data="tasksDataFuture" />
          </b-tab>
          <Add :customers-data="customersData" :watching2="chamarCliente" />

          <div class="footer">
            <button class="" @click="criar">Criar Ordem de Serviço</button>
          </div>
        </b-tabs>
      </div>
    </main>
  </div>
</template>

<script>
import Add from '~/components/tasks/Add.vue';
import PainelHeader from '~/components/layout/PainelHeader.vue';
import PainelAside from '~/components/layout/PainelAside.vue';
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
    const tasksOverdue = await $axios.get('tasks?status=overdue');
    const tasksDataOverdue = tasksOverdue.data;
    const tasksFuture = await $axios.get('tasks?status=future');
    const tasksDataFuture = tasksFuture.data;
    const customers = await $axios.get('customers');
    const customersData = customers.data;
    return { tasksData, tasksDataOverdue, tasksDataFuture, customersData };
  },

  data: () => {
    return {
      chamarCliente: null,
      telaName: 'Ordem de serviços',
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
  .btn {
    max-width: 6rem;
  }

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
