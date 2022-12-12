<template>
  <b-container>
    <main class="row justify-content-center align-items-center min-vh-100">
      <b-form class="col col-lg-6">
        <h1 class="mt-5 pb-3">Cadastrar empresa</h1>
        <h2 class="pb-5">Minhas informações</h2>

        <b-row>
          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="name">Nome <span class="requerido">*</span></label>
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
          </b-col>

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="last_name"
                >Sobrenome <span class="requerido">*</span></label
              >
              <b-form-input
                v-model="formData.last_name"
                name="last_name"
                type="text"
                placeholder="Souza"
                :class="{
                  'is-invalid': $v.formData.last_name.$error,
                }"
              />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
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
            v-if="formData.type == 'pj'"
            v-model="formData.cnpj"
            v-mask="['##.###.###/####-##']"
            name="cnpj"
            placeholder="00.000.000/000-00"
            :class="{ 'is-invalid': $v.formData.cnpj.$error }"
          />
          <b-form-invalid-feedback v-if="formData.type == 'pj'">
            {{
              !$v.formData.cnpj.minLength
                ? 'Insira um CNPJ válido'
                : 'Preencha o campo acima'
            }}
          </b-form-invalid-feedback>
          <b-form-input
            v-if="formData.type == 'f'"
            v-model="formData.cpf"
            v-mask="['###.###.###-##']"
            name="cpf"
            placeholder="000.000.000-00"
            :class="{ 'is-invalid': $v.formData.cpf.$error }"
          />
          <b-form-invalid-feedback v-if="formData.type == 'f'">
            {{
              !$v.formData.cpf.minLength
                ? 'Insira um CPF válido'
                : 'Preencha o campo acima'
            }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-row>
          <b-col cols="12">
            <b-form-group v-if="formData.type == 'f'" class="mb-4">
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
          <b-col cols="6">
            <b-form-group v-if="formData.type == 'pj'" class="mb-4">
              <label for="corporate_name"
                >Razão Social <span class="requerido">*</span></label
              >
              <b-form-input
                v-model="formData.corporate_name"
                name="corporate_name"
                type="text"
                placeholder="Empresa X"
                :class="{
                  'is-invalid': $v.formData.corporate_name.$error,
                }"
              />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group v-if="formData.type == 'pj'" class="mb-4">
              <label for="state_registration"
                >Inscrição Estadual <span class="requerido">*</span></label
              >
              <b-form-input
                v-model="formData.state_registration"
                v-mask="['###.###.###']"
                name="state_registration"
                placeholder="000.000.000"
                :class="{ 'is-invalid': $v.formData.state_registration.$error }"
              />
              <b-form-invalid-feedback>
                {{
                  !$v.formData.state_registration.minLength
                    ? 'Insira uma IE válida'
                    : 'Preencha o campo acima'
                }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group v-if="formData.type == 'pj'" class="mb-4">
          <label for="fantasy_name"
            >Nome Fantasia <span class="requerido">*</span></label
          >
          <b-form-input
            v-model="formData.fantasy_name"
            name="fantasy_name"
            placeholder="Nome da Empresa"
            :class="{ 'is-invalid': $v.formData.fantasy_name.$error }"
          />
          <b-form-invalid-feedback>
            Preencha o campo acima
          </b-form-invalid-feedback>
        </b-form-group>

        <b-row>
          <b-col cols="12">
            <b-form-group class="mb-4">
              <label for="occupation"
                >Qual seu cargo atual na empresa?
                <span class="requerido">*</span></label
              >
              <b-form-select
                v-model="formData.occupation"
                name="occupation"
                :options="occupations"
                :class="{ 'is-invalid': $v.formData.occupation.$error }"
              ></b-form-select>
              <b-form-invalid-feedback>
                Selecione o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

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

        <b-form-group class="mb-4">
          <label for="cep">CEP <span class="requerido">*</span></label>
          <b-form-input
            v-model="formData.cep"
            v-mask="['########']"
            name="cep"
            placeholder="00000-000"
            :class="{
              'is-invalid': $v.formData.cep.$error,
            }"
            @keyup.prevent="searchCep()"
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
          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="address"
                >Endereço <span class="requerido">*</span></label
              >
              <b-form-input
                v-model="formData.address"
                name="address"
                type="text"
                placeholder="Rua"
                :class="{
                  'is-invalid': $v.formData.address.$error,
                }"
              />

              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="district"
                >Bairro <span class="requerido">*</span></label
              >
              <b-form-input
                v-model="formData.district"
                name="district"
                type="text"
                placeholder="-"
                :class="{
                  'is-invalid': $v.formData.district.$error,
                }"
              />

              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="city">Cidade <span class="requerido">*</span></label>
              <b-form-input
                v-model="formData.city"
                name="city"
                type="text"
                placeholder="Cidade"
                :class="{
                  'is-invalid': $v.formData.city.$error,
                }"
              />

              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="state">Estado <span class="requerido">*</span></label>
              <b-form-input
                v-model="formData.state"
                name="state"
                type="text"
                placeholder="Estado"
                :class="{
                  'is-invalid': $v.formData.state.$error,
                }"
              />

              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="number"
                >Número <span class="requerido">*</span></label
              >
              <b-form-input
                v-model="formData.number"
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

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="complement">Complemento</label>
              <b-form-input
                v-model="formData.complement"
                name="complement"
                type="text"
                placeholder="Apartamento X, Bloco Y"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-file
          id="file"
          v-model="formData.photo"
          accept="image/jpeg, image/png, image/jpg"
          plain
          :class="{ 'is-invalid': $v.formData.photo.$error }"
          @change="onFileChange"
        ></b-form-file>
        <b-form-feedback class="text-center h5">
          Envio necessário. Clique abaixo para fazer o upload da sua photo.
        </b-form-feedback>
        <div class="campo-foto">
          <label v-if="!formData.photo" for="file">
            <div
              class="
                d-flex
                flex-column
                justify-content-center
                align-items-center
              "
            >
              <b-img src="~/assets/img/icones/upload.svg" />
              <p>Clique para enviar sua photo</p>
              <span>PNG, JPG (tamanho máximo X)</span>
            </div>
          </label>
          <div
            v-else
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <b-img
              src="~/assets/img/icones/delete-icon.svg"
              role="button"
              class="ml-5 pl-5 pb-2"
              aria-describedby="helpBlock"
              @click="excluiFoto"
            />
            <img :src="formData.photo" alt="" width="100" class="pb-5" />
          </div>
          <small id="helpBlock" class="form-text text-muted mt-n4 mb-4">
            A imagem carregada será utilizada como sua foto de perfil ao logar
            em sua conta.
          </small>
        </div>

        <b-row>
          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="password"
                >Senha <span class="requerido">*</span></label
              >
              <b-form-input
                v-model="$v.formData.password.$model"
                name="password"
                type="password"
                placeholder="********"
                aria-describedby="helpPassword"
                :class="{
                  'is-invalid': $v.formData.password.$error,
                }"
              />
              <b-form-invalid-feedback>
                {{
                  !$v.formData.password.minLength
                    ? 'No mínimo 8 caracteres'
                    : 'Insira uma senha'
                }}
              </b-form-invalid-feedback>
            </b-form-group>
            <small id="helpPassword" class="form-text text-muted mt-n4 mb-4">
              Miníno de 8 caracteres.
            </small>
          </b-col>

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="confirm_password"
                >Confirmar Senha <span class="requerido">*</span></label
              >
              <b-form-input
                v-model="$v.formData.confirm_password.$model"
                name="confirm_password"
                type="password"
                placeholder="********"
                :class="{
                  'is-invalid': $v.formData.confirm_password.$error,
                }"
              />
              <b-form-invalid-feedback>
                {{
                  !$v.formData.confirm_password.sameAsPassword
                    ? 'Senhas diferentes'
                    : 'Insira uma senha'
                }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group class="mb-4">
          <label for="term"
            >Aceite de termos <span class="requerido">*</span></label
          >
          <b-row class="mt-n1">
            <b-col cols="12">
              <b-button variant="outline-primary" block>
                Termos de uso e Política de Privacidade
              </b-button>
            </b-col>
          </b-row>
          <b-form-checkbox
            v-model="formData.term"
            name="term"
            :value="true"
            :unchecked-value="false"
            class="mt-2"
            :class="{
              'is-invalid': $v.formData.term.$error,
            }"
          >
            Li e Concordo
          </b-form-checkbox>

          <b-form-invalid-feedback> Campo obrigatório </b-form-invalid-feedback>
        </b-form-group>
      </b-form>
    </main>

    <div class="row justify-content-center">
      <button class="col col-lg-4 mb-4" :disabled="formSend" @click="register">
        <b-spinner v-if="formSend" small type="grow" />
        Finalizar
      </button>
    </div>
    <!-- <b-button v-b-modal="'modal-center'">Show Modal</b-button> -->
    <div>
      <b-modal
        id="modal-center"
        ref="modal-center"
        centered
        hide-header
        hide-footer
      >
        <div class="d-flex flex-column align-items-center">
          <img src="~/assets/img/icones/email-icon.svg" alt="" class="py-4" />
          <h3 class="text-center">Cadastro realizado com sucesso!</h3>
          <NuxtLink to="/">Clique aqui para realizar o login</NuxtLink>
        </div>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import {
  required,
  email,
  minLength,
  sameAs,
  requiredIf,
} from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';

