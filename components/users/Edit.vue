<template>
  <b-modal
    :id="'update-user-' + userList.id"
    :ref="'update-user-' + userList.id"
    size="lg"
    hide-footer
    hide-header
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Editar Usuário</h1>
        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          role="button"
          @click="$bvModal.hide('update-user-' + userList.id)"
        />
      </div>
      <b-form-group>
        <label for="status">Status do usuário:</label>
        <b-form-radio-group
          v-model="formData.status"
          name="status"
          :options="status"
          class="mb-3"
          value-field="value"
          text-field="text"
          disabled-field="notEnabled"
        ></b-form-radio-group>
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

      <b-form-group class="mb-4">
        <label for="pessoa"
          >Pessoa física ou jurídica?<span class="requerido">*</span></label
        >
        <b-form-radio-group
          v-model="formData.type"
          :options="types"
          plain
          size="sm"
          class="mb-2"
        >
        </b-form-radio-group>
        <b-form-input
          v-if="formData.type == 'pj'"
          v-model="formData.cpfCnpj"
          v-mask="['##.###.###/####-##']"
          value="cnpj"
          placeholder="00.000.000/000-00"
          :class="{ 'is-invalid': $v.formData.cpfCnpj.$error }"
        />
        <b-form-invalid-feedback v-if="formData.type == 'pj'">
          {{
            !$v.formData.cpfCnpj.minLength
              ? 'Insira um CNPJ válido'
              : 'Preencha o campo acima'
          }}
        </b-form-invalid-feedback>
        <b-form-input
          v-if="formData.type == 'f'"
          v-model="formData.cpfCnpj"
          v-mask="['###.###.###-##']"
          value="cpf"
          placeholder="000.000.000-00"
          :class="{ 'is-invalid': $v.formData.cpfCnpj.$error }"
        />
        <b-form-invalid-feedback v-if="formData.type == 'f'">
          {{
            !$v.formData.cpfCnpj.minLength
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
              type="number"
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

      <div class="grid">
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
          v-if="userList.photo_url"
          class="d-flex flex-column justify-content-center align-items-center"
        >
          <b-img
            src="~/assets/img/icones/delete-icon.svg"
            role="button"
            class="ml-5 pl-5 pb-2"
            @click="excluiFoto"
          />

          <img :src="userList.photo_url" alt="" width="100" />
        </div>
      </div>
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
        <label for="cep">CEP</label>
        <b-form-input
          v-model="formData.cep"
          v-mask="['#####-###']"
          name="cep"
          placeholder="000-00000"
          :class="{
            'is-invalid': $v.formData.cep.$error,
          }"
        />
        <b-form-invalid-feedback>
          Preencha o campo acima
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
            <label for="number">Número</label>
            <b-form-input
              v-model="formData.number"
              name="number"
              type="number"
              placeholder="000"
            />
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
      <button class="mt-4 mb-2" :disabled="formSend" @click="edit">
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
  name: 'EditClient',
  directives: { mask },
  mixins: [validationMixin],
  props: {
    userList: {
      type: Object,
      default: null,
    },
    watching: {
      type: Number,
      default: null,
    },
    coordinates: {
      type: Object,
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
        status: '',
        type: '',
        name: '',
        cpfCnpj: '',
        company_id: null,
        rg: '',
        social_reason: '',
        state_registration: '',
        phone: '',
        email: '',
        photo: '',
        address: '',
        cep: '',
        district: '',
        city: '',
        state: '',
        number: '',
        complement: '',
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
      status: [
        {
          text: 'Ativo',
          value: 'active',
        },
        {
          text: 'Inativo',
          value: 'inactive',
        },
      ],
    };
  },

  validations: {
    formData: {
      name: {
        required,
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
      state_registration: {
        required: requiredIf(function () {
          return this.formData.type === 'pj';
        }),
        minLength: minLength(11),
      },
      cpfCnpj: {
        required: requiredIf(function () {
          return this.formData.type === 'f';
        }),
        minLength: minLength(14),
      },
      rg: {
        required: requiredIf(function () {
          return this.formData.cpf === 'f';
        }),
        minLength: minLength(6),
      },
      phone: {
        required,
        minLength: minLength(8),
      },
      email: {
        required,
        email,
      },
      cep: {
        required,
        minLength: minLength(8),
      },
    },
  },
  watch: {
    watching() {
      this.setDataFormWithUser();
    },
  },
  methods: {
    setDataFormWithUser() {
      this.formData.status = this.userList.status;
      this.formData.name = this.userList.name;
      this.formData.company_id = this.userList.company_id;
      if (this.userList.cnpj) {
        this.formData.type = 'pj';
      } else {
        this.formData.type = 'f';
      }
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
      this.formData.social_reason = this.userList.social_reason;
      this.formData.state_registration = this.userList.state_registration;
    },
    async edit(_response) {
      const user = await this.$parent.userList;
      this.formData.company_id = this.$auth.user.company_id;
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        this.$v.$reset();
        try {
          this.formSend = false;
          this.$v.$reset();

          await this.$axios
            .put(`users/${user.id}`, this.$data.formData)
            .then((_res) => {
              this.$root.$emit(
                'bv::hide::modal',
                `update-user-${this.userList.id}`
              );

              // this.$refs.criar.hide();

              this.toast('success', 'Sucesso', 'Usuário editado com sucesso!');
              this.$nuxt.refresh();
            })
            .catch((_err) => {});
        } catch (error) {
        }
      }
    },
    excluiFoto() {
      if (this.userList.photo_url) {
        this.userList.photo_url = null;
      } else {
        this.formData.photo = null;
      }
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
.requerido {
  color: var(--red-50);
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
