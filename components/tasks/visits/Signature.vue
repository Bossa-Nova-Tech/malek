<template>
  <div class="pt-2">
    <b-row>
      <b-col cols="12">
        <vueSignature
          ref="signature"
          :sig-option="option"
          :w="'100%'"
          :h="'100px'"
          :disabled="disabled"
          class="border rounded mb-2"
        ></vueSignature>
      </b-col>
    </b-row>
    <b-button-group size="sm" class="controllers d-flex">
      <b-button variant="success" @click="save">Salvar</b-button>
      <b-button variant="danger" @click="clear">Limpar</b-button>
      <b-button variant="warning" class="text-white" @click="undo"
        >Desfazer</b-button
      >
      <b-button @click="handleDisabled">Desabilitar</b-button>
    </b-button-group>
  </div>
</template>

<script>
import vueSignature from 'vue-signature';
export default {
  name: 'App',
  components: {
    vueSignature,
  },
  data() {
    return {
      option: {
        penColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255,255,255)',
      },
      disabled: false,
    };
  },
  methods: {
    save() {
      const _this = this;
      const png = _this.$refs.signature.save();
      const jpeg = _this.$refs.signature.save('image/jpeg');
      const svg = _this.$refs.signature.save('image/svg+xml');
      console.log(png);
      console.log(jpeg);
      console.log(svg);
    },
    clear() {
      const _this = this;
      _this.$refs.signature.clear();
    },
    undo() {
      const _this = this;
      _this.$refs.signature.undo();
    },
    handleDisabled() {
      const _this = this;
      _this.disabled = !_this.disabled;
    },
  },
};
</script>
<style lang="scss" scoped>
/* .controllers {
  max-width: 400px;
} */
</style>