export default {
  name: 'RegisterCompany',

  directives: { mask },
  mixins: [validationMixin],

  data: () => {
    return {
      file: null,
      files: null,
      reader: null,
      vm: null,
      formSend: false,
      formData: {
        type: 'f',
        name: null,
        last_name: null,
        cnpj: null,
        cpf: null,
        rg: null,
        occupation: null,
        corporate_name: null,
        state_registration: null,
        fantasy_name: null,
        phone: null,
        email: null,
        password: null,
        confirm_password: null,
        cep: null,
        district: null,
        city: null,
        state: null,
        number: null,
        complement: null,
        address: null,
        photo: [],
        term: null,
      },
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
      occupations: [
        {
          text: 'Selecione o seu cargo',
          value: null,
        },
        {
          text: 'Proprietário',
          value: 'administrator',
        },
        {
          text: 'Gerente',
          value: 'manager',
        },
        {
          text: 'Técnico',
          value: 'collaborator',
        },
      ],
    };
  },

  validations: {
    formData: {
      name: { required },
      last_name: { required },
      corporate_name: {
        required: requiredIf(function () {
          return this.formData.type === 'pj';
        }),
      },
      cnpj: {
        required: requiredIf(function () {
          return this.formData.type === 'pj';
        }),
        minLength: minLength(18),
      },
      state_registration: {
        required: requiredIf(function () {
          return this.formData.type === 'pj';
        }),
        minLength: minLength(11),
      },
      cpf: {
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
      occupation: { required },
      phone: { required, minLength: minLength(14) },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      confirm_password: { required, sameAsPassword: sameAs('password') },
      cep: { required },
      district: { required },
      city: { required },
      state: { required },
      number: { required },
      fantasy_name: {
        required: requiredIf(function () {
          return this.formData.type === 'pj';
        }),
      },
      address: { required },
      photo: { required },
      term: {
        sameAs: sameAs(() => true),
      },
    },
  },
  head() {
    return {
      title: `Cadastro |  ${process.env.title}`,
    };
  },

  mounted() {
    console.log('teste no cadastro::', this.$nameTeste);
    console.log('teste no função::', this.$showName('Pedro Santos'));
  },

  methods: {
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
    async register(_response) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // SIMULATION OF A DATA FETCHING REQUEST

        this.formSend = true;
        console.log(this.formData);

        try {
          this.$v.$reset();
          if (
            this.formData.fantasy_name === null &&
            this.formData.type === 'f'
          ) {
            this.formData.fantasy_name === '-';
          }
          await this.$axios
            .post('companies', this.$data.formData)
            .then((_res) => {
              this.$refs['modal-center'].show();
              this.formSend = false;
            })
            .catch((_err) => {});
        } catch (error) {
          console.log(error);
        }
      }
    },
    searchCep() {
      // eslint-disable-next-line eqeqeq
      if (this.formData.cep.length == 8) {
        this.$axios
          .get(`https://viacep.com.br/ws/${this.formData.cep}/json/`)
          .then((response) =>
            (this.formData.address = response.data.logradouro)(
              (this.formData.city = response.data.localidade),
              (this.formData.state = response.data.uf),
              (this.formData.cep = response.data.cep),
              (this.formData.district = response.data.bairro),
            ),
          )
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  color: var(--gray-40);
}

label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--gray-40);
}

.text-sm {
  font-weight: 400;
  color: var(--gray-40);
}

.requerido {
  color: var(--red-50);
}

#phone {
  margin-top: 0.375rem;
}

.campo-foto {
  label {
    display: grid;
    justify-items: center;
    padding: 3.125rem;
    background-color: var(--gray-10);
    border-radius: 1.5625rem;
    margin-bottom: 2rem;

    img {
      padding-bottom: 2.5rem;
    }

    p {
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 150%;
      text-decoration-line: underline;
      color: var(--gray-40);
      padding-bottom: 0.3125rem;
    }

    span {
      font-weight: 400;
      font-size: 0.75rem;
      line-height: 150%;
      color: var(--gray-40);
      padding-bottom: 2.5rem;
    }
  }
}
</style>
