<template>
  <div>
    <div>
      <input id="file" type="file" accept=".png, .jpg" @change="onFileChange" />
      <label for="file" class="text-center">Alterar Imagem</label>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      file: null,
      files: null,
      reader: null,
      vm: null,
      photo: '',
    };
  },
  methods: {
    onFileChange(e) {
      this.files = e.target.files || e.dataTransfer.files;
      if (!this.files.length) return;
      this.createImage(this.files[0]);
    },
    createImage(file) {
      this.reader = new FileReader();
      this.vm = this;
      this.reader.onload = (e) => {
        this.vm.photo = e.target.result;
      };
      this.putPhoto();
      this.reader.readAsDataURL(file);
    },
    async putPhoto() {
      try {
        await this.$axios
          .post('tasks/visit/27', this.$data.photo)
          .then((_res) => {
            this.$root.$emit('bv::hide::modal', 'visitas');
            this.toast('success', 'Sucesso', 'Visita adicionada com sucesso!');
            /* this.$router.go( 0); */
          });
        this.$nuxt.refresh().catch((_err) => {});
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>
