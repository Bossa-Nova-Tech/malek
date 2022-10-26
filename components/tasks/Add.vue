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

      <b-form-group class="mb-4">
        <label for="service">Serviço <span class="requerido">*</span></label>
        <b-form-select
          v-model="formData.services_names"
          name="service"
          :class="{ 'is-invalid': $v.formData.services_names.$error }"
        >
          <b-form-select-option :value="null" desabled
            >Selecione</b-form-select-option
          >
          <b-form-select-option
            v-for="service in services"
            :key="service.id"
            :value="service.name"
          >
            {{ service.name }}
          </b-form-select-option>
        </b-form-select>

        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- b-form-group class="mb-4">
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
      </b-form-group> -->

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
      <div class="w-100 mb-4 col-12 px-0">
        <button :disable="formSend" @click.once="register">
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
  filters: {
    truncate(data) {
      const reqdString = data.split('');
      const teste = data.split(' ');
      console.log(reqdString);
      return teste[0];
    },
  },
  mixins: [validationMixin, Vue2Filters.mixin],
  props: {
    watching: {
      type: Number,
      default: null,
    },
    watching2: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      format: 'DD-MM-YYYY',
      customers: [],
      services: [],
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
        services_names: null,
      },
    };
  },

  validations: {
    formData: {
      services_names: { required },
      end_date: { required },
      name_customer: { required },
      estimated_time: { required },
    },
  },
  watch: {
    async watching() {
      const { data } = await this.$axios.get('customers');
      const customer = data;
      this.customers = customer;
      console.log('custumer' + customer);
    },
    async watching2() {
      const { data } = await this.$axios.get('services');
      const service = data;
      this.services = service;
      console.log('servicesn' + this.services);
    },
  },
  /* async mounted() {
    const { data } = await this.$axios.get('customers');
    const customer = data;
    console.log(customer);
    this.customers = customer;
  }, */
  methods: {
    async register(_response) {
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        console.log(this.formData);
        try {
          this.formSend = false;
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
