<template>
  <b-modal
    id="criar-cliente"
    ref="costumerModal"
    size="lg"
    scrollable
    hide-footer
    hide-header
    class="vh-100"
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Criar Cliente</h1>
        <img
          rel="preload"
          src="~/assets/img/icones/X-icon.svg"
          role="button"
          class="mb-5 mt-3"
          @click="$bvModal.hide('criar-cliente')"
        />
      </div>
      <b-form-group class="mb-4">
        <label v-if="formData.type == 'f'" for="name"
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
        <b-col md="6" sm="12">
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
              {{ 'Insira uma IE válida' }}
            </b-form-invalid-feedback>
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

        <div class="w-100 grid-2">
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
        <label v-if="formData.type == 'f'" for="file" class="text-center"
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

          <img rel="preload" :src="formData.photo" alt="foto" width="100" />
        </div>
      </div>

      <b-form-group class="mb-4">
        <label for="cep">CEP</label>
        <b-form-input
          v-model="formData.cep"
          name="cep"
          placeholder="000-0000"
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
        <b-col cols="6">
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

        <b-col cols="6">
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
        <b-col cols="6">
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

        <b-col cols="6">
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
        <b-col cols="6">
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

        <b-col cols="6">
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

      <b-row class="mt-2">
        <b-col sm="12">
          <label for="textarea-default">Observações</label>
          <b-form-textarea
            v-model="formData.note"
            placeholder="Opcional"
          ></b-form-textarea>
        </b-col>
      </b-row>
      <button class="mt-4 mb-2" :disabled="formSend" @click="saveCustomer">
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
  name: 'AddClient',
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
        cnpj: null,
        cpf: null,
        rg: null,
        corporate_name: null,
        state_registration: null,
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
        note: null,
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
    };
  },

  validations: {
    formData: {
      name: {
        required,
      },
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
      phone: {
        required,
        minLength: minLength(14),
      },
      email: {
        required,
        email,
      },
      cep: {
        required,
        minLength: minLength(9),
      },
      number: {
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
    async saveCustomer(_response) {
      this.$v.formData.$touch();

      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        console.log(this.formData);

        try {
          this.formSend = false;
          this.$v.formData.$reset();
          console.log('executou o clic');
          this.$refs.costumerModal.hide();

          await this.$axios
            .post('customers', this.$data.formData)
            .then((_res) => {
              this.toast(
                'success',
                'Sucesso',
                'Cliente adicionado com sucesso!',
              );
              this.formData = {
                name: null,
                email: null,
                type: null,
                cnpj: null,
                cpf: null,
                corporate_name: null,
                state_registration: null,
                rg: null,
                phone: null,
                photo: null,
                cep: null,
                address: null,
                district: null,
                city: null,
                state: null,
                number: null,
                complement: null,
                note: null,
              };
              this.$nuxt.refresh();
            })
            .catch((_err) => {});
        } catch (error) {
          console.log(error);
        }
      }
    },
    excluiFoto() {
      if (this.formData.photo) {
        this.formData = {
          photo: null,
        };
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
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.requerido {
  color: var(--red-50);
}

.grid-1 {
  margin-right: 15px;
}

.grid-2 {
  margin-left: 15px;
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
