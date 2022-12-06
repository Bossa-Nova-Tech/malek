<template>
  <section class="rounded">
    <h1 class="p-4">Formulários cadastrados</h1>
    <ul>
      <li
        v-for="(formsLista, index) in formsData"
        :key="index"
        class="card-forms p-4"
      >
        <div class="d-flex pb-3">
          <p v-if="$screen.lg" class="gray-40">
            Formulário #{{ formsLista.id }}
          </p>
          <div class="ajuste">
            <h2 v-if="$screen.lg" class="primary-80 pb-1">
              {{ formsLista.name }}
            </h2>
            <h2 v-if="!$screen.lg" class="primary-80">
              #{{ formsLista.id }} {{ formsLista.name }}
            </h2>
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
              @click="showEditar(formsLista)"
            />

            <img
              src="~/assets/img/icones/delete-icon.svg"
              role="button"
              width="22"
              height="24"
              @click="showExcluir(formsLista)"
            />
          </div>
        </div>
        <Edit :formsSelecionado="formsLista" :watching="id" />
      </li>
      <Delete :id="id" />
    </ul>
  </section>
</template>

<script>
import Edit from './Edit.vue';
import Delete from '~/components/forms/Delete.vue';

export default {
  name: 'Listing',
  components: { Delete, Edit },
  props: {
    formsData: {
      type: Array,
      default: null,
    },
    watching: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      editar: false,
      tamanho: null,
      id: null,
    };
  },

  methods: {
    showExcluir(formsLista) {
      this.id = formsLista.id;
      this.$nextTick(function () {
        this.$bvModal.show(`excluir-${this.id}`);
      });
      this.formsSelecionado = formsLista;
    },
    showEditar(formsLista) {
      this.editar = true;
      if (this.editar === true) {
        this.id = formsLista.id;
        this.$nextTick(function () {
          this.$bvModal.show(`update-forms-${formsLista.id}`);
        });
        this.formsSelecionado = formsLista;
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

  .card-forms {
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
