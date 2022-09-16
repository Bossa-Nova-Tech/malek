<template>
  <section>
    <h1 class="p-4">Orçamento</h1>
    <ul>
      <li
        v-for="budget in budgetsData"
        :key="budget.id"
        class="p-4 d-flex justify-content-between"
      >
        <b-button @click="$bvModal.show('budget.id')">
          <div class="d-flex justify-content-between">
            <p>ID {{ budget.id }}</p>
            <p>{{ budget.name_customer }}</p>
            <p>{{ budget.name }}</p>
            <p>{{ budget.status }}</p>
            <div>
              <img src="~/assets/img/icones/edit-icon.svg" alt="" />

              <img
                src="~/assets/img/icones/delete-icon.svg"
                alt=""
                @click="showModal(budget)"
              />
            </div>
          </div>
        </b-button>
        <Viewing :budget="budget" />
      </li>
    </ul>
  </section>
</template>
<script>
import Viewing from '~/components/budget/Viewing.vue';
export default {
  name: 'Listing',
  components: { Viewing },
  props: {
    budgetsData: {
      type: Array,
      default: null,
    },
  },
  async asyncData({ $axios }) {
    const budgets = await $axios.get('budgets');
    const budgetsData = budgets.data;
    console.log('budgets :: ', budgets.data);
    return { budgetsData };
  },
  data: () => {
    return {
      id: null,
    };
  },
  methods: {
    showModal(budget) {
      this.id = budget.id;
      // this.$root.$emit('bv::show::modal', 'excluir', this.id);
      this.$bvModal.show(this.id);
      console.log(budget.id + ' chamado');
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
