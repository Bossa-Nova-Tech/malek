<template>
  <section class="rounded">
    <h1 class="p-4">Formulários cadastrados</h1>
    <ul>
      <li
        v-for="(formsLista, index) in formsData"
        :key="index"
        class="card-forms p-4 d-flex align-items-center justify-content-between"
      >
        <div>
          <div>
            <h2 class="primary-80">
              {{ formsLista.name }}
            </h2>
            <p class="gray-40">{{ formsLista.event_show }}</p>
          </div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <div class="d-flex mb-2">
            <img
              v-if="
                $auth.user.role === 'administrator' ||
                $auth.user.role === 'manager'
              "
              src="~/assets/img/icones/edit-icon.svg"
              role="button"
              class="mr-3"
              width="22"
              height="24"
              alt="icone de edição"
              @click="showEditar(formsLista)"
            />

            <img
              v-if="
                $auth.user.role === 'administrator' ||
                $auth.user.role === 'manager'
              "
              src="~/assets/img/icones/delete-icon.svg"
              role="button"
              width="22"
              height="24"
              alt="icone de deletar"
              @click="showExcluir(formsLista)"
            />
          </div>
        </div>
        <Edit
          :forms-selecionado="formsLista"
          :watching="id"
          :forms-fields="formsLista.fields"
        />
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
      type: Array | Object,
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
        this.formsFields = formsLista.fields;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  height: 35rem;
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
    height: 80%;
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
