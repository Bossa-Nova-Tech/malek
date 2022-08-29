<template>
  <div class="listing overflow-auto">
    <section v-for="ordem in tasksData" :key="ordem.id" class="mt-3">
      <b-card class="card-servico mb-4 border-0">
        <div class="d-flex justify-content-between pb-2">
          <h2 class="manutencao primary-80">
            #{{ ordem.id }}
            {{ ordem.services }}
          </h2>
          <p class="local gray-40">{{ ordem.name_customer }}</p>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <b-img :src="photo_perfil" alt="foto de perfil" />
            <span class="pl-3">{{ ordem.name }}</span>
          </div>
          <div>
            <!-- <span class="porcentagem primary-80">
                    {{ ordem.performance }}</span
                  > -->
            <span class="tempo gray-40">{{ ordem.estimated_time }} </span>
          </div>
        </div>
        <b-button v-b-modal.modal-1 size="sm" variant="primary" class="mt-3">
          Editar</b-button
        >

        <div>
          <b-button
            size="sm"
            variant="danger"
            class="mt-3"
            @click="showModal(ordem)"
          >
            Excluir</b-button
          >
          <Delete :ordem="ordem" />
        </div>
      </b-card>
    </section>
  </div>
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
      // this.$root.$emit('bv::show::modal', 'excluir', this.id);
      this.$bvModal.show(this.id);
      console.log(ordem.id + ' chamado');
    },
  },
};
</script>
<style lang="scss" scoped>
.listing {
  padding-bottom: 5rem !important;
}
@media screen and (min-width: 756px) {
  .listing {
    max-height: 25rem;
    padding-bottom: 0 !important;
  }
  .card-body {
    width: 40rem;
    margin-inline: auto;
  }
}
</style>
