<template>
  <section class="rounded">
    <div class="d-flex align-items-center">
      <b-col cols="9">
        <h1 class="p-2 py-4">Acontecendo hoje</h1>
      </b-col>
      <b-col cols="1" class="text-center">
        <img
          role="button"
          src="~/assets/img/icones/sliders.svg"
          alt="Icon filters"
          @click="isFiltered = !isFiltered"
        />
      </b-col>
    </div>
    <b-container class="my-2">
      <b-row v-if="isFiltered" class="mx-auto border p-2 py-4 rounded">
        <b-col cols="12">
          <span class="h5">Filtre sua busca:</span>
          <p class="mb-2 mt-3">Nome/Número OS:</p>
          <b-form-input
            v-model="search"
            size="sm"
            placeholder="Digite sua busca"
          ></b-form-input>
        </b-col>
        <b-col cols="12" class="mt-2">
          <p class="mb-2">Status:</p>
          <b-form-checkbox-group
            v-model="selected"
            :options="options"
            size="sm"
            :unchecked-value="null"
          ></b-form-checkbox-group>
        </b-col>
        <b-col cols="12" class="mt-2">
          <!-- <p class="mb-2">Data OS:</p>
          <b-form-datepicker
            v-model="date"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            locale="pt-br"
            size="sm"
          ></b-form-datepicker> -->
        </b-col>
        <b-col cols="6" align-self="end" class="mt-2">
          <b-button variant="outline-danger" size="sm" @click="cleanFilter"
            >Limpar Filtro</b-button
          >
        </b-col>
      </b-row>
    </b-container>
    <ul>
      <li
        v-for="(itemOrdem, index) in filteredList"
        :key="index"
        role="button"
        class="card-servico p-4"
      >
        <div class="d-flex pb-3" @click="showVer(itemOrdem)">
          <p v-if="$screen.lg" class="gray-40">
            Ordem de serviço #{{ itemOrdem.id }}
          </p>
          <div class="ajuste">
            <h2 v-if="$screen.lg" class="primary-80 pb-1">
              {{ itemOrdem.services_names }}
            </h2>

            <h2 v-if="!$screen.lg" class="primary-80 pb-1">
              #{{ itemOrdem.id }} {{ itemOrdem.services }}
            </h2>
            <p class="gray-40">{{ itemOrdem.name_customer | truncate() }}</p>
          </div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <div class="d-flex mb-2">
            <img
              src="~/assets/img/icones/icone-concluir.svg"
              class="mr-3"
              role="button"
              width="22"
              alt="icone para concluir"
              height="24"
              @click="showConcluir(itemOrdem)"
            />
            <img
              src="~/assets/img/icones/edit-icon.svg"
              role="button"
              class="mr-3"
              width="22"
              alt="icone para editar"
              height="24"
              @click="showEditar(itemOrdem)"
            />

            <img
              src="~/assets/img/icones/delete-icon.svg"
              role="button"
              width="22"
              alt="icone para deletar"
              height="24"
              @click="showExcluir(itemOrdem)"
            />
          </div>
        </div>
        <div class="d-flex align-items-center" @click="showVer(itemOrdem)">
          <b-img :src="photo_perfil.photo" alt="foto de perfil" />
          <p class="pl-2">Técnico</p>
          <b-badge
            v-if="itemOrdem.status === 'created'"
            variant="success"
            class="ml-3"
            >Criada</b-badge
          >
          <b-badge
            v-if="itemOrdem.status === 'start'"
            variant="warning"
            class="ml-3"
            >Em andamento</b-badge
          >
          <b-badge
            v-if="itemOrdem.status === 'canceled'"
            variant="danger"
            class="ml-3"
            >Cancelada</b-badge
          >
          <b-badge
            v-if="itemOrdem.status === 'finished'"
            variant="info"
            class="ml-3"
            >Finalizada</b-badge
          >
          <b-badge
            v-if="itemOrdem.status === 'pause'"
            variant="warning"
            class="ml-3"
            >Em pausa</b-badge
          >
        </div>
        <span class="gray-40">{{ itemOrdem.estimated_time }} </span>
        <Edit :ordem_item="itemOrdem" :watching="id" :clientes="id" :customersData="customersData" />
        <Viewing :id="id" :ordem_item="itemOrdem" :center="center" />
      </li>
      <Delete :id="id" />
      <Finished :id="id" />
    </ul>
  </section>
