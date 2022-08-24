<template>
  <div class="listing">
    <section v-for="(ordem, index) in tasksData" :key="ordem.id" class="mt-3">
      <div class="card-servico mb-4">
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
        <b-button
          v-b-modal.modal-1
          size="sm"
          variant="primary"
          class="mt-3"
          @click="setToEditing(index)"
        >
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
      </div>
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
    setToEditing(index) {
      this.formEditing = index;
      setTimeout(() => {
        document.getElementById(`form-edit-${index}`).focus();
      }, 1);
      if (this.formDataEdited === null) {
        this.formDataEdited = this.formData;
      }
    },
    save(index) {
      this.saved = true;
      if (this.saved === true) {
        this.formData = this.formDataEdited;
      }
      console.log(this.formData);
      this.formEditing = !index;
      this.$root.$emit('bv::hide::modal', 'modal-1', index);
      this.formData = {
        services: null,
        name_customer: null,
        template: null,
        end_date: null,
        time_of_execution: null,
        estimated_time: null,
      };
    },
    showModal(ordem) {
      this.id = ordem.id;
      this.$root.$emit('bv::show::modal', 'excluir', this.id);
      console.log(ordem.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.listing {
  padding-bottom: 5rem !important;
}
</style>
