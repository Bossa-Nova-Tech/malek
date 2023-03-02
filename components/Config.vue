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
      <div v-if="editAccount" class="mx-3 my-3">
        <b-img
          v-if="companiesData.data.logo"
          :src="companiesData.data.logo_url"
        />
        <!-- <h3>Configurações do usuário</h3>
        <b-form-group class="my-2">
          <label for="nome">Nome</label>
          <b-form-input v-model="user_name"> </b-form-input>
          {{ user_name }}
          {{ userFormData.name }}
        </b-form-group>
        <b-form-group class="my-2">
          <label for="sobrenome">Sobrenome</label>
          <b-form-input name="sobrenome" v-model="user_last_name">
          </b-form-input>
        </b-form-group>
        <b-form-group class="my-2">
          <label for="email">Email</label>
          <b-form-input name="email" v-model="user_email"> </b-form-input>
        </b-form-group> -->
        <div v-if="this.$auth.user.role === 'administrator'">
          <h3>Configurações da empresa</h3>
          <b-form-group class="my-2">
            <label for="nome_fantasia">Nome Fantasia</label>
            <b-form-input
              name="nome_fantasia"
              v-model="companiesData.data.fantasy_name"
            >
            </b-form-input>
          </b-form-group>
          <!-- <b-form-group class="my-2">
            <label for="site">Site</label>
            <b-form-input name="site" v-model="companiesData.data.site">
            </b-form-input>
          </b-form-group> -->
          <b-form-group class="my-2">
            <label for="site">Email</label>
            <b-form-input name="site" v-model="companiesData.data.email">
            </b-form-input>
          </b-form-group>
          <b-form-group
            v-if="companiesData.data.cpfCnpj.length > 14"
            class="my-2"
          >
            <label for="cpfCnpj">CNPJ</label>
            <b-form-input name="cpfCnpj" v-model="companiesData.data.cpfCnpj">
            </b-form-input>
          </b-form-group>
          <b-form-group v-else class="my-2">
            <label for="cpfCnpj">CPF</label>
            <b-form-input name="cpfCnpj" v-model="companiesData.data.cpfCnpj">
            </b-form-input>
          </b-form-group>
          <b-form-group class="my-2">
            <label for="cep">CEP</label>
            <b-form-input name="cep" v-model="companiesData.data.cep">
            </b-form-input>
          </b-form-group>
          <b-form-group class="my-2">
            <label for="cidade">Cidade</label>
            <b-form-input name="cidade" v-model="companiesData.data.city">
            </b-form-input>
          </b-form-group>
          <b-form-group class="my-2">
            <label for="estado">Estado</label>
            <b-form-input name="estado" v-model="companiesData.data.state">
            </b-form-input>
          </b-form-group>
          <b-form-group class="my-2">
            <label for="endereco">Endereço</label>
            <b-form-input name="endereco" v-model="companiesData.data.address">
            </b-form-input>
          </b-form-group>
          <b-form-group class="my-2">
            <label for="numero">Número</label>
            <b-form-input name="numero" v-model="companiesData.data.number">
            </b-form-input>
          </b-form-group>
          <b-form-group class="my-2">
            <label for="bairro">Bairro</label>
            <b-form-input name="bairro" v-model="companiesData.data.district">
            </b-form-input>
          </b-form-group>
          <b-form-group class="my-2">
            <label for="telefone">Telefone</label>
            <b-form-input name="telefone" v-model="companiesData.data.phone">
            </b-form-input>
          </b-form-group>
        </div>
        <b-button variant="primary" @click="attAccount">Salvar</b-button>
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
      user_name: this.$auth.user.name,
      user_last_name: this.$auth.user.last_name,
      user_email: this.$auth.user.email,
      userFormData: {
        name: '',
        last_name: '',
        email: '',
      },
      companieFormData: {
        email: '',
        site: '',
        fantasy_name: '',
        cpfCnpjCnpj: '',
        logo: null,
        phone: '',
        ddd: '',
        cep: '',
        address: '',
        district: '',
        state: '',
        complement: '',
      },
      taskData: {
        id: '',
        distancy: '',
      },
    };
  },
  props: {
    companiesData: {
      type: Array | Object,
      default: '',
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
      /* this.userFormData.name = this.user_name;
      this.userFormData.last_name = this.user_last_name;
      this.userFormData.email = this.user_email; */
      /*       this.companieFormData.site = this.companiesData.data.site;
       */
      this.companieFormData.fantasy_name = this.companiesData.data.fantasy_name;
      this.companieFormData.email = this.companiesData.data.email;
      /*       this.companieFormData.logo_url = this.companiesData.data.logo_url;
       */ this.companieFormData.logo = this.companiesData.data.logo;
      this.companieFormData.cpfCnpj = this.companiesData.data.cpfCnpj;
      this.companieFormData.cep = this.companiesData.data.cep;
      this.companieFormData.city = this.companiesData.data.city;
      this.companieFormData.state = this.companiesData.data.state;
      this.companieFormData.district = this.companiesData.data.district;
      this.companieFormData.number = this.companiesData.data.number;
      this.companieFormData.complement = this.companiesData.data.complement;
      this.companieFormData.address = this.companiesData.data.address;
      this.companieFormData.phone = this.companiesData.data.phone;
      /* await this.$axios.put(
        'users/' + this.$auth.user.id,
        this.userFormData,
      ); */

      this.formSend = true;
      await this.$axios
        .put('companies/'+ this.companiesData.data.id, this.companieFormData)
        .then((_res) => {
          this.toast('success', 'Sucesso', 'Empresa editada com sucesso!');
        })
        .catch((_err) =>
          this.toast('warning', 'Warning', 'Erro ao editar empresa!'),
        )
        .finally(() => {
          this.formSend = false;
          this.$bvModal.hide('modal-1');
          this.$nuxt.refresh();
        });
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
h3 {
  font-size: 1.25rem;
  padding: 15px 10px 15px 10px;
}
@media screen and (min-width: 991px) {
  svg path {
    stroke: #ff5a00;
  }
}
</style>
