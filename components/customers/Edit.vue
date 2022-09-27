<template>
  <b-modal
    :id="'update-task-' + clienteDaLista.id"
    :ref="'update-task-' + clienteDaLista.id"
    size="lg"
    hide-footer
    hide-header
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Editar Cliente</h1>
        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          role="button"
          @click="$bvModal.hide('update-task-' + clienteDaLista.id)"
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
          v-model="formData.accountType"
          :options="types"
          plain
          size="sm"
          class="mb-2"
        >
        </b-form-radio-group>
        <b-form-input
          v-if="formData.accountType == 'cnpj'"
          v-model="formData.cnpj"
          v-mask="['##.###.###/####-##']"
          name="cnpj"
          placeholder="00.000.000/000-00"
          :class="{ 'is-invalid': $v.formData.cnpj.$error }"
        />
        <b-form-invalid-feedback v-if="formData.accountType == 'juridica'">
          {{
            !$v.formData.cnpj.minLength
              ? 'Insira um CNPJ válido'
              : 'Preencha o campo acima'
          }}
        </b-form-invalid-feedback>
        <b-form-input
          v-if="formData.accountType == 'cpf'"
          v-model="formData.cpf"
          v-mask="['###.###.###-##']"
          name="cpf"
          placeholder="000.000.000-00"
          :class="{ 'is-invalid': $v.formData.cpf.$error }"
        />
        <b-form-invalid-feedback v-if="formData.accountType == 'fisica'">
          {{
            !$v.formData.cpf.minLength
              ? 'Insira um CPF válido'
              : 'Preencha o campo acima'
          }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-row>
        <b-col cols="6">
          <b-form-group class="mb-4">
            <label for="phone">Telefone <span class="requerido">*</span></label>
            <b-form-input
              v-model="formData.phone"
              v-mask="['(##) # ####-####']"
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
        </b-col>

        <b-col cols="6">
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
        </b-col>
      </b-row>

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
  name: 'Edit',
  directives: { mask },
  mixins: [validationMixin],
  props: {
    clienteDaLista: {
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
        accountType: 'cpf',
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
          value: 'cpf',
          html: '<span style="color:#5E5E5E;font-size:12px;">Pessoa física</span>',
        },
        {
          value: 'cnpj',
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
          return this.accountType;
        }),
        minLength: minLength(13),
      },
      cpf: {
        required,
        minLength: minLength(11),
      },
      phone: {
        required,
        minLength: minLength(9),
      },
      email: {
        required,
        email,
      },
    },
  },
  watch: {
    watching() {
      this.setDataFormWithTask();
    },
  },
  methods: {
    setDataFormWithTask() {
      this.formData.name = this.clienteDaLista.name;
      this.formData.cnpj = this.clienteDaLista.cnpj;
      this.formData.cpf = this.clienteDaLista.cpf;
      this.formData.phone = this.clienteDaLista.phone;
      this.formData.email = this.clienteDaLista.email;
      this.formData.address = this.clienteDaLista.address;
      this.formData.cep = this.clienteDaLista.cep;
      this.formData.district = this.clienteDaLista.district;
      this.formData.city = this.clienteDaLista.city;
      this.formData.state = this.clienteDaLista.state;
      this.formData.number = this.clienteDaLista.number;
      this.formData.complement = this.clienteDaLista.complement;
    },
    async edit(_response) {
      const cliente = await this.$parent.clienteDaLista;
      console.log(cliente);
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        console.log(this.formData);
        this.$v.$reset();
        try {
          this.formSend = false;
          this.$v.$reset();
          console.log('executou o clic');

          await this.$axios
            .put(`customers/${cliente.id}`, this.$data.formData)
            .then((_res) => {
              console.log('sucesso');
              this.$root.$emit(
                'bv::hide::modal',
                `update-task-${this.clienteDaLista.id}`,
              );

              // this.$refs.criar.hide();

              this.toast('success', 'Sucesso', 'Item editado com sucesso!');
              this.$nuxt.refresh();
            })
            .catch((_err) => {});
        } catch (error) {
          console.log(error, 'sadasda');
        }
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
.requerido {
  color: var(--red-50);
}
</style>
