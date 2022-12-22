<template>
  <div class="vh-100">
    <PainelHeader v-if="$screen.lg" :tela="telaName" />
    <main class="p-0">
      <PainelAside />
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
