<template>
  <b-modal
    :id="`excluir-${id}`"
    ref="excluir"
    title="BootstrapVue"
    hide-header
    footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
  >
    <p class="my-4">Tem certeza de que deseja excluir este registro?</p>
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

  methods: {
    async remove() {
      const user = await this.$parent.userList;
      console.log(user);
      try {
        await this.$axios
          .delete('users/' + user.id)
          .then((_res) => {
            if (_res.data.result === 'success') {
              console.log(user.id + ' excluido');
              this.toast('success', 'Sucesso', 'Usuário excluído!');
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
