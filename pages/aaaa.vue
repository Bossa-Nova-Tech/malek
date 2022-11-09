<template>
  <div>
    <BorderButton class="my-4">
      <input id="file" type="file" accept=".png, .jpg" class="d-flex" />
      <label for="file" class="text-center">Enviar Foto</label>
    </BorderButton>
    <b-form-file
      v-model="formData.photo"
      :state="Boolean(formData.photo)"
    ></b-form-file>
    <b-img :src="formData.photo"></b-img>
    {{ formData.photo }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        photo: {},
      },
    };
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
