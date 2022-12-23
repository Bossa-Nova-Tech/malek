<template>
  <div class="w-100 mx-auto position-relative">
    <div class="d-flex align-items-center mb-2">
      <b-form-input v-model="search" placeholder="Pesquisar" class="ml-3"></b-form-input>
      <img ref="dropdown" role="button" alt="icone de drop" src="~/assets/img/icones/sliders.svg" class="mx-2"
        @click="isFiltered = !isFiltered" />
      <div v-if="!$screen.lg" class="icone-criar d-flex justify-content-center mr-3">
        <b-img src="~/assets/img/icones/criar-4.svg" role="button" @click="$bvModal.show('criar-cliente')" />
      </div>
      <button v-if="$screen.lg" @click="$bvModal.show('criar-cliente')">
        Criar Cliente
      </button>
    </div>
    <b-container v-if="isFiltered">
      <b-row class="mx-0 p-2 border rounded mb-3">
        <p class="mb-2">Selecione o filtro:</p>
        <b-col cols="10">
          <b-form-checkbox-group v-model="selected" :options="options" :unchecked-value="null"></b-form-checkbox-group>
        </b-col>
        <b-col cols="2">
          <b-img v-b-tooltip.hover title="Limpar filtro" src="~/assets/img/icones/delete-icon.svg" role="button"
            @click="cleanFilter" />
        </b-col>
      </b-row>
    </b-container>
    <section class="rounded w-100">
      <h1 class="p-4">Clientes</h1>
      <ul>
        <li v-for="customer in filteredList" :key="customer.id"
          class="card-cliente p-4 d-flex flex-column justify-content-center">
          <b-row class="d-flex justify-content-center align-items-center">
            <b-col cols="9" role="button" @click="showVer(customer)">
              <h2>{{ customer.name }}</h2>
              <div class="d-flex gray-40 my-2">
                <b-img src="~/assets/img/icones/map-pin.svg" alt="icone de pino do mapa, indica localização" />
                <h2 class="ml-2">{{ customer.district }} - {{ customer.city }}</h2>
              </div>
              <div class="d-flex gray-40">
                <b-img src="~/assets/img/icones/phone.svg" alt="icone de telefone, indica número do telefone" />
                <h2 class="ml-2">{{ customer.phone }}</h2>
              </div>

            </b-col>
            <b-col cols="3">
              <img src="~/assets/img/icones/edit-icon.svg" alt="botão para acessar o modal de edição de cliente"
                role="button" @click="showEditar(customer)" />
              <img src="~/assets/img/icones/delete-icon.svg" role="button" alt="botão para deletar cliente"
                @click="showExcluir(customer)" />
            </b-col>
          </b-row>
          <Edit :cliente-da-lista="customer" :watching="id" :coordinates="coordinates" />
          <Viewing :cliente-da-lista="customer" :watching="id" :coordinates="coordinates" />
        </li>
        <Delete :id="id" />
      </ul>
    </section>
  </div>
</template>
<script>
import Delete from '~/components/customers/Delete.vue';
import Edit from '~/components/customers/Edit.vue';
import Viewing from '~/components/customers/Viewing.vue';

export default {
  name: 'Listing',
  components: { Delete, Edit, Viewing },
  props: {
    customersData: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      selected: null,
      isFiltered: false,
      coordinates: [],
      options: [
        {
          text: 'CNPJ',
          value: 'pj',
        },
        {
          text: 'CPF',
          value: 'f',
        },
      ],
      id: null,
      search: '',
    };
  },
  computed: {
    filteredList() {
      let customers = this.customersData.filter((customer) => {
        return customer.name.toLowerCase().match(this.search.toLowerCase());
      });

      customers = customers.filter((customer) => {
        if (this.selected === null) {
          return customer;
        }

        return customer.type === this.selected;
      });

      return customers;
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
    async showEditar(customer) {
      this.id = customer.id;
      this.$nextTick(function () {
        this.$bvModal.show(`update-client-${customer.id}`);
      });
      this.clienteDaLista = customer;
      const { data } = await this.$axios.get(
        `customers/get-coordinates/${this.clienteDaLista.id}`,
      );
      console.log(data);
      this.coordinates = data;
    },
    async showVer(customer) {
      this.id = customer.id;
      this.$nextTick(function () {
        this.$bvModal.show(`view-client-${this.id}`);
      });
      this.clienteDaLista = customer;
      const { data } = await this.$axios.get(
        `customers/get-coordinates/${this.clienteDaLista.id}`,
      );
      console.log(data);
      this.coordinates = data;
    },
    cleanFilter() {
      this.search = '';
      this.selected = null;
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
      /* display: grid; */
      height: 8rem;
      /* grid-template-columns: 3fr 1fr; */

      /* span {
        align-self: center;
        justify-self: end;
      } */
    }
  }

  .card-cliente {
    border-top: 0.5px solid var(--gray-20);
  }
}

@media screen and (max-width: 991px) {
  .icone-criar {
    animation: criar 1.5s ease-in-out;
  }

  @keyframes criar {
    0% {
      scale: 0;
    }

    50% {
      scale: 1.2;
    }

    100% {
      transform: rotate(1deg);
      scale: 1;
    }
  }

  section {
    height: 67vh;

    ul {
      height: 45vh;
    }
  }
}
</style>
