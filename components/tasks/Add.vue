<template>
  <b-modal
    v-if="!$screen.md"
    id="criar"
    ref="criar"
    header-class="border-0 d-flex flex-column"
    footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
  >
    <template #modal-header>
      <b-img
        src="~/assets/img/icones/seta-voltar-azul.svg"
        class="mt-5 ml-3 mb-4"
        @click="$bvModal.hide('criar')"
      ></b-img>
      <h1 class="mt-2 ml-3">Criar Ordem de Serviço</h1>
    </template>
    <template #default>
      <b-form-group label="Serviço" label-for="formData.template">
        <b-form-select
          v-model="formData.template"
          :options="optionsTemplate"
          class="mb-4"
          :class="{ 'is-invalid': $v.formData.template.$error }"
        />
        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Categoria" label-for="formData.services">
        <b-form-select
          v-model="formData.services"
          :options="optionsServices"
          class="mb-4"
          :class="{ 'is-invalid': $v.formData.services.$error }"
        />
        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Cliente" label-for="formData.name_customer">
        <b-form-select
          v-model="formData.name_customer"
          :options="optionsNameCustomer"
          class="mb-4"
          :class="{ 'is-invalid': $v.formData.name_customer.$error }"
        />
        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="Duração média da tarefa"
        label-for="formData.estimated_time"
      >
        <b-form-select
          v-model="formData.estimated_time"
          :options="optionsEstimatedTime"
          class="mb-4"
        >
        </b-form-select>
      </b-form-group>
      <b-form-group
        label="Data prevista de conclusão"
        label-for="formData.end_date"
        class="mb-4"
      >
        <b-form-datepicker
          v-model="formData.end_date"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          direction="rtl"
          locale="pt"
          placeholder="00/00/2022"
          class="mb-4"
          :class="{ 'is-invalid': $v.formData.end_date.$error }"
        />
        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Observação" label-for="formData.note">
        <b-form-input
          v-model="formData.note"
          placeholder="Esta tarefa consiste em..."
        >
        </b-form-input>
      </b-form-group>
    </template>

    <template #modal-footer>
      <b-form-checkbox v-model="formData.need_signature"
        >É necessário coletar assinatura durante visita.</b-form-checkbox
      >
      <div class="w-100 row justify-content-center mb-4 mx-1">
        <button class="w-100" :disable="formSend" @click="register">
          <b-spinner v-if="formSend" small type="grow" />
          Salvar
        </button>
      </div>
    </template>
  </b-modal>
  <b-modal
    v-else
    id="criarGrande"
    ref="criarGrande"
    size="lg"
    header-class="border-0 justify-content-between"
    footer-class="border-0 justify-content-start"
  >
    <template #modal-header>
      <h1 class="mt-3 ml-3">Criar Ordem de Serviço</h1>
      <CloseIcon class="mr-3" @click.native="$bvModal.hide('criarGrande')" />
    </template>
    <template #default>
      <div class="d-flex col-12 m-0 p-0">
        <b-form-group
          label="Categoria"
          label-for="formData.services"
          class="col-6"
        >
          <b-form-select
            v-model="formData.services"
            :options="optionsServices"
            class="mb-4"
            :class="{ 'is-invalid': $v.formData.services.$error }"
          />
          <b-form-invalid-feedback>
            Selecione uma opção.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          label="Serviço"
          label-for="formData.template"
          class="col-6"
        >
          <b-form-select
            v-model="formData.template"
            :options="optionsTemplate"
            class="mb-4"
            :class="{ 'is-invalid': $v.formData.template.$error }"
          />
          <b-form-invalid-feedback>
            Selecione uma opção.
          </b-form-invalid-feedback>
        </b-form-group>
      </div>
      <b-form-group
        label="Cliente"
        label-for="formData.name_customer"
        class="px-3"
      >
        <b-form-select
          v-model="formData.name_customer"
          :options="optionsNameCustomer"
          class="mb-4"
          :class="{ 'is-invalid': $v.formData.name_customer.$error }"
        />
        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>
      <div class="d-flex">
        <b-form-group
          label="Duração média da tarefa"
          label-for="formData.estimated_time"
          class="col-6"
        >
          <b-form-select
            v-model="formData.estimated_time"
            :options="optionsEstimatedTime"
            class="mb-4"
          >
          </b-form-select>
        </b-form-group>
        <b-form-group
          label="Data prevista de conclusão"
          label-for="formData.end_date"
          class="mb-4 col-6"
        >
          <b-form-datepicker
            v-model="formData.end_date"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            direction="rtl"
            locale="pt"
            placeholder="00/00/2022"
            class="mb-4"
            :class="{ 'is-invalid': $v.formData.end_date.$error }"
          />
          <b-form-invalid-feedback>
            Selecione uma opção.
          </b-form-invalid-feedback>
        </b-form-group>
      </div>
      <b-form-group label="Observação" label-for="formData.note" class="px-3">
        <b-form-input
          v-model="formData.note"
          placeholder="Realizar manutenção no aparelho A"
          :class="{ 'is-invalid': $v.formData.note.$error }"
        >
        </b-form-input>
        <b-form-invalid-feedback>
          Preencha o campo acima.
        </b-form-invalid-feedback>
      </b-form-group>
    </template>

    <template #modal-footer>
      <b-form-checkbox v-model="formData.need_signature" class="mb-4 mx-4"
        >É necessário coletar assinatura durante visita.</b-form-checkbox
      >
      <div class="justify-content-center mb-4 w-100">
        <button :disable="formSend" @click="register">
          <b-spinner v-if="formSend" small type="grow" />
          Salvar
        </button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';
import CloseIcon from '../layout/CloseIcon.vue';
export default {
  name: 'Add',
  components: { CloseIcon },
  directives: { mask },
  mixins: [validationMixin],
  data() {
    return {
      formSend: false,
      formData: {
        need_signature: false,
        photo: [],
        estimated_time: null,
        end_date: null,
        note: null,
        name_customer: 'HAVAN Unidade 02',
        template: null,
        services: null,
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
      services: {
        required,
      },
      end_date: {
        required,
      },
      name_customer: {
        required,
      },
      /* name: {
              required,
            }, */
      template: {
        required,
      },
      note: {
        required,
      },
      estimated_time: {
        required,
      },
    },
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
              if (!this.$screen.md) {
                this.$refs.criar.hide();
              } else {
                this.$refs.criarGrande.hide();
              }
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
