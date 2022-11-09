<template>
  <b-modal
    :id="'view-task-' + ordem_item.id"
    :ref="'view-task-' + ordem_item.id"
    size="lg"
    hide-header
    hide-footer
  >
    <div class="view-modal mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Ordem de Serviço {{ ordem_item.id }}</h1>

        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          role="button"
          @click.once="$bvModal.hide(`update-task-${ordem_item.id}`)"
        />
      </div>
      <h3>Tipo de serviço</h3>
      <p>{{ ordem_item.services }}</p>
      <h3 class="mt-4">Cliente</h3>
      <p>{{ ordem_item.name_customer | truncate() }}</p>
    </div>
  </b-modal>
</template>
<script>
export default {
  name: 'Viewing',
  filters: {
    truncate(data) {
      const reqdString = data.split('');
      const teste = data.split(' ');
      console.log(reqdString);
      return teste[0];
    },
  },
  props: {
    ordem_item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },

  methods: {
    showAlert() {
      alert('Click!');
    },

    async register(_response) {
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        console.log(this.formData);
        try {
          this.formSend = false;
          this.formData.status = 'created';
          this.$v.formData.$reset();
          console.log('executou o clic');

          await this.$axios.post('tasks', this.$data.formData).then((_res) => {
            this.$refs.criar.hide();
            this.toast('success', 'Sucesso', 'Item adicionado com sucesso!');
            this.formData = {
              status: null,
              need_signature: false,
              estimated_time: null,
              end_date: null,
              note: null,
              name_customer: null,
              template: null,
              services: null,
            };
            /* this.$router.go(0); */
          });
          this.$nuxt.refresh().catch((_err) => {});
        } catch (error) {
          console.log(error);
        }
      }
    },
    excluiFoto() {
      if (this.formData.photo) {
        this.formData = {
          photo: null,
        };
      }
    },
    onFileChange(e) {
      this.files = e.target.files || e.dataTransfer.files;
      if (!this.files.length) return;
      this.createImage(this.files[0]);
    },
    createImage(file) {
      this.reader = new FileReader();
      this.vm = this;

      this.reader.onload = (e) => {
        this.vm.formData.photo = e.target.result;
      };
      this.reader.readAsDataURL(file);
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
  },
};
</script>
<style lang="scss" scoped>
.view-modal {
  h1 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.2rem;
    font-weight: bolder;
  }
  p {
    font-size: 1rem;
    color: var(--fosco);
  }
}
</style>
