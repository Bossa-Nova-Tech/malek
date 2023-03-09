<template>
  <div>
    <PainelHeader :tela="title"/>
    <main class="container p-0">
      <PainelAside v-if="$screen.lg"/>
      <div
        v-if="!$screen.md"
        class="div-botao d-flex justify-content-center align-items-center"
      >
        <b-img
          src="~/assets/img/icones/criar-4.svg"
          role="button"
          class="botao-criar"
          @click.prevent="$bvModal.show('criar')"
        />
      </div>
      <div>
        <Listing :services="services" v-on:updateServices="search" />
        <Add/>
        <div v-show="$screen.md" class="footer">
          <button @click.prevent="$bvModal.show('criar')">Criar Serviço</button>
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

  data: () => {
    return {
      title: 'Tipos de Serviços',
      services: [],
    };
  },

  head() {
    return {
      title: `Tipos de Serviços | ${process.env.title}`,
    };
  },
  beforeMount() {
    this.fetchServices()
  },
  methods: {
    async fetchServices() {
      await this.$axios
        .get('services')
        .then((response) => {
          this.services = response.data.data
        })
        .catch((error) => {
          console.error(error)
          this.toast(
            'error',
            'Whoops...',
            'Ocorreu um erro ao buscar informações.'
          )
        });
    },

    search() {
      console.log('search')
    }
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
