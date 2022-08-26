<template>
  <div class="listing">
    <section class="overflow-auto">
      <h1 class="p-4">Clientes</h1>
      <ul class="p-4">
        <li
          v-for="customer in customersData"
          :key="customer.id"
          class="p-4 d-flex justify-content-between"
        >
          <p>#{{ customer.id }} {{ customer.name }}</p>
          <div>
            <img src="~/assets/img/icones/edit-icon.svg" alt="" />

            <img
              src="~/assets/img/icones/delete-icon.svg"
              alt=""
              @click="showModal(customer)"
            />
          </div>
          <Delete :customer="customer" />
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import Delete from '~/components/customers/Delete.vue';
export default {
  name: 'Listing',
  components: { Delete },
  props: {
    customersData: {
      type: Array,
      default: null,
    },
  },
  async asyncData({ $axios }) {
    const customers = await $axios.get('customers');
    const customersData = customers.data;
    console.log('customers :: ', customers.data);
    return { customersData };
  },
  data() {
    return {
      id: null,
      formSend: false,
      formData: {
        name: null,
        cnpj: null,
        phone: null,
        email: null,
        photo: null,
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
  methods: {
    showModal(customer) {
      this.id = customer.id;
      // this.$root.$emit('bv::show::modal', 'excluir', this.id);
      this.$bvModal.show(this.id);
      console.log(customer.id + ' chamado');
    },
  },
};
</script>
<style lang="scss" scoped>
.listing {
  padding-bottom: 5rem !important;
}
section {
  height: 33.5625rem;
  background: #fbfbfb;
  box-shadow: 0px 4px 4px rgba(0, 71, 187, 0.06);
  border-radius: 8px;
  h1 {
    background: #fbfbfb;
    width: 35.5625rem;
    box-shadow: 0px 4px 4px rgba(0, 71, 187, 0.06);
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--gray-20);
    p {
      font-weight: 600;
      font-size: 12px;
      color: var(--primary-80);
    }
    a {
      margin-right: 20px;
    }
  }
}
</style>
