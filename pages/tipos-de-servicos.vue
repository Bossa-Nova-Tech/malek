<template>
  <div>
    <PainelHeader :tela="telaName" />
    <main class="container p-0">
      <PainelAside v-if="$screen.lg" />
      <div
        v-if="!$screen.lg"
        class="div-botao d-flex justify-content-center align-items-center"
      >
        <b-img
          src="~/assets/img/icones/criar-4.svg"
          role="button"
          class="botao-criar"
          @click="criar"
        />
      </div>
      <div>
        <Listing :watching="telaName" :services-data="servicesData" />
        <Add />
        <div class="footer">
          <button @click="criar">Criar Serviço</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Add from '~/components/services/Add.vue';
import PainelHeader from '~/components/layout/PainelHeader.vue';
import PainelAside from '~/components/layout/PainelAside.vue';
import Listing from '~/components/services/Listing.vue';

export default {
  components: {
    Add,
    Listing,
    PainelHeader,
    PainelAside,
  },
  async asyncData({ $axios }) {
    const services = await $axios.get('services');
    const servicesData = services.data;
    return { servicesData };
  },
  data: () => {
    return {
      telaName: 'Tipos de Serviços',
      servicesData: [],
    };
  },

  head() {
    return {
      title: `Tipos de Serviços | ${process.env.title}`,
    };
  },
  methods: {
    criar() {
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
      width: 80px;
      margin-inline: auto;
      height: 80px;
      filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.22));
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
      background: var(--gray-10);
      padding: 1.5rem;
      position: inherit;
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
