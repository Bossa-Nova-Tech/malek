<template>
  <section class="rounded">
    <div class="d-flex align-items-center mb-2">
      <h1 class="p-4">Serviços cadastrados</h1>
    </div>
    <ul>
      <li
        v-for="(service, index) in services"
        :key="index"
        class="card-servico p-4"
      >
        <div class="d-flex align-items-center">
          <p v-if="$screen.lg" class="gray-40">Serviço</p>
          <div>
            <h2 class="primary-80 pl-3">
              {{ service.name }}
            </h2>
          </div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <div class="d-flex mb-2">
            <img
              src="~/assets/img/icones/edit-icon.svg"
              alt="icone para editar"
              role="button"
              class="mr-3"
              width="22"
              height="24"
              @click="openModalUpdate(service)"
            />

            <img
              src="~/assets/img/icones/delete-icon.svg"
              alt="icone para deletar"
              role="button"
              width="22"
              height="24"
              @click="openModalDelete(service)"
            />
          </div>
        </div>
      </li>
      <Edit
        :servico-selecionado="selectedService"
        :watching="selectedService.id"
        v-on:updateService="updateServices"
      />
      <Delete :id="selectedService.id"/>
    </ul>
  </section>
</template>

<script>
import Edit from './Edit.vue';
import Delete from '~/components/services/Delete.vue';

export default {
  name: 'Listing',
  components: {Delete, Edit},
  props: {
    services: {
      type: Array,
      default: null,
    },
    watching: {
      type: String,
      default: null,
    },
  },
  emits: ['updateServices'],

  data() {
    return {
      selectedService: {}
    };
  },

  methods: {
    openModalDelete(service) {
      this.selectedService = service
      this.$nextTick(function () {
        this.$bvModal.show(`excluir-${this.selectedService.id}`);
      });
    },
    openModalUpdate(service) {
      this.selectedService = service
      this.$nextTick(function () {
        this.$bvModal.show('update-service');
      });
    },

    updateServices() {
      console.log('call update services')
      this.$emit('updateServices', '')
    }
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
    height: 65vh;

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
