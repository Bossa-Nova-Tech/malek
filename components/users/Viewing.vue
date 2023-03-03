<template>
  <b-modal
    :id="'view-user-' + userList.id"
    :ref="'view-user-' + userList.id"
    size="lg"
    centered
    no-close-on-backdrop
    hide-footer
    hide-header
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Visualizar Usuário</h1>
        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          role="button"
          @click="$bvModal.hide('view-user-' + userList.id)"
        />
      </div>
      <b-form-group>
        <label>Status</label>
        <p v-if="formData.status === 'active'">Ativo</p>
        <p v-if="formData.status === 'inactive'">Inativo</p>
      </b-form-group>
      <b-form-group>
        <label>Nome</label>
        <b-form-input :value="formData.name" disabled class="bg-white" />
      </b-form-group>

      <b-form-group class="mb-4">
        <label v-if="userList.cpfCnpj.length > 14">CNPJ</label>
        <label v-else>CPF</label>
        <b-form-input :value="formData.cpfCnpj" disabled class="bg-white" />
      </b-form-group>

      <b-row>
        <b-col cols="12">
          <b-form-group v-if="formData.type == 'f'" class="mb-4">
            <label>RG</label>
            <b-form-input :value="formData.rg" disabled class="bg-white" />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="6" md="12">
          <b-form-group v-if="formData.type == 'pj'" class="mb-4">
            <label>Razão Social</label>
            <b-form-input
              :value="formData.corporateName"
              disabled
              class="bg-white"
            />
          </b-form-group>
        </b-col>
        <b-col lg="6" md="12">
          <b-form-group v-if="formData.type == 'pj'" class="mb-4">
            <label>Inscrição Estadual</label>
            <b-form-input
              :value="formData.stateRegistration"
              disabled
              class="bg-white"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <div class="grid">
        <b-form-group class="mb-4">
          <label>Telefone</label>
          <b-form-input :value="formData.phone" disabled class="bg-white" />
        </b-form-group>

        <b-form-group class="mb-4">
          <label>E-mail</label>
          <b-form-input :value="formData.email" disabled class="bg-white" />
        </b-form-group>
      </div>

      <b-form-group class="mb-4">
        <label>CEP</label>
        <b-form-input :value="formData.cep" disabled class="bg-white" />
      </b-form-group>

      <b-row>
        <b-col lg="6" md="12">
          <b-form-group class="mb-4">
            <label>Endereço</label>
            <b-form-input :value="formData.address" disabled class="bg-white" />
          </b-form-group>
        </b-col>

        <b-col lg="6" md="12">
          <b-form-group class="mb-4">
            <label>Bairro</label>
            <b-form-input
              :value="formData.district"
              disabled
              class="bg-white"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group class="mb-4">
            <label>Cidade</label>
            <b-form-input :value="formData.city" disabled class="bg-white" />
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group class="mb-4">
            <label>Estado</label>
            <b-form-input :value="formData.state" disabled class="bg-white" />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group class="mb-4">
            <label>Número</label>
            <b-form-input :value="formData.number" disabled class="bg-white" />
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group class="mb-4">
            <label>Complemento</label>
            <b-form-input
              :value="formData.complement"
              disabled
              class="bg-white"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ViewClient',
  props: {
    userList: {
      type: Object,
      default: null,
    },
    watching: {
      type: Number,
      default: null,
    },
  },
  data: () => {
    return {
      file: null,
      files: null,
      reader: null,
      vm: null,
      formSend: false,
      formData: {
        status: null,
        type: null,
        name: null,
        cpfCnpj: null,
        rg: null,
        corporateName: null,
        stateRegistration: null,
        phone: null,
        email: null,
        photo: null,
        address: null,
        cep: null,
        district: null,
        city: null,
        state: null,
        number: null,
        complement: null,
      },
    };
  },
  watch: {
    watching() {
      this.setDataFormWithClient();
    },
  },
  methods: {
    setDataFormWithClient() {
      this.formData.status = this.userList.status;
      this.formData.name = this.userList.name;
      this.formData.type = this.userList.type;
      this.formData.cpfCnpj = this.userList.cpfCnpj;
      this.formData.rg = this.userList.rg;
      this.formData.phone = this.userList.phone;
      this.formData.email = this.userList.email;
      this.formData.address = this.userList.address;
      this.formData.cep = this.userList.cep;
      this.formData.district = this.userList.district;
      this.formData.city = this.userList.city;
      this.formData.state = this.userList.state;
      this.formData.number = this.userList.number;
      this.formData.complement = this.userList.complement;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: var(--primary-80);
}

label {
  font-size: 0.75rem;
}

label,
input {
  color: var(--gray-40);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.875rem;
}

@media screen and (max-width: 991px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 0rem;
  }
}
</style>
