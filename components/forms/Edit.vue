<template>
  <b-modal
    :id="'update-service-' + servicoSelecionado.id"
    :ref="'update-service-' + servicoSelecionado.id"
    size="lg"
    hide-header
    hide-footer
    class="form-modal"
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Editar Serviço</h1>
        {{ servicoSelecionado.id }} {{ servicoSelecionado.name }}
        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          role="button"
          @click="$bvModal.hide('update-service-' + servicoSelecionado.id)"
        />
      </div>
      <b-form-group class="mb-4">
        <label for="name">Descrição</label>
        <b-form-input
          v-model="formData.name"
          name="name"
          placeholder="Instalação de ar condicionado"
        >
        </b-form-input>
      </b-form-group>

      <div class="mb-4">
        <label for="time_of_execution"
          >Duração média da tarefa <span class="requerido">*</span></label
        >
        <b-input-group>
          <b-form-input
            id="time_of_execution"
            v-model="formData.time_of_execution"
            v-mask="['##:##:##']"
            placeholder="00h:00m00s"
          ></b-form-input>
          <b-input-group-append>
            <b-form-timepicker
              v-model="formData.time_of_execution"
              button-only
              right
              show-seconds
              locale="br"
              label-close-button="fechar"
              label-no-time-selected="selecione o tempo"
              aria-controls="time_of_execution"
              :class="{ 'is-invalid': $v.formData.time_of_execution.$error }"
            ></b-form-timepicker>
          </b-input-group-append>
        </b-input-group>
        <b-form-invalid-feedback>
          Preencha o campo acima
        </b-form-invalid-feedback>
      </div>

      <b-form-checkbox
        v-model="formData.need_signature"
        class="checkbox mb-4 d-flex align-items-center"
        >É necessário coletar assinatura durante visita.</b-form-checkbox
      >

      <b-form-checkbox
        v-model="formData.send_to_email"
        class="checkbox mb-4 d-flex align-items-center"
        >Enviar automaticamente por e-mail
      </b-form-checkbox>

      <div class="w-100 mb-4 col-12 px-0">
        <button :disable="formSend" @click="edit">
          <b-spinner v-if="formSend" small type="grow" />
          Salvar
        </button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';
export default {
  name: 'Edit',
  directives: { mask },
  mixins: [validationMixin],
  props: {
    servicoSelecionado: {
      type: Object,
      default: null,
    },
    watching: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      formSend: false,
      servico: null,
      formData: {
        estimated_value: null,
        description: null,
        guarantee: null,
        status: null,
        need_signature: null,
        time_of_execution: null,
        name: null,
        send_to_email: false,
        company_id: null,
      },
    };
  },

  validations: {
    formData: {
      time_of_execution: { required },
      name: { required },
    },
  },

  watch: {
    watching() {
      this.setDataFormWithService();
    },
  },

  methods: {
    setDataFormWithService() {
      this.formData.estimated_value = this.servicoSelecionado.estimated_value;
      this.formData.description = this.servicoSelecionado.description;
      this.formData.guarantee = this.servicoSelecionado.guarantee;
      this.formData.company_id = this.servicoSelecionado.company_id;
      this.formData.time_of_execution =
        this.servicoSelecionado.time_of_execution;
      this.formData.name = this.servicoSelecionado.name;
      this.formData.need_signature = this.servicoSelecionado.need_signature;
      this.formData.status = this.servicoSelecionado.status;
      this.formData.send_to_email = this.servicoSelecionado.send_to_email;
    },
    async edit(_response) {
      const servico = await this.$parent.servicoSelecionado;
      console.log(servico);
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        console.log(this.formData);
        this.$v.$reset();
        try {
          this.formSend = false;
          this.$v.$reset();
          console.log('executou o clic');

          await this.$axios
            .put(`services/${servico.id}`, this.$data.formData)
            .then((_res) => {
              console.log('sucesso');
              this.$root.$emit(
                'bv::hide::modal',
                `update-service-${this.servicoSelecionado.id}`,
              );

              // this.$refs.criar.hide();

              this.toast('success', 'Sucesso', 'Serviço editado com sucesso!');
              this.$nuxt.refresh();
            })
            .catch((_err) => {});
        } catch (error) {
          console.log(error, 'sadasda');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.requerido {
  color: var(--red-50);
}

label {
  color: var(--gray-40);
  font-size: 0.75rem;
  font-weight: 500;
}

.custom-select {
  color: #6c757d !important;
}

@media screen and (max-width: 991px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 0rem;
  }
}
</style>
