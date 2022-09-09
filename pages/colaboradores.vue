<template>
  <div>
    <PainelHeader :tela="telaName" />
    <main class="container">
      <PainelAside />
      <div><h1>Div teste alinhamento</h1></div>
    </main>
  </div>
</template>

<script>
import PainelHeader from '~/components/layout/PainelHeader.vue';
import PainelAside from '~/components/layout/PainelAside.vue';

export default {
  components: { PainelHeader, PainelAside },

  data: () => {
    return {
      telaName: 'Colaboradores',
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>
