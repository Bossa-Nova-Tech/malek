<template>
  <div class="w-100 mx-auto position-relative">
    <div class="d-flex align-items-center mb-5">
      <b-form-input
        v-model="search"
        placeholder="Pesquisar"
        class="ml-3"
      ></b-form-input>
      <img class="mx-3" src="~/assets/img/icones/sliders.svg" />
      <div v-if="!$screen.lg" class="d-flex justify-content-center mr-3">
        <b-img
          src="~/assets/img/icones/icone-criar2.svg"
          role="button"
          @click="$bvModal.show('criar-cliente')"
        />
      </div>
      <button v-if="$screen.lg" @click="$bvModal.show('criar-cliente')">
        Criar Cliente
      </button>
    </div>
    <section class="rounded w-100">
      <h1 class="p-4">Clientes</h1>
      <ul>
        <li
          v-for="customer in filteredList"
          :key="customer.id"
          class="card-cliente p-5 d-flex justify-content-between align-items-center py-4"
        >
          <p>#{{ customer.id }} {{ customer.name }}</p>
          <div>
            <img
              src="~/assets/img/icones/edit-icon.svg"
              role="button"
              alt="botão para acessar o modal de edição de cliente"
              @click="showEditar(customer)"
            />

            <img
              src="~/assets/img/icones/delete-icon.svg"
              role="button"
              alt="botão para deletar cliente"
              @click="showExcluir(customer)"
            />
          </div>
          <Edit :cliente-da-lista="customer" :watching="id" />
        </li>
        <Delete :id="id" />
      </ul>
    </section>
  </div>
</template>
<script>
import Delete from '~/components/customers/Delete.vue';
import Edit from '~/components/customers/Edit.vue';

export default {
  name: 'Listing',
  components: { Delete, Edit },
  props: {
    customersData: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      id: null,
      search: '',
    };
  },
  computed: {
    filteredList() {
      return this.customersData.filter((customer) => {
        return customer.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },

  methods: {
    showExcluir(customer) {
      this.id = customer.id;
      this.$nextTick(function () {
        this.$bvModal.show(`excluir-${this.id}`);
      });
      this.clienteDaLista = customer;
    },
    showEditar(customer) {
      this.id = customer.id;
      this.$nextTick(function () {
        this.$bvModal.show(`update-task-${customer.id}`);
      });
      this.clienteDaLista = customer;
    },
  },
};
</script>
<style lang="scss" scoped>
section {
  height: 25rem;
  background: var(--gray-10);
  box-shadow: 0px 4px 4px rgba(0, 71, 187, 0.06);

  p {
    font-weight: 600;
    font-size: 12px;
  }

  h2 {
    font-weight: 600;
    font-size: 0.75rem;
  }

  ul {
    height: 18.75rem;
    overflow: auto;

    li {
      display: grid;
      grid-template-columns: 3fr 1fr;

      span {
        align-self: center;
        justify-self: end;
      }
    }
  }

  .card-cliente {
    border-top: 0.5px solid var(--gray-20);
  }
}

@media screen and (max-width: 991px) {
  section {
    height: 67vh;
    ul {
      height: 45vh;
    }
  }
}
</style>
