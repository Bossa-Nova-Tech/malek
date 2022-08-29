<template>
  <div>
    <TheHeader> Clientes </TheHeader>
    <main>
      <div class="d-flex align-items-center mb-5">
        <b-form-input type="text" placeholder="Pesquisar"></b-form-input>
        <img class="ml-3 mr-5" src="~/assets/img/icones/sliders.svg" />
        <button @click="$bvModal.show('criar-cliente')">Criar clientes</button>
      </div>
      <Listing :customers-data="customersData" />
      <Add />
    </main>
  </div>
</template>

<script>
import TheHeader from '~/components/layout/TheHeader.vue';
import Add from '~/components/customers/Add.vue';
import Listing from '~/components/customers/Listing.vue';

export default {
  components: { TheHeader, Add, Listing },
  async asyncData({ $axios }) {
    const customers = await $axios.get('customers');
    const customersData = customers.data;
    console.log('customers :: ', customers.data);
    return { customersData };
  },

  data: () => {
    return {
      customersData: [],
      formSend: false,
      formData: {
        name: null,
        cnpj: null,
        phone: null,
        email: null,
        photo: [],
        address: null,
        cep: null,
        district: null,
        city: null,
        state: null,
        number: null,
        complement: null,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  display: grid;
  margin: auto;
  width: 35.5625rem;
  button {
    width: 300px;
    font-size: 1rem;
  }
}
</style>
