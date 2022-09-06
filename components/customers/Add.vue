<template>
  <b-modal
    id="criar-cliente"
    ref="costumerModal"
    size="lg"
    hide-footer
    hide-header
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Criar / Editar Cliente</h1>
        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3 x-icon"
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
        <label for="cnpj">CPF / CNPJ <span class="requerido">*</span></label>
        <b-form-input
          v-model="formData.cnpj"
          v-mask="['###.###.###-##', '##.###.###/####-##']"
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
        <label for="address">Endereço <span class="requerido">*</span></label>
        <b-form-input
          v-model="formData.address"
          name="address"
          type="text"
          placeholder="-"
          :class="{
            'is-invalid': $v.formData.address.$error,
          }"
        />
        <b-form-invalid-feedback>
          Preencha o campo acima
        </b-form-invalid-feedback>
      </b-form-group>

      <b-row>
        <b-col cols="6">
          <b-form-group class="mb-4">
            <label for="cep">CEP <span class="requerido">*</span></label>
            <b-form-input
              v-model="formData.cep"
              name="cep"
              type="number"
              placeholder="000-00000"
              :class="{
                'is-invalid': $v.formData.cep.$error,
              }"
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
            <label for="city">Cidade</label>
            <b-form-input
              v-model="formData.city"
              name="city"
              type="text"
              placeholder="-"
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
            <label for="state">Estado</label>
            <b-form-input
              v-model="formData.state"
              name="state"
              type="text"
              placeholder="-"
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
            <label for="number">Número <span class="requerido">*</span></label>
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
              placeholder="-"
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
import { required, email, minLength } from 'vuelidate/lib/validators';
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
        name: null,
        cnpj: null,
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

  validations: {
    formData: {
      name: {
        required,
      },
      cnpj: {
        required,
        minLength: minLength(13),
      },
      phone: {
        required,
        minLength: minLength(9),
      },
      email: {
        required,
        email,
      },
      address: {
        required,
      },
      cep: {
        required,
      },
      district: {
        required,
      },
      city: {
        required,
      },
      state: {
        required,
      },
      number: {
        required,
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
          this.$v.$reset();

          console.log('executou o clic');
          this.$refs.costumerModal.hide();

          await this.$axios
            .post('customers', this.$data.formData)
            .then((_res) => {
              this.toast('success', 'Sucesso', 'Item adicionado com sucesso!');
              this.$nuxt.refresh();
            })
            .catch((_err) => {});
        } catch (error) {
          console.log(error);
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
.x-icon {
  cursor: pointer;
}
.requerido {
  color: var(--red-50);
}
</style>
