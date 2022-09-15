<template>
  <b-modal
    :id="`excluir-${id}`"
    ref="excluir"
    title="BootstrapVue"
    hide-header
    footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
  >
    <p class="my-4">
      Tem certeza de que deseja
      <span class="font-weight-bolder">excluir</span> este registro?
    </p>
    <template #modal-footer>
      <b-button variant="danger" @click="remove()">Sim</b-button>
      <b-button @click="$bvModal.hide(`excluir-${id}`)">Não</b-button>
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
  /* mounted() {
    console.log('chamou o delete', this.excluir.id);
    const idRef = 'modal-' + this.excluir.id;
    console.log(idRef);
    return { idRef };
  }, */
  methods: {
    async remove() {
      const ordem = await this.$parent.ordem_selecionada;
      console.log(ordem);
      try {
        await this.$axios
          .delete('tasks/' + ordem.id)
          .then((_res) => {
            this.$parent.listar();
            if (_res.data.result === 'success') {
              console.log(ordem.id + ' excluido');
              this.toast('success', 'Sucesso', 'Item excluído!');
              this.$refs.excluir.hide();
              this.$nuxt.refresh();
            } else {
              this.toast(
                'danger',
                'Erro',
                'Problemas ao excluir. Entre em contato com o suporte',
              );
            }
          })
          .catch((_err) => {});
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
