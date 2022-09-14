<template>
  <section class="rounded">
    <h1 class="p-4">Acontecendo hoje</h1>
    <ul>
      <li v-for="ordem in tasksData" :key="ordem.id" class="card-servico p-4">
        <div class="d-flex pb-3">
          <p class="gray-40">Ordem de serviço #{{ ordem.id }}</p>
          <div class="pl-4">
            <h2 class="primary-80 pb-1">{{ ordem.services }}</h2>
            <p class="gray-40">{{ ordem.name_customer }}</p>
          </div>
        </div>

        <div class="d-flex flex-column align-items-end">
          <div class="d-flex mb-2">
            <img
              v-b-modal.modal-1
              src="~/assets/img/icones/icone-concluir.svg"
              class="mr-3"
              width="22"
              height="24"
              @click="showFinishedModal(ordem)"
            />
            <img
              v-b-modal.modal-1
              src="~/assets/img/icones/edit-icon.svg"
              class="mr-3"
              width="22"
              height="24"
            />

            <img
              src="~/assets/img/icones/delete-icon.svg"
              role="button"
              width="22"
              height="24"
              @click="showModal(ordem)"
            />
            <Delete :ordem="ordem" />
            <Finished :ordem="ordem" />
          </div>
        </div>

        <div class="d-flex align-items-center">
          <b-img :src="photo_perfil" alt="foto de perfil" />
          <p class="pl-2">Colaborador</p>
        </div>

        <span class="gray-40">{{ ordem.estimated_time }} </span>
      </li>
    </ul>
  </section>
</template>

<script>
import Delete from '~/components/tasks/Delete.vue';
import Finished from '~/components/tasks/Finished.vue';

export default {
  name: 'Listing',
  components: { Delete, Finished },
  props: {
    tasksData: {
      type: Array,
      default: null,
    },
  },

  data() {
    return {
      id: null,
      saved: false,
      formSend: false,
      formEditing: null,
      editing: false,
      formData: {
        need_signature: false,
        estimated_time: null,
        end_date: null,
        note: null,
        name_customer: null,
        template: null,
        services: null,
      },
      photo_perfil: [require('~/assets/img/icones/icone-perfil.svg')],
    };
  },

  methods: {
    showModal(ordem) {
      this.id = ordem.id;
      this.$bvModal.show(this.id);
      console.log(ordem.id + ' chamado');
    },
    showFinishedModal(ordem) {
      this.id = ordem.id;
      this.$bvModal.show(this.id);
      console.log(ordem.id + ' chamado');
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

  .card-servico {
    border-top: 0.5px solid var(--gray-20);
  }
}

@media screen and (max-width: 991px) {
  section {
    height: 70vh;

    ul {
      height: 50vh;
    }
  }
}
</style>
