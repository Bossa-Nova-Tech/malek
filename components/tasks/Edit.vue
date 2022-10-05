<template>
  <b-modal
    :id="'update-task-' + ordem_item.id"
    :ref="'update-task-' + ordem_item.id"
    size="lg"
    hide-header
    hide-footer
    class="form-modal"
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Editar Ordem de Serviço</h1>

        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          role="button"
          @click="$bvModal.hide(`update-task-${ordem_item.id}`)"
        />
      </div>
      <b-form-group class="mb-4">
        <label for="template">Template <span class="requerido">*</span></label>
        <b-form-select
          v-model="formData.template"
          name="template"
          :options="optionsTemplate"
          :class="{ 'is-invalid': $v.formData.template.$error }"
        />
        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-4">
        <label for="services">Serviço <span class="requerido">*</span></label>
        <b-form-select
          v-model="formData.services"
          name="services"
          :options="optionsServices"
          :class="{ 'is-invalid': $v.formData.services.$error }"
        />
        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group class="mb-4">
        <label for="customer">Cliente <span class="requerido">*</span></label>
        <b-form-select
          v-model="formData.name_customer"
          name="customer"
          :class="{ 'is-invalid': $v.formData.name_customer.$error }"
        >
          <b-form-select-option :value="null" desabled
            >Selecione</b-form-select-option
          >
          <b-form-select-option
            v-for="customer in customers"
            :key="customer.id"
            :value="customer.name + ' pessoa ' + customer.type"
          >
            {{ customer.name }}
          </b-form-select-option>
        </b-form-select>

        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>

      <div class="grid">
        <div class="mb-4">
          <label for="estimated_time"
            >Duração média da tarefa <span class="requerido">*</span></label
          >
          <b-input-group>
            <b-form-input
              id="estimated_time"
              v-model="formData.estimated_time"
              v-mask="['##:##:##']"
              placeholder="00h:00m00s"
            ></b-form-input>
            <b-input-group-append>
              <b-form-timepicker
                v-model="formData.estimated_time"
                button-only
                right
                show-seconds
                locale="br"
                label-close-button="fechar"
                label-no-time-selected="selecione o tempo"
                aria-controls="estimated_time"
                :class="{ 'is-invalid': $v.formData.estimated_time.$error }"
              ></b-form-timepicker>
            </b-input-group-append>
          </b-input-group>
          <b-form-invalid-feedback>
            Preencha o campo acima
          </b-form-invalid-feedback>
        </div>
        <b-form-group class="mb-4">
          <label for="end_date"
            >Data prevista de conclusão <span class="requerido">*</span></label
          >
          <b-form-datepicker
            v-model="formData.end_date"
            name="end_date"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            locale="pt"
            placeholder="00/00/2022"
            :class="{ 'is-invalid': $v.formData.end_date.$error }"
          />
          <b-form-invalid-feedback>
            Selecione uma opção.
          </b-form-invalid-feedback>
        </b-form-group>
      </div>
      <b-form-group name="form-text" class="mb-4">
        <label for="note">Observação</label>
        <b-form-textarea
          v-model="formData.note"
          name="note"
          placeholder="Esta tarefa consiste em..."
        >
        </b-form-textarea>
      </b-form-group>
      <b-form-checkbox
        v-model="formData.need_signature"
        class="checkbox mb-4 d-flex align-items-center"
        >É necessário coletar assinatura durante visita.</b-form-checkbox
      >

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
    ordem_item: {
      type: Object,
      default: null,
    },
    watching: {
      type: Number,
      default: null,
    },
    clientes: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      customers: [],
      formSend: false,
      ordem: null,
      formData: {
        status: null,
        need_signature: false,
        estimated_time: null,
        end_date: null,
        note: null,
        name_customer: null,
        template: null,
        services: null,
      },

      optionsServices: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'Manutenção de ar condicionado',
          text: 'Manutenção de ar condicionado',
        },
        {
          value: 'Instalação de ar condicionado',
          text: 'Instalação de ar condicionado',
        },
      ],

      optionsTemplate: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'Refrigeração',
          text: 'Refrigeração',
        },
      ],
    };
  },

  validations: {
    formData: {
      services: { required },
      template: { required },
      end_date: { required },
      name_customer: { required },
      estimated_time: { required },
    },
  },
  watch: {
    watching() {
      this.setDataFormWithTask();
    },
    async clientes() {
      const { data } = await this.$axios.get('customers');
      const customer = data;
      console.log(customer);
      this.customers = customer;
    },
  },

  methods: {
    setDataFormWithTask() {
      this.formData.services = this.ordem_item.services;
      this.formData.status = this.ordem_item.status;
      this.formData.need_signature = this.ordem_item.need_signature;
      this.formData.estimated_time = this.ordem_item.estimated_time;
      this.formData.end_date = this.ordem_item.end_date;
      this.formData.note = this.ordem_item.note;
      this.formData.name_customer = this.ordem_item.name_customer;
      this.formData.template = this.ordem_item.template;
    },
    async edit(_response) {
      const ordem = await this.$parent.ordem_selecionada;
      console.log(ordem);
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
            .put(`tasks/${ordem.id}`, this.$data.formData)
            .then((_res) => {
              console.log('sucesso');
              this.$root.$emit(
                'bv::hide::modal',
                `update-task-${this.ordem_item.id}`,
              );

              // this.$refs.criar.hide();

              this.toast('success', 'Sucesso', 'Item editado com sucesso!');
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
