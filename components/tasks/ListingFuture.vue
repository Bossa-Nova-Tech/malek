<template>
  <section class="rounded">
    <h1 class="p-4">Acontecendo hoje</h1>
    <ul>
      <li
        v-for="(itemOrdem, index) in tasksData"
        :key="index"
        class="card-servico p-4"
      >
        <div class="d-flex pb-3">
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
            <p class="gray-40">{{ itemOrdem.name_customer }}</p>
          </div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <div class="d-flex mb-2">
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
        <div class="d-flex align-items-center">
          <b-img :src="photo_perfil.photo" alt="foto de perfil" />
          <p class="pl-2">Colaborador</p>
        </div>
        <span class="gray-40">{{ itemOrdem.estimated_time }} </span>
      </li>
      <Delete :id="id" />
      <Finished :id="id" />
      <Add :id="id" :editar="editar" />
    </ul>
  </section>
</template>

<script>
import Delete from '~/components/tasks/Delete.vue';
import Finished from '~/components/tasks/Finished.vue';
import Add from '~/components/tasks/Add.vue';

export default {
  name: 'ListingFuture',
  components: { Delete, Finished, Add },
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
        this.$router.push(`/testin/?ordem=${itemOrdem.id}`);
        this.$nextTick(function () {
          this.$bvModal.show(`criar-${this.editar}-${this.id}`);
        });
        this.ordem_selecionada = itemOrdem;
      }
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
