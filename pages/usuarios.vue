<template>
  <div>
    <PainelHeader :tela="telaName" />
    <main class="container p-0">
      <PainelAside v-if="$screen.lg" />

      <div class="d-flex justify-content-center ajuste-width">
        <Listing :users="users" />
        <Add :customers-data="customersData" />

        <div v-if="!$screen.lg" class="footer">
          <button class="" @click="$bvModal.show('criar-usuario')">
            Criar Usuário
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import PainelHeader from '~/components/layout/PainelHeader.vue';
import PainelAside from '~/components/layout/PainelAside.vue';
import Add from '~/components/users/Add.vue';
import Listing from '~/components/users/Listing.vue';

export default {
  components: { PainelHeader, PainelAside, Add, Listing },
  layout: 'auth',

  async asyncData({ $axios }) {
    const customers = await $axios.get('customers');
    const customersData = customers.data;
    console.log('customers :: ', customers.data);
    const { data } = await $axios.get('users');
    const users = data;
    console.log('users :: ', users);
    return { customersData, users };
  },

  data: () => {
    return {
      telaName: 'Usuários',
      customersData: [],
      users: [],
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  max-height: 100%;
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
