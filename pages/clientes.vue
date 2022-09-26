<template>
  <div class="vh-100 overflow-hidden">
    <PainelHeader :tela="telaName" />
    <main class="container p-0">
      <PainelAside v-if="$screen.lg" />
      <section>
        <Listing :customers-data="customersData" />
        <Add />
        <div class="push"></div>
        <div class="footer">
          <button v-if="!$screen.lg" @click="$bvModal.show('criar-cliente')">
            Criar clientes
          </button>
        </div>
      </section>
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
  display: grid;
  grid-template-columns: 1fr 3fr;

  section {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  img {
    margin-right: 3rem;
  }

  button {
    width: 50%;
  }
}

@media screen and (max-width: 992px) {
  main {
    grid-template-columns: 1fr;

    section {
      padding-left: 0rem;
      padding-right: 0rem;
    }

    img {
      margin-right: 0rem;
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

    button {
      width: 100%;
    }
  }
}
</style>
