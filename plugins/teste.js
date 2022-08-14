export default (context, inject, app) => {
  // this.$toast('danger', 'Erro', 'sou uma mensagem');
  inject('nameTeste', 'Pedro');
  inject('showName', (name) => `Olá ${name}`);
};
