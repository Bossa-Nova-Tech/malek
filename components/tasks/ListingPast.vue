<template>
  <section class="rounded">
    <h1 class="p-4">Em atraso</h1>
    <ul>
      <li
        v-for="(itemOrdem, index) in tasksData"
        :key="index"
        class="card-servico p-4"
      >
        <div class="d-flex pb-3" @click="showVer(itemOrdem)">
          <p v-if="$screen.lg" class="gray-40">
            Ordem de serviço #{{ itemOrdem.id }}
          </p>
          <div class="ajuste">
            <h2 v-if="$screen.lg" class="primary-80 pb-1">
              {{ itemOrdem.services }}
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
              height="24"
              @click="showConcluir(itemOrdem)"
            />
            <img
              src="~/assets/img/icones/edit-icon.svg"
              role="button"
              class="mr-3"
              width="22"
              height="24"
              @click="showEditar(itemOrdem)"
            />

            <img
              src="~/assets/img/icones/delete-icon.svg"
              role="button"
              width="22"
              height="24"
              @click="showExcluir(itemOrdem)"
            />
          </div>
        </div>
        <div class="d-flex align-items-center" @click="showVer(itemOrdem)">
          <b-img :src="photo_perfil.photo" alt="foto de perfil" />
          <p class="pl-2">Colaborador</p>
          <b-badge class="tag">Criada</b-badge>
        </div>
        <span class="gray-40">{{ itemOrdem.estimated_time }} </span>
        <Edit :ordem_item="itemOrdem" :watching="id" :clientes="id" />
        <Viewing :id="id" :ordem_item="itemOrdem" />
      </li>
      <Delete :id="id" />
      <Finished :id="id" />
    </ul>
  </section>
</template>

<script>
import Vue2Filters from 'vue2-filters';
import Viewing from './Viewing.vue';
import Edit from './Edit.vue';
import Delete from '~/components/tasks/Delete.vue';
import Finished from '~/components/tasks/Finished.vue';

export default {
  name: 'ListingPast',

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
  },

  data() {
    return {
      editar: false,
      id: null,
      photo_perfil: { photo: require('~/assets/img/icones/icone-perfil.svg') },
    };
  },

  methods: {
    showVer(itemOrdem) {
      this.id = itemOrdem.id;
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
        // this.$router.push(`/ordem-de-servicos/?ordem=${itemOrdem.id}`);
        /* const taskID = this.$axios.$get(
          `tasks/${this.id}`,
          this.$data.formData,
        );
        this.formData = taskID; */
        /* this.$nextTick(function () {
          this.$bvModal.show(`criar-${this.editar}-${this.id}`);
        }); */
        this.$nextTick(function () {
          this.$bvModal.show(`update-task-${itemOrdem.id}`);
        });
        this.ordem_selecionada = itemOrdem;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  margin-left: 20px;
  background: green;
}
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
