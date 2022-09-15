<template>
  <b-modal
    :id="`finished-${id}`"
    ref="f"
    title="BootstrapVue"
    hide-header
    footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
  >
    <p class="my-4">
      Tem certeza de que deseja
      <span class="font-weight-bolder">concluir</span> este registro?
    </p>
    <template #modal-footer>
      <b-button variant="danger" @click="finishTask()">Sim</b-button>
      <b-button @click="$bvModal.hide('finished')">Não</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: 'Delete',
  props: {
    id: {
      type: Number,
      default: null,
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
    /* async finishTask() {

    }, */
    async finishTask(_response) {
      const ordem = await this.$parent.ordem_selecionada;
      console.log(ordem);
      try {
        await this.$axios
          .post('tasks/finish/' + ordem.id)
          .then((_res) => {
            this.$parent.listar();
            this.$refs.f.hide();
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