</template>

<script>
import Vue2Filters from 'vue2-filters';
import Edit from './Edit.vue';
import Viewing from './Viewing.vue';
import Delete from '~/components/tasks/Delete.vue';
import Finished from '~/components/tasks/Finished.vue';

export default {
  name: 'Listing',
  components: { Delete, Finished, Edit, Viewing },
  filters: {
    truncate(data) {
      const search = 'pessoa f';
      if (data.match(search)) {
        const str = data.split(' ');
        return str[0];
      } else {
        const str = data.replace('pessoa pj', '');
        return str + ' PJ';
      }
    },
  },
  mixins: [Vue2Filters.mixin],
  props: {
    tasksData: {
      type: Array,
      default: null,
    },
    watching: {
      type: String,
      default: null,
    },
    customersData: {
      type: Object | Array,
      default: null,
    }
  },

  data() {
    return {
      isFiltered: false,
      search: '',
      selected: null,
      tamanho: null,
      indice: null,
      espaco: null,
      editar: false,
      id: null,
      user_id: null,
      center: [],
      coordinates: [],
      lat: null,
      long: null,
      photo_perfil: { photo: require('~/assets/img/icones/icone-perfil.svg') },
      options: [
        {
          text: 'Criada',
          value: 'created',
        },
        {
          text: 'Em andamento',
          value: 'start',
        },
      ],
    };
  },

  computed: {
    filteredList() {
      let tasks = this.tasksData.filter((t) => {
        return (
          t.name_customer.toLowerCase().match(this.search.toLowerCase()) ||
          t.id.toString().match(this.search)
        );
      });

      tasks = tasks.filter((t) => {
        if (this.selected === null) {
          return t;
        }

        return t.status === this.selected;
      });

      return tasks;
    },
  },

  methods: {
    async showVer(itemOrdem) {
      this.id = itemOrdem.id;
      const mapa = await this.$axios.get(
        `customers/get-coordinates/${itemOrdem.customer_id}`,
      );
      this.coordinates = mapa.data;
      this.lat = this.coordinates.latitude;
      this.long = this.coordinates.longitude;
      this.center = [this.lat, this.long];
      this.$nextTick(function () {
        this.$bvModal.show(`view-task-${this.id}`);
      });
      this.ordem_selecionada = itemOrdem;

    },
    showConcluir(itemOrdem) {
      this.id = itemOrdem.id;
      this.$nextTick(function () {
        this.$bvModal.show(`finished-${this.id}`);
      });
      this.ordem_selecionada = itemOrdem;
    },
    showExcluir(itemOrdem) {
      this.id = itemOrdem.id;
      this.$nextTick(function () {
        this.$bvModal.show(`excluir-${this.id}`);
      });
      this.ordem_selecionada = itemOrdem;
    },
    showEditar(itemOrdem) {
      this.editar = true;
      if (this.editar === true) {
        this.id = itemOrdem.id;
        this.$nextTick(function () {
          this.$bvModal.show(`update-task-${itemOrdem.id}`);
        });
        this.ordem_selecionada = itemOrdem;
      }
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
      display: grid;
      grid-template-columns: 3fr 1fr;

      span {
        align-self: center;
        justify-self: end;
      }

      .ajuste {
        padding-left: 3rem;
      }
    }
  }

  .card-servico {
    border-top: 0.5px solid var(--gray-20);
  }
}

@media screen and (max-width: 991px) {
  section {
    height: 70vh;

    ul {
      height: 50vh;
      li {
        .ajuste {
          padding-left: 0rem;
        }
      }
    }
  }
}
</style>
