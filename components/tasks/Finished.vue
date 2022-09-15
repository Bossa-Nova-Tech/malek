<template>
  <b-modal
    v-if="teste === true"
    :id="ordem.id"
    ref="finished"
    title="BootstrapVue"
    hide-header
    footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
  >
    <p class="my-4">
      Tem certeza de que deseja
      <span class="font-weight-bolder">concluir</span> este registro?
    </p>
    <template #modal-footer>
      <b-button variant="danger" @click="finishTask">Sim</b-button>
      <b-button @click="$bvModal.hide(ordem.id)">Não</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: 'Delete',
  props: {
    ordem: {
      type: Array,
      default: null,
    },
    teste: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tasksData: [],
    };
  },
  /* mounted() {
    console.log('chamou o delete', this.ordem.id);
    const idRef = 'modal-' + this.ordem.id;
    console.log(idRef);
    return { idRef };
  }, */
  methods: {
    async finishTask(_response) {
      try {
        await this.$axios
          .post('tasks/finish/' + this.ordem.id)
          .then((_res) => {
            this.tasksData.splice(this.ordem.id, 1);
            this.$refs.finished.hide();
            /* if (this.status === 'finished') {
                this.ordens.splice(this.ordens.indexOf(taskData), 1);
              } */
            this.toast('success', 'Sucesso', 'Item adicionado com sucesso!');
            this.$nuxt.refresh();
          })
          .catch((_err) => {});
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
