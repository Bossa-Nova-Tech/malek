<template>
  <b-modal id="criar" ref="criar" size="lg" hide-header hide-footer>
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Criar Ordem de Serviço</h1>
        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          role="button"
          @click="$bvModal.hide('criar')"
        />
      </div>

      <div class="grid">
        <b-form-group class="mb-4">
          <label for="template"
            >Categoria <span class="requerido">*</span></label
          >
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
          <label for="services"
            >Tamplate <span class="requerido">*</span></label
          >
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
      </div>

      <b-form-group class="mb-4">
        <label for="customer">Cliente <span class="requerido">*</span></label>
        <b-form-select
          v-model="formData.name_customer"
          name="customer"
          :class="{ 'is-invalid': $v.formData.name_customer.$error }"
        >
          <b-form-select-option
            v-for="customer in customers"
            :key="customer.id"
            :value="customer.name"
          >
            {{ customer.name }}
          </b-form-select-option>
        </b-form-select>

        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>

      <div class="grid">
        <div>
          <label for="estimated_time"
            >Duração média da tarefa <span class="requerido">*</span></label
          >
          <b-form-group class="mb-4">
            <b-form-input
              v-model="formData.estimated_time"
              name="estimated_time"
              type="time"
              placeholder="00:00"
              :class="{ 'is-invalid': $v.formData.estimated_time.$error }"
            />
            <b-form-invalid-feedback>
              Preencha o campo acima
            </b-form-invalid-feedback>
          </b-form-group>
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

      <b-form-group class="mb-4">
        <label for="note">Observação</label>
        <b-form-input
          v-model="formData.note"
          name="note"
          placeholder="Esta tarefa consiste em..."
        >
        </b-form-input>
      </b-form-group>
      <b-form-checkbox v-model="formData.need_signature" class="mb-4"
        >É necessário coletar assinatura durante visita.</b-form-checkbox
      >
      <div class="w-100 mb-4 col-12">
        <button :disable="formSend" @click="register">
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
  name: 'Add',
  directives: { mask },
  mixins: [validationMixin],

  data() {
    return {
      customers: [],
      formSend: false,
      formData: {
        need_signature: false,
        photo: [],
        estimated_time: null,
        end_date: null,
        note: null,
        name_customer: null,
        template: null,
        services: null,
        time: null,
        // name: 'José da Silveira',
        /* performance: null, */
        time_of_execution: '02h30',
      },
      optionsTemplate: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'Manutenção',
          text: 'Manutenção',
        },
        {
          value: 'Instalação',
          text: 'Instalação',
        },
      ],
      optionsServices: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'Manutenção',
          text: 'Manutenção',
        },
        {
          value: 'Instalação',
          text: 'Instalação',
        },
      ],
      optionsNameCustomer: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'HAVAN Unidade 02',
          text: 'HAVAN Unidade 02',
        },
        {
          value: 'HAVAN Unidade 03',
          text: 'HAVAN Unidade 03',
        },
      ],
      optionsEstimatedTime: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: '02horas e 30min',
          text: '02horas e 30min',
        },
        {
          value: '03horas e 30min',
          text: '03horas e 30min',
        },
      ],
    };
  },

  validations: {
    formData: {
      services: { required },
      end_date: { required },
      name_customer: { required },
      template: { required },
      estimated_time: { required },
    },
  },
  async mounted() {
    const { data } = await this.$axios.get('customers');
    const customer = data;
    console.log(customer);
    this.customers = customer;
  },

  methods: {
    async register(_response) {
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        /* this.ordens.push(this.formData); */
        /* this.formDataEdited = this.formData; */
        console.log(this.formData);
        this.$v.$reset();
        try {
          this.formSend = false;
          this.$v.$reset();
          console.log('executou o clic');
          await this.$axios
            .post('tasks', this.$data.formData)
            .then((_res) => {
              this.$refs.criar.hide();
              this.toast('success', 'Sucesso', 'Item adicionado com sucesso!');
              this.$nuxt.refresh();
            })
            .catch((_err) => {});
        } catch (error) {
          console.log(error);
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

@media screen and (max-width: 991px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 0rem;
  }
}
</style>
