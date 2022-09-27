<template>
  <div>
    <PainelHeader :tela="telaName" />
    <main class="container p-0">
      <PainelAside v-if="$screen.lg" />

      <div class="d-flex justify-content-center ajuste-width">
        <Listing :customers-data="customersData" />
        <Add />

        <div v-if="!$screen.lg" class="footer">
          <button class="" @click="$bvModal.show('criar-cliente')">
            Cadastrar Cliente
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import PainelHeader from '~/components/layout/PainelHeader.vue';
import PainelAside from '~/components/layout/PainelAside.vue';
import Add from '~/components/customers/Add.vue';
import Listing from '~/components/customers/Listing.vue';

export default {
  components: { PainelHeader, PainelAside, Add, Listing },
  layout: 'auth',

  async asyncData({ $axios }) {
    const customers = await $axios.get('customers');
    const customersData = customers.data;
    console.log('customers :: ', customers.data);
    return { customersData };
  },

  data: () => {
    return {
      telaName: 'Clientes',
      customersData: [],
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3fr;
  .ajuste-width {
    max-width: 33rem;
    margin-inline: 5.5rem;
  }
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
    .ajuste-width {
      max-width: 33rem;
      margin-inline: 0rem;
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
  }
}
</style>
