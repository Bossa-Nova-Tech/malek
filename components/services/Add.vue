<template>
  <b-modal id="criar" ref="criar" size="lg" hide-header hide-footer>
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Criar Serviço</h1>
        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          alt="icone para fechar"
          role="button"
          @click.once="$bvModal.hide('criar')"
        />
      </div>
      <b-form-group class="mb-4">
        <label for="name">Nome</label>
        <b-form-input
          v-model="formData.name"
          name="name"
          placeholder="Instalação de ar condicionado"
        />
      </b-form-group>

      <b-form-group class="mb-4">
        <label for="Descrição">Descrição</label>
        <b-form-input
          v-model="formData.description"
          name="Descrição"
          placeholder="Esse serviço é utilizado para instalação de novos ar condicionado"
        />
      </b-form-group>

      <b-form-group class="mb-4">
        <div class="row">
          <div class="col-6">
            <label for="name">Valor estimado em R$</label>
            <b-form-input
              v-model="formData.estimated_value"
              v-mask="'R$##.##'"
              name="Valor estimado"
              placeholder="Valor estimado para o serviço"
            />
          </div>
          <div class="col-6">
            <label for="name">Tempo de garantia em dias</label>
            <b-form-input
              v-model="formData.guarantee"
              name="Valor estimado"
              placeholder="Valor estimado para o serviço"
            />
          </div>
        </div>
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
          />
          <b-input-group-append>
            <b-form-timepicker
              v-model="formData.time_of_execution"
              button-only
              show-seconds
              right
              locale="br"
              label-close-button="fechar"
              label-no-time-selected="selecione o tempo"
              aria-controls="time_of_execution"
              :class="{ 'is-invalid': $v.formData.time_of_execution.$error }"
            />
          </b-input-group-append>
        </b-input-group>
        <b-form-invalid-feedback>
          Preencha o campo acima
        </b-form-invalid-feedback>
      </div>

      <b-form-checkbox
        v-model="formData.need_signature"
        class="checkbox mb-4 d-flex align-items-center"
      >
        É necessário coletar assinatura durante visita.
      </b-form-checkbox>

      <b-form-checkbox
        v-model="formData.send_to_email"
        class="checkbox mb-4 d-flex align-items-center"
      >
        Enviar automaticamente por e-mail
      </b-form-checkbox>

      <b-form-checkbox
        v-model="formData.additional_form"
        class="checkbox mb-4 d-flex align-items-center"
      >
        Formulário para personalização de Ordem de Serviços
      </b-form-checkbox>

      <div class="w-100 mb-4 col-12 px-0">
        <button :disabled="formSend" @click.once="register">
          <b-spinner v-if="formSend" small type="grow" />
          Salvar
        </button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import Vue2Filters from 'vue2-filters';
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';

export default {
  name: 'Add',
  directives: { mask },
  mixins: [validationMixin, Vue2Filters.mixin],
  emits: ['serviceCreated'],

  data() {
    return {
      formSend: false,
      formData: {
        estimated_value: 0.0,
        description: '',
        guarantee: 1,
        time_of_execution: '',
        name: '',
        need_signature: false,
        send_to_email: false,
        additional_form: false,
      },
    };
  },

  validations: {
    formData: {
      time_of_execution: { required },
      name: { required },
    },
  },
  methods: {
    async register() {
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        console.log(this.formData);
        await this.$axios
          .post('services', this.$data.formData)
          .then((response) => {
            this.toast('success', 'Sucesso', 'Serviço cadastrado com sucesso!');
            this.$emit('serviceCreated', response.data.data);
          })
          .catch((error) => {
            console.error(error);
            this.toast(
              'error',
              'Whoops...',
              'Ocorreu um erro ao processar sua requisição!',
            );
          })
          .finally(() => {
            this.$bvModal.hide('criar');

            this.formData = {
              estimated_value: 0.0,
              description: '',
              guarantee: 1,
              time_of_execution: '',
              name: '',
              need_signature: false,
              send_to_email: false,
              additional_form: false,
            };
          });
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
