<template>
  <b-modal
    id="criar-usuario"
    ref="userModal"
    size="lg"
    scrollable
    hide-footer
    hide-header
    centered
    class="vh-100"
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Criar Usuário</h1>
        <img
          src="~/assets/img/icones/X-icon.svg"
          role="button"
          class="mb-5 mt-3"
          @click.prevent="$bvModal.hide('criar-usuario')"
        />
      </div>

      <b-form-group class="mb-4">
        <label for="pessoa"
          >Pessoa física ou jurídica? <span class="requerido">*</span></label
        >
        <b-form-radio-group
          v-model="formData.type"
          :options="types"
          name="pessoa"
          plain
          size="sm"
          class="mb-2"
        >
        </b-form-radio-group>
        <b-form-input
          v-if="formData.type === 'pj'"
          v-model="formData.cpfCnpj"
          v-mask="['##.###.###/####-##']"
          placeholder="00.000.000/000-00"
          :class="{ 'is-invalid': $v.formData.cpfCnpj.$error }"
        />
        <b-form-invalid-feedback v-if="formData.type === 'pj'">
          {{
            !$v.formData.cpfCnpj.minLength
              ? 'Insira um CNPJ válido'
              : 'Preencha o campo acima'
          }}
        </b-form-invalid-feedback>
        <b-form-input
          v-if="formData.type === 'f'"
          v-model="formData.cpfCnpj"
          v-mask="['###.###.###-##']"
          name="cpfCnpj"
          placeholder="000.000.000-00"
          :class="{ 'is-invalid': $v.formData.cpfCnpj.$error }"
        />
        <b-form-invalid-feedback v-if="formData.type === 'f'">
          {{
            !$v.formData.cpfCnpj.minLength
              ? 'Insira um CPF válido'
              : 'Preencha o campo acima'
          }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group class="mb-4">
        <label v-if="formData.type === 'f'" for="name"
          >Nome <span class="requerido">*</span></label
        >
        <label v-else for="name"
          >Nome Fantasia <span class="requerido">*</span></label
        >
        <b-form-input
          v-model="formData.name"
          name="name"
          type="text"
          placeholder="João"
          :class="{
            'is-invalid': $v.formData.name.$error,
          }"
        />
        <b-form-invalid-feedback>
          Preencha o campo acima
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group v-if="formData.type === 'f'" class="mb-4">
        <label for="last_name"
          >Sobrenome <span class="requerido">*</span></label
        >
        <b-form-input
          v-model="formData.last_name"
          name="last_name"
          placeholder="Silva"
          :class="{
            'is-invalid': $v.formData.name.$error,
          }"
        />
        <b-form-invalid-feedback>
          Preencha o campo acima
        </b-form-invalid-feedback>
      </b-form-group>

      <b-row>
        <b-col cols="12">
          <b-form-group v-if="formData.type === 'f'" class="mb-4">
            <label for="rg">RG <span class="requerido">*</span></label>
            <b-form-input
              v-model="formData.rg"
              name="rg"
              type="number"
              placeholder="00.000.000"
              :class="{ 'is-invalid': $v.formData.rg.$error }"
            />
            <b-form-invalid-feedback>
              {{
                !$v.formData.rg.minLength
                  ? 'Insira um RG válido'
                  : 'Preencha o campo acima'
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6" sm="12">
          <b-form-group v-if="formData.type === 'pj'" class="mb-4">
            <label for="social_reason"
              >Razão Social <span class="requerido">*</span></label
            >
            <b-form-input
              v-model="formData.social_reason"
              name="social_reason"
              type="text"
              placeholder="Empresa X"
              :class="{
                'is-invalid': $v.formData.social_reason.$error,
              }"
            />
            <b-form-invalid-feedback>
              Preencha o campo acima
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group v-if="formData.type === 'pj'" class="mb-4">
            <label for="state_registration"
              >Inscrição Estadual <span class="requerido">*</span></label
            >
            <b-form-input
              v-model="formData.state_registration"
              v-mask="['###.###.###']"
              name="state_registration"
              placeholder="000.000.000"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <div class="grid">
        <div class="w-100 grid-1">
          <b-form-group class="mb-4">
            <label for="phone">Telefone <span class="requerido">*</span></label>
            <b-form-input
              v-model="formData.phone"
              v-mask="['(##) ####-####', '(##) #####-####']"
              name="phone"
              placeholder="(00) 0 0000-0000"
              :class="{
                'is-invalid': $v.formData.phone.$error,
              }"
            />
            <b-form-invalid-feedback>
              {{
                !$v.formData.phone.minLength
                  ? 'Insira um telefone válido'
                  : 'Preencha o campo acima'
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </div>
      </div>

      <div>
        <div class="w-100">
          <b-form-group class="mb-4">
            <label for="email">E-mail <span class="requerido">*</span></label>
            <b-form-input
              v-model="formData.email"
              name="email"
              type="email"
              placeholder="email@gmail.com"
              :class="{
                'is-invalid': $v.formData.email.$error,
              }"
            />
            <b-form-invalid-feedback>
              {{
                !$v.formData.email.email
                  ? 'Insira um e-mail válido'
                  : 'Preencha o campo acima'
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </div>
      </div>

      <BorderButton class="my-4">
        <input
          id="file"
          type="file"
          accept=".png, .jpg"
          class="d-flex"
          @change="onFileChange"
        />
        <label v-if="formData.type === 'f'" for="file" class="text-center"
          >Enviar Foto</label
        >
        <label v-else for="file" class="text-center">Enviar Logotipo</label>
      </BorderButton>
      <div class="campo-foto d-flex align-self center justify-content-center">
        <div
          v-if="formData.photo"
          class="d-flex flex-column justify-content-center align-items-center"
        >
          <b-img
            src="~/assets/img/icones/delete-icon.svg"
            role="button"
            class="ml-5 pl-5 pb-2"
            @click="excluiFoto"
          />

          <img :src="formData.photo" alt="" width="100" />
        </div>
      </div>

      <b-form-group class="mb-4">
        <label for="role">Função</label>
        <b-form-select
          v-model="formData.role"
          :options="options"
          name="role"
          :class="{
            'is-invalid': $v.formData.role.$error,
          }"
        >
        </b-form-select>
        <b-form-invalid-feedback>
          Preencha o campo acima.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group class="mb-4">
        <label for="cep">CEP</label>
        <b-form-input
          v-model="formData.cep"
          name="cep"
          placeholder="00000000"
          :class="{
            'is-invalid': $v.formData.cep.$error,
          }"
          @keyup="searchCep()"
        />
        <b-form-invalid-feedback>
          {{
            !$v.formData.cep.minLength
              ? 'Insira um CEP válido'
              : 'Preencha o campo acima'
          }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-row>
        <b-col md="6" sm="12">
          <b-form-group class="mb-4">
            <label for="address">Endereço</label>
            <b-form-input
              v-model="formData.address"
              name="address"
              type="text"
              placeholder="Rua"
            />
            <b-form-invalid-feedback>
              Preencha o campo acima
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group class="mb-4">
            <label for="district">Bairro</label>
            <b-form-input
              v-model="formData.district"
              name="district"
              type="text"
              placeholder="Bairro"
            />
            <b-form-invalid-feedback>
              Preencha o campo acima
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6" sm="12">
          <b-form-group class="mb-4">
            <label for="city">Cidade</label>
            <b-form-input
              v-model="formData.city"
              name="city"
              type="text"
              placeholder="Cidade"
            />
            <b-form-invalid-feedback>
              Preencha o campo acima
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group class="mb-4">
            <label for="state">Estado</label>
            <b-form-input
              v-model="formData.state"
              name="state"
              type="text"
              placeholder="Estado"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6" sm="12">
          <b-form-group class="mb-4">
            <label for="number">Número </label>
            <b-form-input
              v-model.number="formData.number"
              name="number"
              type="number"
              placeholder="000"
              :class="{
                'is-invalid': $v.formData.number.$error,
              }"
            />
            <b-form-invalid-feedback>
              Preencha o campo acima
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group class="mb-4">
            <label for="complement">Complemento</label>
            <b-form-input
              v-model="formData.complement"
              name="complement"
              type="text"
              placeholder="Complemento"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group class="mb-4">
        <label for="password">Senha</label>
        <b-form-input
          v-model="formData.password"
          type="password"
          name="password"
          placeholder="Senha"
          :class="{
            'is-invalid': $v.formData.password.$error,
          }"
        />
        <b-form-invalid-feedback>
          {{
            !$v.formData.password.minLength
              ? 'Insira uma senha válida'
              : 'Preencha o campo acima'
          }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-4">
        <label for="password-confirmation">Confirmação de senha</label>
        <b-form-input
          v-model="formData.password_confirmation"
          type="password"
          name="password-confirmation"
          placeholder="Senha"
        />
      </b-form-group>

      <b-row class="mt-2">
        <b-col sm="12">
          <label for="textarea-default">Observações</label>
          <b-form-textarea
            v-model="formData.note"
            placeholder="Opcional"
          ></b-form-textarea>
        </b-col>
      </b-row>
      <button class="mt-4 mb-2" :disabled="formSend" @click="saveUser">
        <b-spinner v-if="formSend" small type="grow" />
        Salvar
      </button>
    </div>
  </b-modal>
</template>

<script>
import {
  required,
  email,
  minLength,
  requiredIf,
} from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';

export default {
  name: 'AddUser',
  directives: { mask },
  mixins: [validationMixin],

  props: {
    customersData: {
      type: Array,
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
        status: 'active',
        last_name: '',
        role: '',
        name: '',
        password_confirmation: '',
        cpfCnpj: '',
        type: 'f',
        company_id: null,
        rg: '',
        social_reason: '',
        state_registration: '',
        district: null,
        phone: '',
        email: '',
        photo: null,
        password: '',
        cep: '',
        address: '',
        city: '',
        state: '',
        number: '',
        complement: '',
        note: '',
      },
      options: [
        {
          value: 'null',
          text: 'Selecione a função',
        },
        {
          value: 'collaborator',
          text: 'Técnico',
        },
        {
          value: 'administrator',
          text: 'Administrador',
        },
        {
          value: 'manager',
          text: 'Gerente',
        },
      ],
      types: [
        {
          value: 'f',
          html: '<span style="color:#5E5E5E;font-size:12px;">Pessoa física</span>',
        },
        {
          value: 'pj',
          html: '<span style="color:#5E5E5E;font-size:12px;">Pessoa jurídica</span>',
        },
      ],
    };
  },

  validations: {
    formData: {
      name: {
        required,
      },
      last_name: {
        required: requiredIf(function () {
          return this.formData.type === 'f';
        }),
      },
      social_reason: {
        required: requiredIf(function () {
          return this.formData.type === 'pj';
        }),
      },
      cpfCnpj: {
        required: requiredIf(function () {
          return this.formData.type === 'pj';
        }),
        minLength: minLength(18),
      },
      cpfCnpj: {
        required: requiredIf(function () {
          return this.formData.type === 'f';
        }),
        minLength: minLength(14),
      },
      rg: {
        required: requiredIf(function () {
          return this.formData.type === 'f';
        }),
        minLength: minLength(6),
      },
      phone: {
        required,
        minLength: minLength(14),
      },
      email: {
        required,
        email,
      },
      role: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      cep: {
        required,
        minLength: minLength(8),
      },
      number: {
        required,
      },
      district: {
        required,
      },
    },
  },
  filters: {
    truncate(str) {
      str = str.split(' ');
      return str[0];
    },
  },

  methods: {
    async saveUser(_response) {
      this.$v.formData.$touch();

      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        this.$v.formData.$reset();
        this.formData.company_id = this.$auth.user.company_id;
        await this.$axios
          .post('users', this.$data.formData)
          .then((_res) => {
            this.toast('success', 'Sucesso', 'Usuário adicionado com sucesso!');
          })
          .catch((_err) =>
            this.toast('warning', 'Warning', 'Erro ao cadastrar o usuário!'),
          )
          .finally(() => {
            this.formSend = false;
            this.$refs.userModal.hide();
            this.formData.name = '';
            this.formData.email = '';
            this.formData.password = '';
            this.formData.password_confirmation = '';
            this.formData.last_name = '';
            this.formData.role = '';
            this.formData.cpfCnpj = '';
            this.formData.type = '';
            this.formData.rg = '';
            this.formData.social_reason = '';
            this.formData.state_registration = '';
            this.formData.district = '';
            this.formData.phone = '';
            this.formData.photo = null;
            this.formData.cep = '';
            this.formData.address = '';
            this.formData.city = '';
            this.formData.state = '';
            this.formData.number = '';
            this.formData.complement = '';
            this.formData.note = '';
            this.$nuxt.refresh();
          });
      }
    },
    excluiFoto() {
      this.formData.photo = null;
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
    searchCep() {
      // eslint-disable-next-line eqeqeq
      if (this.formData.cep.length == 8) {
        this.$axios
          .get(`https://viacep.com.br/ws/${this.formData.cep}/json/`)
          .then(
            (response) =>
              (this.formData.address = response.data.logradouro)(
                (this.formData.city = response.data.localidade),
                (this.formData.state = response.data.uf),
                (this.formData.cep = response.data.cep),
                (this.formData.district = response.data.bairro),
              ),
            /* district: response.data.bairro,
                city: response.data.localidade,
                state: response.data.uf,
                cep: response.data.cep,
              } */
          )
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.requerido {
  color: var(--red-50);
}

.grid-1 {
  margin-right: 15px;
}

@media screen and (max-width: 992px) {
  .grid-1 {
    margin: 0;
  }

  .grid-2 {
    margin: 0;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
