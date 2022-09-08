<template>
  <section class="listing overflow-auto">
    <ul v-for="ordem in tasksData" :key="ordem.id" class="mt-3">
      <li class="card-servico mb-4 p-4">
        <div class="d-flex justify-content-between pb-2">
          <h2 class="manutencao primary-80">
            #{{ ordem.id }}
            {{ ordem.services }}
          </h2>
          <div class="d-flex">
            <img
              v-b-modal.modal-1
              src="~/assets/img/icones/edit-icon.svg"
              class="mr-3"
            />

            <div>
              <img
                src="~/assets/img/icones/delete-icon.svg"
                role="button"
                @click="showModal(ordem)"
              />
              <Delete :ordem="ordem" />
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between pb-3">
          <div>
            <b-img :src="photo_perfil" alt="foto de perfil" />
            <span class="pl-3">{{ ordem.name }}</span>
          </div>
          <div>
            <span class="tempo gray-40">{{ ordem.estimated_time }} </span>
          </div>
        </div>

        <p class="local gray-40">{{ ordem.name_customer }}</p>
      </li>
    </ul>
  </section>
</template>
<script>
import Delete from '~/components/tasks/Delete.vue';
export default {
  name: 'Listing',
  components: { Delete },
  props: {
    tasksData: {
      type: Array,
      default: null,
    },
  },
  async asyncData({ $axios }) {
    const tasks = await $axios.get('tasks');
    const tasksData = tasks.data;
    console.log('tasks :: ', tasks.data);
    return { tasksData };
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
        photo: [],
        estimated_time: null,
        end_date: null,
        note: null,
        name_customer: 'HAVAN Unidade 02',
        template: null,
        services: null,
        time_of_execution: '02h30',
      },
      formDataEdited: {
        need_signature: false,
        photo: [],
        estimated_time: null,
        end_date: null,
        note: null,
        name_customer: null,
        template: null,
        services: null,
        time_of_execution: null,
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
  },
};
</script>

<style lang="scss" scoped>
section {
  p {
    font-weight: 600;
    font-size: 12px;
  }
  h2 {
    font-weight: 600;
  }
  .card-servico {
    background: var(--gray-10);
    box-shadow: 0px 4px 4px rgba(0, 71, 187, 0.06);
  }
}
.listing {
  padding-bottom: 5rem !important;
}
@media screen and (min-width: 756px) {
  .listing {
    max-height: 25rem;
    padding-bottom: 0 !important;
  }
}
</style>
