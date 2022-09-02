<template>
  <b-modal
    id="criar-proposta"
    ref="proposalModal"
    size="lg"
    hide-footer
    hide-header
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Criar / Editar Proposta</h1>
        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3 x-icon"
          @click="$bvModal.hide('criar-proposta')"
        />
      </div>
      <b-form-group class="mb-4">
        <label for="name_customer"
          >Cliente <span class="requerido">*</span></label
        >
        <b-form-select
          v-model="formData.name_customer"
          name="name_customer"
          type="text"
          :options="`{$customers.name}`"
          :class="{
            'is-invalid': $v.formData.name_customer.$error,
          }"
        />
        <b-form-invalid-feedback> Selecione uma opção </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group class="mb-4">
        <label for="customer_id">ID <span class="requerido">*</span></label>
        <b-form-input
          v-model.number="formData.customer_id"
          v-mask="['#####']"
          name="customer_id"
          placeholder="00001"
          :class="{ 'is-invalid': $v.formData.customer_id.$error }"
        />
        <b-form-invalid-feedback> Preencha o id. </b-form-invalid-feedback>
      </b-form-group>

      <b-row>
        <b-col cols="6">
          <b-form-group class="mb-4">
            <label for="budget_name"
              >Nome do orçamento <span class="requerido">*</span></label
            >
            <b-form-input
              v-model="formData.budget_name"
              name="budget_name"
              placeholder="Manutenção e limpeza mensal"
              :class="{
                'is-invalid': $v.formData.budget_name.$error,
              }"
            />
            <b-form-invalid-feedback>
              Preencha o campo acima.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group class="mb-4">
            <label for="details"
              >Detalhes <span class="requerido">*</span></label
            >
            <b-form-input
              v-model="formData.details"
              name="details"
              type="text"
              placeholder="descrição"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <BorderButton class="my-4">
        <input
          id="file"
          type="file"
          accept=".png, .jpg"
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
        name_customer: null,
        customer_id: null,
        budget_name: null,
        phone: null,
        email: null,
        photo: null,
        details: null,
        cnpj: null,
        name: null,
        proposal_expire_at: null,
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
      name_customer: {
        required,
      },
      customer_id: {
        required,
      },
      budget_name: {
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
