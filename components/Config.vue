<template>
  <div>
    <svg
      v-b-modal.modal-1
      role="button"
      width="29"
      height="30"
      viewBox="0 0 29 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="ml-3"
    >
      <g clip-path="url(#clip0_918_22005)">
        <path
          d="M4.83325 25.875V17.4167M4.83325 12.5833V4.125M14.4999 25.875V15M14.4999 10.1667V4.125M24.1666 25.875V19.8333M24.1666 15V4.125M1.20825 17.4167H8.45825M10.8749 10.1667H18.1249M20.5416 19.8333H27.7916"
          stroke="#fff"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_918_22005">
          <rect
            width="29"
            height="29"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
    <b-modal id="modal-1" hide-footer hide-header centered>
      <div class="mx-3 my-3">
        <div class="d-flex justify-content-between mb-3">
          <h1>Configurações</h1>
          <img
            src="~/assets/img/icones/X-icon.svg"
            role="button"
            @click.prevent="$bvModal.hide('modal-1')"
          />
        </div>
        <small>
          Faça as configurações de sua conta e também das ordens de serviçoes de
          sua empresa.
        </small>
      </div>
      <div
        class="mx-3 d-flex justify-content-between"
        @click="editAccount = !editAccount"
      >
        <h6 class="my-3 font-weight-bold">Conta</h6>
        <img
          v-if="editAccount"
          src="~/assets/img/icones/arrow_up.svg"
          alt=""
          class="mx-1"
        />
        <img
          v-else
          src="~/assets/img/icones/arrow_down.svg"
          alt=""
          class="mx-1"
        />
      </div>
      <div v-if="editAccount" class="mx-4">
        <label for="file">Logotipo</label>
        <div v-if="!photo_url">
          <BorderButton v-if="formData.photo === null" class="mb-4">
            <input
              id="file"
              type="file"
              accept=".png, .jpg"
              class="d-flex"
              @change="onFileChange"
            />
            <label v-if="formData.type == 'f'" for="file" class="text-center"
              >Enviar Foto</label
            >
            <label v-else for="file" class="text-center">Enviar Logotipo</label>
          </BorderButton>
          <div
            v-if="formData.photo"
            class="d-flex align-items-start justify-content-between"
          >
            <img :src="formData.photo" alt="" width="200" />
            <img
              src="~/assets/img/icones/delete-icon.svg"
              role="button"
              class="ml-2"
              @click="excluiFoto"
            />
          </div>
        </div>

        <div v-if="!$auth.user.address">
          <b-form-group>
            <label>Nome Fantasia:</label>
            <b-form-input v-model="name"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>CEP:</label>
            <b-form-input v-model="cep"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Endereço:</label>
            <b-form-input v-model="address"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Número:</label>
            <b-form-input v-model="number"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Bairro:</label>
            <b-form-input v-model="district"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Cidade:</label>
            <b-form-input v-model="city"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Estado:</label>
            <b-form-input v-model="state"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Email:</label>
            <b-form-input v-model="email"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Site:</label>
            <b-form-input v-model="site"></b-form-input>
          </b-form-group>
        </div>
        <div v-else>
          <b-form-group>
            <label>Nome Fantasia:</label>
            <b-form-input v-model="$auth.user.name"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>CEP:</label>
            <b-form-input v-model="$auth.user.cep"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Endereço:</label>
            <b-form-input v-model="$auth.user.address"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Número:</label>
            <b-form-input v-model="$auth.user.number"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Bairro:</label>
            <b-form-input v-model="$auth.user.district"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Cidade:</label>
            <b-form-input v-model="$auth.user.city"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Estado:</label>
            <b-form-input v-model="$auth.user.state"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Email:</label>
            <b-form-input v-model="$auth.user.email"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>Site:</label>
            <b-form-input v-model="$auth.user.site"></b-form-input>
          </b-form-group>
        </div>
        <b-button @click="attAccount">Salvar</b-button>
      </div>
      <div class="m-3 d-flex justify-content-between" @click="editOS = !editOS">
        <h6 class="my-3 font-weight-bold">Ordem de serviço</h6>
        <img
          v-if="editOS"
          src="~/assets/img/icones/arrow_up.svg"
          alt=""
          class="mx-1"
        />
        <img
          v-else
          src="~/assets/img/icones/arrow_down.svg"
          alt=""
          class="mx-1"
        />
      </div>
      <div v-if="editOS" class="mx-4">
        <b-row class="mb-3 align-items-center">
          <b-col cols="8">
            <label for="id" class="mb-0">Próximo número de OS</label>
          </b-col>
          <b-col cols="4">
            <b-form-input
              v-model="taskData.id"
              name="id"
              type="number"
              placeholder="1"
            />
            <!-- :class="{
              'is-invalid': $v.formData.name.$error,
            }" -->
            <b-form-invalid-feedback>
              Preencha o campo acima
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <b-row class="mb-3 align-items-center">
          <b-col cols="7">
            <label for="id" class="mb-0">Distância do cliente</label>
          </b-col>
          <b-col cols="5">
            <b-input-group append="km">
              <b-form-input
                v-model="taskData.distancy"
                name="id"
                type="number"
                placeholder="1"
              />
            </b-input-group>
            <!-- :class="{
              'is-invalid': $v.formData.name.$error,
            }" -->
            <b-form-invalid-feedback>
              Preencha o campo acima
            </b-form-invalid-feedback>
          </b-col>
          {{ formData }}
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      editAccount: false,
      editOS: false,
      files: null,
      reader: null,
      vm: null,
      formData: {
        name: this.$auth.user.name,
        last_name: this.$auth.user.last_name,
        photo: this.$auth.user.photo,
        photo_url: this.$auth.user.photo_url,
        social_reason: this.$auth.user.social_reason,
        email: this.$auth.user.email,
        phone: this.$auth.user.phone,
        city: this.$auth.user.city,
        number: this.$auth.user.number,
        state: this.$auth.user.state,
        address: this.$auth.user.address,
        phone: this.$auth.user.phone,
        district: this.$auth.user.district,
        state_registration: this.state_registration,
        note: this.$auth.user.note,
        cpf: this.$auth.user.cpf,
        cnpj: this.$auth.user.cnpj,
        role: this.$auth.user.role,
        cep: this.$auth.user.cep,
        complement: this.$auth.user.complement,
        rg: this.$auth.user.rg,
        company_id: this.$auth.user.company_id,
        status: this.$auth.user.status,
      },
      taskData: {
        id: null,
        distancy: null,
      },
    };
  },
  props: {
    address: {
      type: String,
      default: null,
    },
    photo_url: {
      type: String,
      default: null,
    },
    photo: {
      type: String,
      default: null,
    },
    cep: {
      type: Number,
      default: null,
    },
    number: {
      type: Number,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    district: {
      type: String,
      default: null,
    },
    phone: {
      type: Number,
      default: null,
    },
    state_registration: {
      type: Number,
      default: null,
    },
    social_reason: {
      type: String,
      default: null,
    },
    note: {
      type: String,
      default: null,
    },
    complement: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    cnpj: {
      type: Number,
      default: null,
    },
  },

  methods: {
    excluiFoto() {
      if (this.formData.photo) {
        this.formData = {
          photo: null,
          photo_url: null,
        };
      }
    },
    async attAccount() {
      if (this.$auth.user.address) {
        this.formData.name = this.$auth.user.name;
        this.formData.last_name = this.$auth.user.last_name;
        this.formData.cpf = this.$auth.user.cpf;
        this.formData.cnpj = this.$auth.user.cnpj;
        this.formData.email = this.$auth.user.email;
        this.formData.company_id = this.$auth.user.company_id;
        this.formData.role = this.$auth.user.role;
        this.formData.phone = this.$auth.user.phone;
        this.formData.photo = this.$auth.user.photo;
        this.formData.photo_url = this.$auth.user.photo_url;
        this.formData.city = this.$auth.user.city;
        this.formData.state = this.$auth.user.state;
        this.formData.district = this.$auth.user.district;
        this.formData.number = this.$auth.user.number;
        this.formData.note = this.$auth.user.note;
        this.formData.address = this.$auth.user.address;
        this.formData.cep = this.$auth.user.cep;
        this.formData.complement = this.$auth.user.complement;
        this.formData.rg = this.$auth.user.rg;
        this.formData.social_reason = this.$auth.user.social_reason;
        this.formData.state_registration = this.$auth.user.state_registration;
        this.formData.status = this.$auth.user.status;
      } else {
        this.formData.name = this.name;
        this.formData.last_name = this.last_name;
        this.formData.cpf = this.cpf;
        this.formData.cnpj = this.cnpj;
        this.formData.email = this.email;
        this.formData.company_id = this.company_id;
        this.formData.role = this.role;
        this.formData.status = 'active';
        this.formData.phone = this.phone;
        this.formData.photo = this.photo;
        this.formData.city = this.city;
        this.formData.state = this.state;
        this.formData.district = this.district;
        this.formData.number = this.number;
        this.formData.note = this.note;
        this.formData.cep = this.cep;
        this.formData.address = this.address;
        this.formData.complement = this.complement;
        this.formData.rg = this.rg;
        this.formData.social_reason = this.social_reason;
        this.formData.state_registration = this.state_registration;
        debugger;
      }
      if (!this.formData.cpf) {
        this.formData.cpf = '-';
        this.formData.rg = '-';
      }
      console.log(this.formData);

      await this.$axios.put('users/' + this.$auth.user.id, this.$data.formData);
    },
    onFileChange(e) {
      this.files = e.target.files || e.dataTransfer.files;
      if (!this.files.length) return;
      this.createImage(this.files[0]);
    },
    createImage(file) {
      this.reader = new FileReader();
      this.vm = this;

      this.reader.onload = (e) => {
        this.vm.formData.photo = e.target.result;
      };
      this.reader.readAsDataURL(file);
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 991px) {
  svg path {
    stroke: #ff5a00;
  }
}
</style>
