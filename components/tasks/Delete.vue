<template>
  <b-modal
    :id="`excluir-${id}`"
    ref="excluir"
    hide-header
    footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
  >
    <p class="my-4">
      Tem certeza de que deseja
      <span class="font-weight-bolder">excluir</span> este registro?
    </p>
    <template #modal-footer>
      <b-button variant="danger" @click.once="remove()">Sim</b-button>
      <b-button @click.once="$bvModal.hide(`excluir-${id}`)">Não</b-button>
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
    watching: {
      type: Number,
      default: null,
    },
  },
  methods: {
    async remove() {
      const ordem = await this.$parent.ordem_selecionada;
      console.log(ordem);
      try {
        await this.$axios
          .delete('tasks/' + ordem.id)
          .then((_res) => {
            if (_res.data.result === 'success') {
              console.log(ordem.id + ' excluido');
              this.toast(
                'success',
                'Sucesso',
                'Ordem de serviço excluída com sucesso!',
              );
              this.$nuxt.refresh();
              this.$nextTick(function () {
                this.$bvModal.hide(`excluir-${this.id}`);
              });
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
