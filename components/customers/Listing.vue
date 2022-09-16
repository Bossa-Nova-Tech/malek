<template>
  <section>
    <h1 class="p-4">Clientes</h1>
    <ul>
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
section {
  height: 33.5625rem;
  background: #fbfbfb;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 71, 187, 0.06);
  border-radius: 0.5rem;
  ul {
    overflow: auto;
    height: 80%;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.0625rem solid var(--gray-20);
      p {
        font-weight: 600;
        font-size: 0.75rem;
        color: var(--primary-80);
      }
      img {
        margin-left: 1.25rem;
        cursor: pointer;
      }
    }
  }
}
</style>
