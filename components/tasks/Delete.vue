<template>
  <b-modal
    :id="ordem.id"
    :ref="ordem.id"
    title="BootstrapVue"
    hide-header
    footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
  >
    <p class="my-4">Tem certeza de que deseja excluir este registro?</p>
    <template #modal-footer>
      <b-button variant="danger" @click="remove(ordem)">Sim</b-button>
      <b-button @click="$bvModal.hide(ordem.id)">Não</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: 'Delete',
  props: ['ordem'],
  /* mounted() {
    console.log('chamou o delete', this.ordem.id);
    const idRef = 'modal-' + this.ordem.id;
    console.log(idRef);
    return { idRef };
  }, */
  methods: {
    async remove(ordem) {
      try {
        await this.$axios
          .delete('tasks/' + ordem.id)
          .then((_res) => {
            if (_res.data.result === 'success') {
              console.log(ordem.id + ' excluido');
              this.toast('success', 'Sucesso', 'Item excluído!');
              this.$root.$emit('bv::hide::modal', 'excluir');
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
