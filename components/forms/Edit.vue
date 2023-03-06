<template>
  <b-modal
    :id="'update-forms-' + this.formsSelecionado.id"
    :ref="'update-forms-' + this.formsSelecionado.id"
    size="lg"
    hide-header
    hide-footer
    class="form-modal"
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Criar Formulário</h1>

        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          alt="icone de fechar"
          role="button"
          @click.once="$bvModal.hide('update-forms-' + formsSelecionado.id)"
        />
      </div>

      <b-form-group class="mb-4">
        <label for="name">Descrição</label>
        <b-form-input
          v-model="formData.name"
          name="name"
          placeholder="Nome do formulário"
          :class="{ 'is-invalid': $v.formData.name.$error }"
        >
        </b-form-input>
      </b-form-group>
      <b-form-invalid-feedback>
        Preencha o campo acima
      </b-form-invalid-feedback>

      <b-form-group class="mb-4">
        <label for="event_show">Exibir durante a(o)</label>
        <b-form-select
          v-model="formData.event_show"
          name="event_show"
          :options="displayOptions"
          :class="{ 'is-invalid': $v.formData.event_show.$error }"
        >
        </b-form-select>
      </b-form-group>
      <b-card
        v-for="(fields, index) in formData.fields"
        :key="index"
        class="separador mb-3"
      >
        <div class="d-flex justify-content-end">
          <b-img
            role="button"
            src="~/assets/img/icones/delete-icon.svg"
            @click="deletAsk(fields)"
          />
        </div>
        <b-form-group class="mb-4">
          <label for="ask_text">Pergunta </label>
          <b-form-input
            v-model="fields.name"
            name="ask_text"
            type="text"
            placeholder="Qual é a sua pergunta?"
          />
          <b-form-invalid-feedback>
            Preencha o campo acima
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="mb-4">
          <label>Tipo de resposta</label>
          <b-form-radio-group
            v-model="fields.type"
            :options="typeOfAnswer"
            class="d-flex flex-column"
          />
        </b-form-group>
        <b-form-group class="mb-4">
          <label for="required">A resposta é obrigatória?</label>
          <b-form-radio-group
            v-model="fields.is_required"
            :options="isRequired"
          />
          <b-form-invalid-feedback>
            Preencha o campo acima
          </b-form-invalid-feedback>
        </b-form-group>
        <div
          v-if="
            fields.type === 'Checkbox' ||
            fields.type === 'Selecionar' ||
            fields.type === 'Alternativas(radio)'
          "
        >
          <p class="answer mt-3 mb-2">Escreva as opções da resposta:</p>
          <b-form-group
            v-for="(options, i) in fields.options"
            :key="i"
            :index="i"
          >
            <!-- <pre>{{ ask.options }}</pre> -->
            <div class="d-flex align-items-center">
              <b-form-input
                v-model="options.name"
                placeholder="Opção de resposta"
              ></b-form-input>
              <!-- <b-form-input
                v-model="ask.options[index].text"
                name="options"
                placeholder="Opção de resposta"
              ></b-form-input> -->
              <div class="pl-2">
                <b-img
                  role="button"
                  fluid
                  src="~/assets/img/icones/delete-icon.svg"
                  @click="handleDelete(i, index)"
                />
              </div>
            </div>
          </b-form-group>

          <b-button
            class="shadow-none my-3 add_ask d-flex align-items-center"
            @click="adicionarOpcaoDeResposta(index, i)"
          >
            <svg
              width="26"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5393 0C15.0116 0 17.4283 0.733112 19.4839 2.10663C21.5395 3.48015 23.1417 5.43238 24.0878 7.71646C25.0339 10.0005 25.2814 12.5139 24.7991 14.9386C24.3168 17.3634 23.1263 19.5907 21.3781 21.3388C19.63 23.087 17.4027 24.2775 14.9779 24.7598C12.5532 25.2421 10.0398 24.9946 7.75576 24.0485C5.47169 23.1024 3.51945 21.5002 2.14594 19.4446C0.772418 17.389 0.0393066 14.9723 0.0393066 12.5C0.0430396 9.18594 1.3612 6.00868 3.70459 3.66529C6.04799 1.32189 9.22524 0.00373305 12.5393 0ZM12.5393 22.2222C14.4622 22.2222 16.3419 21.652 17.9407 20.5837C19.5395 19.5154 20.7856 17.997 21.5215 16.2205C22.2573 14.444 22.4498 12.4892 22.0747 10.6033C21.6996 8.71736 20.7736 6.98503 19.414 5.62535C18.0543 4.26567 16.3219 3.33972 14.436 2.96459C12.5501 2.58945 10.5953 2.78199 8.81877 3.51784C7.04227 4.25369 5.52386 5.49981 4.45557 7.09862C3.38728 8.69743 2.81708 10.5771 2.81708 12.5C2.82001 15.0776 3.84526 17.5488 5.66789 19.3714C7.49053 21.194 9.96171 22.2193 12.5393 22.2222V22.2222ZM6.52079 12.5C6.5208 12.8684 6.66713 13.2216 6.92759 13.4821C7.18806 13.7425 7.54132 13.8889 7.90968 13.8889H11.1504V17.1296C11.1504 17.498 11.2967 17.8513 11.5572 18.1117C11.8177 18.3722 12.1709 18.5185 12.5393 18.5185C12.9077 18.5185 13.2609 18.3722 13.5214 18.1117C13.7819 17.8513 13.9282 17.498 13.9282 17.1296V13.8889H17.1689C17.5373 13.8889 17.8906 13.7426 18.151 13.4821C18.4115 13.2216 18.5578 12.8684 18.5578 12.5C18.5578 12.1316 18.4115 11.7784 18.151 11.5179C17.8906 11.2574 17.5373 11.1111 17.1689 11.1111H13.9282V7.87037C13.9282 7.50201 13.7819 7.14874 13.5214 6.88828C13.2609 6.62781 12.9077 6.48148 12.5393 6.48148C12.1709 6.48148 11.8177 6.62781 11.5572 6.88828C11.2967 7.14874 11.1504 7.50201 11.1504 7.87037V11.1111H7.90968C7.54132 11.1111 7.18806 11.2574 6.92759 11.5179C6.66713 11.7784 6.5208 12.1316 6.52079 12.5Z"
                fill="#FF5A00"
              />
            </svg>
            <h3 class="p-0 m-0 ml-2">Adicionar opção</h3>
          </b-button>
        </div>
      </b-card>

      <b-button
        class="shadow-none mb-4 add_ask d-flex align-items-center"
        @click="adicionarPergunta"
      >
        <svg
          width="26"
          height="25"
          viewBox="0 0 26 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5393 0C15.0116 0 17.4283 0.733112 19.4839 2.10663C21.5395 3.48015 23.1417 5.43238 24.0878 7.71646C25.0339 10.0005 25.2814 12.5139 24.7991 14.9386C24.3168 17.3634 23.1263 19.5907 21.3781 21.3388C19.63 23.087 17.4027 24.2775 14.9779 24.7598C12.5532 25.2421 10.0398 24.9946 7.75576 24.0485C5.47169 23.1024 3.51945 21.5002 2.14594 19.4446C0.772418 17.389 0.0393066 14.9723 0.0393066 12.5C0.0430396 9.18594 1.3612 6.00868 3.70459 3.66529C6.04799 1.32189 9.22524 0.00373305 12.5393 0ZM12.5393 22.2222C14.4622 22.2222 16.3419 21.652 17.9407 20.5837C19.5395 19.5154 20.7856 17.997 21.5215 16.2205C22.2573 14.444 22.4498 12.4892 22.0747 10.6033C21.6996 8.71736 20.7736 6.98503 19.414 5.62535C18.0543 4.26567 16.3219 3.33972 14.436 2.96459C12.5501 2.58945 10.5953 2.78199 8.81877 3.51784C7.04227 4.25369 5.52386 5.49981 4.45557 7.09862C3.38728 8.69743 2.81708 10.5771 2.81708 12.5C2.82001 15.0776 3.84526 17.5488 5.66789 19.3714C7.49053 21.194 9.96171 22.2193 12.5393 22.2222V22.2222ZM6.52079 12.5C6.5208 12.8684 6.66713 13.2216 6.92759 13.4821C7.18806 13.7425 7.54132 13.8889 7.90968 13.8889H11.1504V17.1296C11.1504 17.498 11.2967 17.8513 11.5572 18.1117C11.8177 18.3722 12.1709 18.5185 12.5393 18.5185C12.9077 18.5185 13.2609 18.3722 13.5214 18.1117C13.7819 17.8513 13.9282 17.498 13.9282 17.1296V13.8889H17.1689C17.5373 13.8889 17.8906 13.7426 18.151 13.4821C18.4115 13.2216 18.5578 12.8684 18.5578 12.5C18.5578 12.1316 18.4115 11.7784 18.151 11.5179C17.8906 11.2574 17.5373 11.1111 17.1689 11.1111H13.9282V7.87037C13.9282 7.50201 13.7819 7.14874 13.5214 6.88828C13.2609 6.62781 12.9077 6.48148 12.5393 6.48148C12.1709 6.48148 11.8177 6.62781 11.5572 6.88828C11.2967 7.14874 11.1504 7.50201 11.1504 7.87037V11.1111H7.90968C7.54132 11.1111 7.18806 11.2574 6.92759 11.5179C6.66713 11.7784 6.5208 12.1316 6.52079 12.5Z"
            fill="#FF5A00"
          />
        </svg>
        <h3 class="p-0 m-0 ml-2">Adicionar Perguntas</h3>
      </b-button>
      <b-form-checkbox
        v-model="formData.is_required"
        class="checkbox mb-4 d-flex align-items-center"
        >Este formulário é obrigatório</b-form-checkbox
      >
      <div class="w-100 mb-4 col-12 px-0">
        <button :disable="formSend" @click.once="edit">
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
    formsSelecionado: {
      type: Object | Array,
      default: null,
    },
    watching: {
      type: Number,
      default: null,
    },
    formsFields: {
      type: Object | Array,
      default: null,
    },
  },
  data() {
    return {
      i: 0,
      j: 0,
      option: null,
      counter: 1,
      counter_answer: 0,
      formSend: false,
      formData: {
        name: '',
        event_show: '',
        is_required: false,
        fields: [
          {
            company_id: this.$auth.user.company_id,
            name: '',
            type: '',
            is_required: false,
            options: [
              {
                name: '',
              },
            ],
          },
        ],
      },
      typeOfAnswer: [
        {
          value: 'Checkbox',
          html: '<span style="color:#212529; font-weight:500; font-size:0.8rem;">Checkbox</span>',
        },
        {
          value: 'Selecionar',
          html: '<span style="color:#212529; font-weight:500; font-size:0.8rem;">Selecionar</span>',
        },
        {
          value: 'Texto curto',
          html: '<span style="color:#212529; font-weight:500; font-size:0.8rem;">Texto curto</span>',
        },
        {
          value: 'Texto longo',
          html: '<span style="color:#212529; font-weight:500; font-size:0.8rem;">Texto longo</span>',
        },
        {
          value: 'Alternativas(radio)',
          html: '<span style="color:#212529; font-weight:500; font-size:0.8rem;">Alternativas(radio)</span>',
        },
        {
          value: 'Data',
          html: '<span style="color:#212529; font-weight:500; font-size:0.8rem;">Data</span>',
        },
        {
          value: 'Horas',
          html: '<span style="color:#212529; font-weight:500; font-size:0.8rem;">Horas</span>',
        },
        {
          value: 'Número',
          html: '<span style="color:#212529; font-weight:500; font-size:0.8rem;">Número</span>',
        },
        {
          value: 'Foto',
          html: '<span style="color:#212529; font-weight:500; font-size:0.8rem;">Foto</span>',
        },
      ],
      displayOptions: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'Criação',
          text: 'Criação',
        },
        {
          value: 'Atendimento',
          text: 'Atendimento',
        },
        {
          value: 'Conclusão',
          text: 'Conclusão',
        },
      ],
      isRequired: [
        {
          value: true,
          html: '<span style="color:#212529; font-weight:500; font-size:0.8rem;">Sim</span>',
        },
        {
          value: false,
          html: '<span style="color:#212529; font-weight:500; font-size:0.8rem;">Não</span>',
        },
      ],
    };
  },

  validations: {
    formData: {
      event_show: { required },
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
      this.formData.event_show = this.formsSelecionado.event_show;
      if (this.formsSelecionado.is_required == 1) {
        this.formData.is_required = true;
      } else {
        this.formData.is_required = false;
      }
      this.formData.name = this.formsSelecionado.name;
      this.formData.fields = this.formsFields;
      for (this.j = 0; this.j < this.formsFields.length; this.j++) {
        this.formData.fields.length = this.formsFields.length;
        this.formData.fields[this.j].name = this.formsFields[this.j].name;
        this.formData.fields[this.j].type = this.formsFields[this.j].type;
        if (this.formsFields[this.j].is_required == 1) {
          this.formData.fields[this.j].is_required = true;
        } else {
          this.formData.fields[this.j].is_required = false;
        }
        this.formData.fields[this.j].options = this.formsFields[this.j].options;
        for (
          this.i;
          this.i < this.formsFields[this.j].options.length;
          this.i++
        ) {
          this.formData.fields[this.j].options[this.i].name =
            this.formsFields[this.j].options[this.i].name;
        }
      }
    },
    adicionarPergunta(index) {
      this.formData.fields.push({
        name: null,
        type: null,
        is_required: null,
        options: [
          {
            name: null,
          },
        ],
      });
      console.log(index);
    },
    adicionarOpcaoDeResposta(index, i) {
      /* this.formData.fields[index].options[i].push({ name: null }); */
      this.formData.fields[index].options.push({ name: null });
    },
    deletAsk(fields) {
      this.formData.fields.splice(this.formData.fields.indexOf(fields), 1);
      console.log(this.formData.fields.indexOf(fields));
    },
    handleDelete(i, index) {
      this.formData.fields[index].options.splice(
        this.formData.fields[index].options[i],
      );
    } /* .options.filter(
          (options) => options.id !== id,
        ), */,

    /*  this.formData.fields[index].options[id] = this.formData.fields[
        index
      ].options.filter((options) => options.id !== id); */

    deletAnswer(options, fields) {
      console.log(this.formData.fields.indexOf(options));

      this.formData.fields.splice(this.formData.fields.indexOf(options), 1);
      console.log('teste' + this.formData.fields.indexOf(options));
    },
    async edit(_response) {
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
            .put(`forms/${this.formsSelecionado.id}`, this.$data.formData)
            .then((_res) => {
              console.log('sucesso');
              this.$root.$emit(
                'bv::hide::modal',
                `update-service-${this.formsSelecionado.id}`,
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

.answer {
  color: var(--gray-40);
  font-size: 0.75rem;
  font-weight: 500;
}

.custom-select {
  color: #6c757d !important;
}

.separador {
  padding: 0.5rem;
  border: 1px solid #ff5a00;
  border-radius: 8px;
  box-shadow: 0px 4px 4px #ff59002f;
}

.add_ask {
  background: hsla(206, 23%, 94%, 0.175);
  border-radius: 8px;
  color: black;
  padding: 0.5rem;
  border: 1px solid #ff5a00;

  h3 {
    font-size: 1rem;
  }
}

@media screen and (max-width: 991px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 0rem;
  }
}
</style>
