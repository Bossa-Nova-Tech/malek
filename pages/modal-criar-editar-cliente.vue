<template>
  <div>
    <button @click="showModal = true"></button>
    <b-modal
      id="modal"
      ref="modal"
      v-model="showModal"
      header-class="border-0 d-flex flex-column"
      footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
    >
      <template #modal-header>
        <b-img
          src="~/assets/img/icones/seta-voltar-azul.svg"
          class="mt-5 ml-3 mb-4"
        ></b-img>
        <h1 class="mt-2 ml-3">Criar Ordem de Serviço</h1>
      </template>
      <template #default>
        <b-form-group label="Nome" label-for="formData.name">
          <b-form-input
            v-model="formData.name"
            placeholder="Nome Exemplo"
            class="mb-4"
            :class="{ 'is-invalid': $v.formData.name.$error }"
          />
          <b-form-invalid-feedback>
            Digite o seu nome.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group v-model="legal_physical_person">
          <b-form-radio v-model="physical"> Pessoa Física </b-form-radio>
          <b-form-radio v-model="legal"> Pessoa Jurídica </b-form-radio>
        </b-form-group>
        <b-form-group label="E-mail" label-for="formData.email">
          <b-form-input
            v-model="formData.email"
            placeholder="email@email.com"
            class="mb-4"
            :class="{ 'is-invalid': $v.formData.email.$error }"
          />
          <b-form-invalid-feedback>
            Selecione uma opção.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Cliente" label-for="formData.name_customer">
          <b-form-select
            v-model="formData.name_customer"
            placeholder="00000-000"
            class="mb-4"
            :class="{ 'is-invalid': $v.formData.cep.$error }"
          />
          <b-form-invalid-feedback>
            Campo obrigatório.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Bairro" label-for="formData.district">
          <b-form-input
            v-model="formData.district"
            placeholder="Bairro A"
            class="mb-4"
          />
        </b-form-group>
        <b-form-group label="Cidade" label-for="formData.city" class="mb-4">
          <b-form-input
            v-model="formData.city"
            placeholder="Cidade B"
            class="mb-4"
          />
        </b-form-group>
        <b-form-group label="Estado" label-for="formData.state">
          <b-form-input v-model="formData.state" placeholder="Estado">
          </b-form-input>
        </b-form-group>
        <div>
          <b-form-group label="Número" label-for="formData.number">
            <b-form-input v-model="formData.number" placeholder="000" />
          </b-form-group>
          <b-form-group label="Complemento" label-for="formData.complement">
            <b-form-input v-model="formData.number" placeholder="Complemento" />
          </b-form-group>
        </div>
      </template>

      <template #modal-footer>
        <div class="w-100 row justify-content-center mb-4 mx-1">
          <button class="w-100" :disabled="formSend" @click="register">
            <b-spinner v-if="formSend" small type="grow" />
            Salvar
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';
export default {
  directives: { mask },
  mixins: [validationMixin],
  data: () => {
    return {
      showModal: false,
      formData: {
        name: null,
        cnpj: null,
        cpf: null,
        phone: null,
        email: null,
      },
    };
  },
  head() {
    return {
      title: `Ordem de Serviços |  ${process.env.title}`,
    };
  },

  validations: {
    formData: {
      name: {
        required,
      },
      email: {
        required,
      },
      cep: {
        required,
      },
      /* name: {
        required,
      }, */
      template: {
        required,
      },
    },
  },
};
</script>
