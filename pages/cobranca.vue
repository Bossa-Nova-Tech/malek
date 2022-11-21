<template>
  <div>
    <PainelHeader :tela="telaName" />
    <main class="container p-0">
      <PainelAside v-if="$screen.lg" />
      <div
        v-if="!$screen.lg"
        class="div-botao d-flex justify-content-center align-items-center"
      ></div>
      <div>
        <div class="footer" v-show="false">
          <button>Gerar cobrança</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import PainelHeader from '~/components/layout/PainelHeader.vue';
import PainelAside from '~/components/layout/PainelAside.vue';

export default {
  components: {
    PainelHeader,
    PainelAside,
  },
  data: () => {
    return {
      telaName: 'Cobranças',
    };
  },

  head() {
    return {
      title: `Cobranças | ${process.env.title}`,
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
