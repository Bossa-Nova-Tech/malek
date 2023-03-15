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
        if (user.id !== this.$auth.user.id) {
          await this.$axios

            .delete(
              'users/' + user.id + '?company_id=' + this.$auth.user.company_id
            )
            .then((_res) => {
              this.toast('success', 'Sucesso', 'Usuário excluído!');
              this.$refs.excluir.hide();
              this.$nuxt.refresh();
            })
            .catch((_err) => {});
        } else {
          alert('Você não pode excluir o usuário principal do aplicativo.');
        }
      } catch (error) {
      }
    },
  },
};
</script>
