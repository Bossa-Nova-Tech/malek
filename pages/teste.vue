<template>
  <div class="p-2">
    <b-btn
      @click="addFoto"
      block
      variant="outline-primary"
      class="text-secondary focus-none mb-2"
    >
      +
    </b-btn>
    <input
      @change="foto_selecionada"
      type="file"
      ref="arquivo"
      accept="image/*"
      class="d-none"
    />
    <ul class="list-unstyled">
      <li v-for="(foto, index) in fotos" :key="index" class="mb-2">
        <div class="d-flex align-items-start justify-content-between">
          <b-img
            :src="foto.img"
            width="80"
            height="80"
            class="mb-2 rounded"
          ></b-img>
          <b-btn
            @click="fotos.splice(index, 1)"
            size="sm"
            variant="link"
            class="p-0"
            >Apagar</b-btn
          >
        </div>
        <h6>Descrição da foto:</h6>
        <b-input
          v-if="foto.editando"
          v-model="foto.descricao"
          type="text"
          @keyup.enter="foto.editando = false"
          @blur="foto.editando = false"
          class="w-100"
        />
        <p v-else @click="foto.editando = true" class="w-100">
          {{ foto.descricao }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FotoUpload',
  props: {
    editavel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      fotos: [],
    };
  },
  methods: {
    addFoto() {
      $(this.$refs.arquivo).trigger('click');
    },
    foto_selecionada() {
      const files = $(this.$refs.arquivo).prop('files');
      if (files.lenght < 1) {
        return false;
      }
      const foto = files[0];
      const leitor = new FileReader();
      leitor.onload = () => {
        this.fotos.push({
          img: leitor.result,
          descricao: foto.name,
        });
        $(this.$refs.arquivo).val('');
      };
      leitor.readAsDataURL(foto);
    },
  },
};
</script>

<style scoped>
p {
  font-size: 14px;
  cursor: pointer;
}
h6 {
  font-size: 15px;
}
</style>
