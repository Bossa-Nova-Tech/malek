<template>
  <b-modal
    :id="`criar-${editar}-${id}`"
    ref="criar"
    size="lg"
    hide-header
    hide-footer
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 v-if="editar === true" class="mt-4 mb-5">
          Editar Ordem de Serviço
        </h1>
        <h1 v-else class="mt-4 mb-5">Criar Ordem de Serviço</h1>

        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          role="button"
          @click="$bvModal.hide(`criar-${editar}-${id}`)"
        />
      </div>

      <b-form-group class="mb-4">
        <label for="services">Template <span class="requerido">*</span></label>
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
            :value="customer.name"
            >{{ customer.name }}
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
              placeholder="00h:00m00s"
              v-mask="['##:##:##']"
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
          <!-- <b-input-group>
            <b-form-input
              v-model="formData.end_date"
              placeholder="00/00/2022"
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                type="date"
                v-model="formData.end_date"
                button-only
                right
                locale="br"
                :date-format-options="{
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                }"
                aria-controls="end
                -date"
              ></b-form-datepicker>
            </b-input-group-append>
          </b-input-group> -->
          <b-form-datepicker
            v-model="formData.end_date"
            name="end_date"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            locale="br"
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
      <b-form-checkbox
        v-model="formData.need_signature"
        class="checkbox mb-4 d-flex align-items-center"
        >É necessário coletar assinatura durante visita.</b-form-checkbox
      >
      <div v-if="editar === false" class="w-100 mb-4 col-12 px-0">
        <button :disable="formSend" @click="register">
          <b-spinner v-if="formSend" small type="grow" />
          Salvar
        </button>
      </div>
      <div v-else class="w-100 mb-4 col-12 px-0">
        <button :disable="formSend" @click="edit">
          <b-spinner v-if="formSend" small type="grow" />
          Salvar
        </button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import moment from 'moment';
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';
export default {
  name: 'Add',
  directives: { mask },
  mixins: [validationMixin],
  props: {
    id: {
      type: Number,
      default: null,
    },
    editar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      format: 'DD-MM-YYYY',
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
          value: 'Refrigeração',
          text: 'Refrigeração',
        },
      ],
    };
  },

  validations: {
    formData: {
      services: { required },
      end_date: { required },
      name_customer: { required },
      estimated_time: { required },
    },
  },
  watch: {
    formData() {
      this.formData.end_date = moment(
        this.formData.end_date,
        'YYYY-MM-DD',
      ).format('DD-MM-YYYY');
      console.log('não funcionou');
    },
  },

  async mounted() {
    const { data } = await this.$axios.get('customers');
    const customer = data;
    console.log(customer);
    this.customers = customer;
    await this.setDataFormWithTask();
  },
  methods: {
    async register(_response) {
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
    async setDataFormWithTask() {
      if (this.$route.query.ordem) {
        const id = this.$route.query.ordem;
        const task = await this.$axios.$get(`tasks/${id}`, this.$data.formData);

        this.formData.services = task.services;
        this.formData.status = task.status;
        this.formData.need_signature = task.need_signature;
        this.formData.estimated_time = task.estimated_time;
        this.formData.end_date = task.end_date;
        this.formData.note = task.note;
        this.formData.name_customer = task.name_customer;
        this.formData.template = task.template;
      }
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
              this.$refs.criar.hide();
              this.toast('success', 'Sucesso', 'Item editado com sucesso!');
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
