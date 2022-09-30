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
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          @click="$bvModal.hide('criar-cliente')"
        />
      </div>
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

      <b-form-group class="mb-4">
        <label for="pessoa"
          >Pessoa física ou jurídica?<span class="requerido">*</span></label
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
        <b-form-invalid-feedback>
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
        <label for="file" class="text-center">Enviar Foto</label>
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

      <b-row>
        <b-col cols="6">
          <b-form-group class="mb-4">
            <label for="cep">CEP</label>
            <b-form-input
              v-model="formData.cep"
              v-mask="['#####-###']"
              name="cep"
              placeholder="000-00000"
            />
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
  name: 'Add',
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
      cnpj: {
        required: requiredIf(function () {
          return this.type;
        }),
        minLength: minLength(18),
      },
      cpf: {
        required: requiredIf(function () {
          return this.type;
        }),
        minLength: minLength(14),
      },
      phone: {
        required,
        minLength: minLength(14),
      },
      email: {
        required,
        email,
      },
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
                type: null,
                name: null,
                cnpj: null,
                cpf: null,
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
