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
  props: {
    id: {
      type: Number,
      default: null,
    },
    timer: {
      type: String,
      default: null,
    },
    visita: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      option: {
        penColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255,255,255)',
      },
      disabled: false,
      signature: null,
      formData: {
        duration: null,
        signature: null,
        hour_visit: null,
        date_visit: null,
      },
    };
  },
  methods: {
    async save() {
      const _this = this;
      this.formData.signature = _this.$refs.signature.save();
      /* this.duration = this.timer;
      console.log(this.duration); */
      try {
        console.log(this.visita);
        this.formData = {
          date_visit: this.visita.date_visit,
          hour_visit: this.visita.hour_visit,
          user_id: this.visita.user_id,
          photo: [
            {
              title: null,
              description: null,
              image: this.formData.signature,
              type: 'signature',
            },
          ],
        };
        await this.$axios
          .put('tasks/visit/' + this.visita.id, this.$data.formData)
          .then((_res) => {
            this.$root.$emit('bv::hide::modal', 'visitas');
            this.toast('success', 'Sucesso', 'Visita adicionada com sucesso!');
            /* this.$router.go( 0); */
          });
        this.$nuxt.refresh().catch((_err) => {});
        this.$bvModal.hide(`visitFinished-${this.visita.id}`);
      } catch (error) {
        console.log(error);
      }
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
