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
      <div
        class="w-25 h-25 d-flex justify-content-center align-items-center rounded m-auto"
      >
        <b-img
          v-if="
            companiesData.logo !== null && $auth.user.role === 'administrator'
          "
          :src="companiesData.logo_url"
          class="w-100"
        ></b-img>
        <b-img
          v-if="user_photo !== null && $auth.user.role !== 'administrator'"
          :src="user_photo_url"
          class="w-100"
        ></b-img>
      </div>
      <small>
        Faça as configurações de sua conta e também das ordens de serviçoes de
        sua empresa.
      </small>
      <!--       <b-img :src="companiesData.logo_url" />
 -->
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
        <div v-if="$auth.user.role !== 'administrator'">
          <b-button v-if="!mudarLogo" variant="primary" @click="changeLogo()">
            Mudar foto de perfil
          </b-button>
          <div v-if="mudarLogo">
            <b-form-file
              id="file"
              v-model="user_photo"
              accept="image/jpeg, image/png, image/jpg"
              plain
              @change="onFileChange"
            ></b-form-file>

            <div class="campo-foto d-flex justify-content-center flex-column">
              <label v-if="user_photo === null" for="file">
                <div
                  class="d-flex flex-column justify-content-center align-items-center"
                >
                  <b-img
                    rel="preload"
                    alt="upload da foto"
                    src="~/assets/img/icones/upload.svg"
                  />
                  <p>Clique para enviar sua foto</p>
                  <span>PNG, JPG (tamanho máximo X)</span>
                </div>
              </label>
              <div
                v-else
                class="d-flex flex-column justify-content-center align-items-center"
              >
                <b-img
                  rel="preload"
                  src="~/assets/img/icones/delete-icon.svg"
                  role="button"
                  alt="icone de deletar"
                  class="ml-5 pl-5 pb-2"
                  aria-describedby="helpBlock"
                  @click="excluiFoto"
                />
                <img
                  v-if="user_photo_url !== null"
                  :src="user_photo_url"
                  alt=""
                  width="100"
                  class="pb-5"
                />
                <img v-else :src="user_photo" alt="" width="100" class="pb-5" />
              </div>
              <small id="helpBlock" class="form-text text-muted mt-4 mb-4">
                A imagem carregada será utilizada como sua foto de perfil ao
                logar em sua conta.
              </small>
            </div>
          </div>

          <b-form-group v-if="user_cpfCnpj.length > 13" class="my-2">
            <label for="nome_fantasia">Nome Fantasia:</label>
            <b-form-input v-model="user_name" name="nome"> </b-form-input>
          </b-form-group>

          <b-form-group v-if="user_cpfCnpj.length < 14" class="my-2">
            <label for="sobrenome">Sobrenome:</label>
            <b-form-input v-model="user_last_name" name="sobrenome">
            </b-form-input>
          </b-form-group>

          <b-form-group class="my-2">
            <label v-if="user_cpfCnpj.length < 14" for="cpf">CPF</label>
            <label v-else for="cpf">CNPJ</label>
            <b-form-input v-model="user_cpfCnpj" name="cpf" />
          </b-form-group>

          <b-form-group class="my-2">
            <label for="cep">CEP</label>
            <b-form-input v-model="user_cep" name="cep" />
          </b-form-group>

          <b-form-group class="my-2">
            <label for="endereco">Endereço</label>
            <b-form-input v-model="user_address" name="endereco" />
          </b-form-group>

          <b-form-group class="my-2">
            <label for="numero">Número</label>
            <b-form-input v-model="user_number" name="numero" />
          </b-form-group>

          <b-form-group class="my-2">
            <label for="cidade">Cidade</label>
            <b-form-input v-model="user_city" name="cidade" />
          </b-form-group>

          <b-form-group class="my-2">
            <label for="estado">Estado</label>
            <b-form-input v-model="user_state" name="estado" />
          </b-form-group>
        </div>

        <div v-else>
          <h3>Configurações da empresa</h3>
          <b-button v-if="!mudarLogo" variant="primary" @click="changeLogo()">
            Mudar logo
          </b-button>

          <div v-if="mudarLogo">
            <b-form-file
              id="file"
              v-model="companiesData.logo"
              accept="image/jpeg, image/png, image/jpg"
              plain
              @change="onFileChange"
            ></b-form-file>

            <div class="campo-foto d-flex justify-content-center flex-column">
              <label v-if="companiesData.logo === null" for="file">
                <div
                  class="d-flex flex-column justify-content-center align-items-center"
                >
                  <b-img
                    rel="preload"
                    alt="upload da foto"
                    src="~/assets/img/icones/upload.svg"
                  />
                  <p>Clique para enviar sua foto</p>
                  <span>PNG, JPG (tamanho máximo X)</span>
                </div>
              </label>
              <div
                v-else
                class="d-flex flex-column justify-content-center align-items-center"
              >
                <b-img
                  rel="preload"
                  src="~/assets/img/icones/delete-icon.svg"
                  role="button"
                  alt="icone de deletar"
                  class="ml-5 pl-5 pb-2"
                  aria-describedby="helpBlock"
                  @click="excluiFoto"
                />
                <img
                  v-if="companiesData.logo_url !== null"
                  :src="companiesData.logo_url"
                  alt=""
                  width="100"
                  class="pb-5"
                />
                <img
                  v-else
                  :src="companiesData.logo"
                  alt=""
                  width="100"
                  class="pb-5"
                />
              </div>
              <small id="helpBlock" class="form-text text-muted mt-4 mb-4">
                A imagem carregada será utilizada como sua foto de perfil ao
                logar em sua conta.
              </small>
            </div>
          </div>
          <b-form-group class="my-2">
            <label for="nome_fantasia">Nome Fantasia</label>
            <b-form-input
              v-model="companiesData.fantasy_name"
              name="nome_fantasia"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group class="my-2">
            <label for="site">Site</label>
            <b-form-input v-model="companiesData.site" name="site">
            </b-form-input>
          </b-form-group>

          <b-form-group class="my-2">
            <label for="email">Email</label>
            <b-form-input v-model="companiesData.email" name="email">
            </b-form-input>
          </b-form-group>

          <b-form-group v-if="companiesData.cpfCnpj.length > 14" class="my-2">
            <label for="cpfCnpj">CNPJ</label>
            <b-form-input v-model="companiesData.cpfCnpj" name="cpfCnpj">
            </b-form-input>
          </b-form-group>

          <b-form-group v-else class="my-2">
            <label for="cpfCnpj">CPF</label>
            <b-form-input v-model="companiesData.cpfCnpj" name="cpfCnpj">
            </b-form-input>
          </b-form-group>

          <b-form-group class="my-2">
            <label for="cep">CEP</label>
            <b-form-input v-model="companiesData.cep" name="cep">
            </b-form-input>
          </b-form-group>

          <b-form-group class="my-2">
            <label for="cidade">Cidade</label>
            <b-form-input v-model="companiesData.city" name="cidade">
            </b-form-input>
          </b-form-group>

          <b-form-group class="my-2">
            <label for="estado">Estado</label>
            <b-form-input v-model="companiesData.state" name="estado">
            </b-form-input>
          </b-form-group>

          <b-form-group class="my-2">
            <label for="endereco">Endereço</label>
            <b-form-input v-model="companiesData.address" name="endereco">
            </b-form-input>
          </b-form-group>

          <b-form-group class="my-2">
            <label for="numero">Número</label>
            <b-form-input v-model="companiesData.number" name="numero">
            </b-form-input>
          </b-form-group>

          <b-form-group class="my-2">
            <label for="bairro">Bairro</label>
            <b-form-input v-model="companiesData.district" name="bairro">
            </b-form-input>
          </b-form-group>

          <b-form-group class="my-2">
            <label for="telefone">Telefone</label>
            <b-form-input v-model="companiesData.phone" name="telefone">
            </b-form-input>
          </b-form-group>
          <b-button
            variant="secundary"
            class="my-3"
            @click="$bvModal.show('logout-modal')"
            >Sair da conta</b-button
          >
          <b-modal
            id="logout-modal"
            ref="logout-modal"
            hide-header
            hide-footer
            centered
          >
            <template>
              <h3 class="w-100 mx-auto">
                Tem certeza que gostaria de sair da conta?
              </h3>
              <b-row>
                <b-col>
                  <b-button variant="primary" @click="logoutConfirmation">
                    Sim
                  </b-button>
                </b-col>
                <b-col>
                  <b-button
                    variant="secundary"
                    @click="$bvModal.hide('logout-modal')"
                  >
                    Não
                  </b-button>
                </b-col>
              </b-row>
            </template>
          </b-modal>
        </div>
        <b-button variant="primary" @click="attAccount">Salvar</b-button>
      </div>
      <div
        v-if="$auth.user.role === 'administrator'"
        class="m-3 d-flex justify-content-between"
        @click="editOS = !editOS"
      >
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
  props: {
    companiesData: {
      type: Array | Object,
      default: '',
    },
  },
  data() {
    return {
      mudarLogo: false,
      file: null,
      files: null,
      reader: null,
      vm: null,
      editAccount: false,
      editOS: false,
      user_name: this.$auth.user.name,
      user_last_name: this.$auth.user.last_name,
      user_email: this.$auth.user.email,
      user_cpfCnpj: this.$auth.user.cpfCnpj,
      user_role: this.$auth.user.role,
      user_photo: this.$auth.user.photo,
      user_photo_url: this.$auth.user.photo_url,
      user_cep: this.$auth.user.cep,
      user_address: this.$auth.user.address,
      user_city: this.$auth.user.city,
      user_state: this.$auth.user.state,
      user_number: this.$auth.user.number,
      user_complement: this.$auth.user.complement,
      user_rg: this.$auth.user.rg,
      user_district: this.$auth.user.district,
      user_social_reason: this.$auth.user_social_reason,
      user_state_registration: this.$auth.user_state_registration,
      userFormData: {
        name: '',
        company_id: null,
        last_name: '',
        email: '',
        cpfCnpj: '',
        photo: null,
        photo_url: null,
        cep: '',
        address: '',
        city: '',
        state: '',
        number: '',
        complement: '',
        rg: '',
        district: '',
        social_reason: '',
        user_state_registration: '',
      },
      companieFormData: {
        email: '',
        site: '',
        fantasy_name: '',
        cpfCnpj: '',
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

  methods: {
    logoutConfirmation() {
      this.$auth.logout();
      this.$router.push('/');
    },
    changeLogo() {
      if (this.user_role !== 'administrator') {
        this.user_photo = null;
        this.user_photo_url = null;
      } else {
        this.companiesData.logo = null;
        this.companiesData.logo_url = null;
      }
      this.mudarLogo = !this.mudarLogo;
    },
    excluiFoto() {
      if (this.companiesData.logo_url !== null) {
        this.companiesData.logo_url = null;
      } else this.companiesData.logo = null;
    },

    onFileChange(e) {
      this.files = e.target.files || e.dataTransfer.files;
      if (!this.files.length) return;
      this.createImage(this.files[0]);
    },
    createImage(file) {
      this.reader = new FileReader();
      this.vm = this;
      if (this.$auth.user.role === 'administrator') {
        this.reader.onload = (e) => {
          this.vm.companiesData.logo = e.target.result;
        };
        this.reader.readAsDataURL(file);
      } else {
        this.reader.onload = (e) => {
          this.vm.user_photo = e.target.result;
        };
        this.reader.readAsDataURL(file);
      }
    },
    async attAccount() {
      if (this.$auth.user.role === 'administrator') {
        this.companieFormData.fantasy_name = this.companiesData.fantasy_name;
        this.companieFormData.email = this.companiesData.email;
        this.companieFormData.logo = this.companiesData.logo;
        this.companieFormData.site = this.companiesData.site;
        this.companieFormData.cpfCnpj = this.companiesData.cpfCnpj;
        this.companieFormData.cep = this.companiesData.cep;
        this.companieFormData.city = this.companiesData.city;
        this.companieFormData.state = this.companiesData.state;
        this.companieFormData.district = this.companiesData.district;
        this.companieFormData.number = this.companiesData.number;
        this.companieFormData.complement = this.companiesData.complement;
        this.companieFormData.address = this.companiesData.address;
        this.companieFormData.phone = this.companiesData.phone;
      } else {
        this.userFormData.name = this.user_name;
        if (this.user_last_name === null) {
          this.userFormData.last_name = '-';
        } else {
          this.userFormData.last_name = this.user_last_name;
        }
        this.userFormData.email = this.user_email;
        this.userFormData.cpfCnpj = this.user_cpfCnpj;
        this.userFormData.role = this.user_role;
        this.userFormData.photo = this.user_photo;
        this.userFormData.photo_url = this.user_photo_url;
        this.userFormData.cep = this.user_cep;
        this.userFormData.address = this.user_address;
        this.userFormData.city = this.user_city;
        this.userFormData.state = this.user_state;
        this.userFormData.company_id = this.$auth.user.company_id;
        this.userFormData.number = this.user_number;
        this.userFormData.complement = this.user_complement;
        this.userFormData.rg = this.user_rg;
        this.userFormData.district = this.user_district;
        this.userFormData.social_reason = this.user_social_reason;
        this.userFormData.state_registration = this.user_state_registration;
      }

      this.formSend = true;
      if (this.$auth.user.role !== 'administrator') {
        await this.$axios
          .put('users/' + this.$auth.user.id, this.userFormData)
          .then((_res) => {
            this.toast('success', 'Sucesso', 'Usuário editado com sucesso!');
          })
          .catch((_err) =>
            this.toast('warning', 'Warning', 'Erro ao editar usuário!'),
          )
          .finally(() => {
            this.formSend = false;
            this.$bvModal.hide('modal-1');
            this.$nuxt.refresh();
          });
      } else {
        await this.$axios
          .put('companies/' + this.companiesData.id, this.companieFormData)
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
      }
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
