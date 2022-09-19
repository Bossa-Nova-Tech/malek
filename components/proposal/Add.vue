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
        <label for="customer">Cliente <span class="requerido">*</span></label>
        <b-form-select
          v-model="formData.name_customer"
          name="customer"
          :class="{ 'is-invalid': $v.formData.name_customer.$error }"
        >
          <b-form-select-option :value="null" desabled
            >Selecione</b-form-select-option
          >
          <b-form-select-option
            v-for="customer in customers"
            :key="customer.id"
            :value="customer.name"
            >{{ customer.name }}
          </b-form-select-option>
        </b-form-select>

        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group class="mb-4">
        <label for="customer_id">ID <span class="requerido">*</span></label>
        <b-form-input
          v-model="formData.customer_id"
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
            <label for="details">Detalhes</label>
            <b-form-input
              v-model="formData.details"
              name="details"
              placeholder="descrição"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <div>
        <h2>Serviços inclusos</h2>
        <b-form-checkbox-group
          v-model="formData.services"
          :options="servicesOptions"
          stacked
        ></b-form-checkbox-group>
        <p>Total R$ XXXX 03h30</p>
      </div>
      <div>
        <h2 class="mt-4">Cabeçalho</h2>
        <BorderButton class="my-4">
          <input
            id="file"
            type="file"
            accept=".png, .jpg"
            plain
            class="d-flex"
            @change="onFileChange"
          />
          <label for="file" class="text-center">Enviar Foto</label>
        </BorderButton>
      </div>
      <div class="my-4">
        <h2>Minhas informações</h2>
        <b-form-checkbox v-model="formData.import"
          >Importar meus dados de cadastro</b-form-checkbox
        >
      </div>
      <b-form-group class="mb-4">
        <label for="name">Nome <span class="requerido">*</span></label>
        <b-form-input
          v-model="formData.name"
          name="name"
          placeholder="Nome Exemplo"
          :class="{
            'is-invalid': $v.formData.name.$error,
          }"
        />
        <b-form-invalid-feedback>
          Preencha o campo acima
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-4">
        <label for="cpf">CPF <span class="requerido">*</span></label>
        <b-form-input
          v-model="formData.cpf"
          v-mask="['###.###.###-##']"
          name="cpf"
          placeholder="111.111.111-00"
          :class="{
            'is-invalid': $v.formData.cpf.$error,
          }"
        />
      </b-form-group>
      <b-form-invalid-feedback>
        {{
          !$v.formData.cpf.minLength
            ? 'Insira um CPF válido'
            : 'Preencha o campo acima'
        }}
      </b-form-invalid-feedback>

      <b-form-group class="mb-4">
        <label for="email">E-mail</label>
        <b-form-input
          v-model="formData.email"
          name="email"
          placeholder="email@email.com"
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
      <b-row class="mb-4">
        <b-col cols="4">
          <b-form-group>
            <label for="ddd">Telefone <span class="requerido">*</span></label>
            <b-form-input
              v-model="formData.ddd"
              v-mask="['(##)']"
              name="ddd"
              placeholder="(00)"
              :class="{
                'is-invalid': $v.formData.ddd.$error,
              }"
            />
            <b-form-invalid-feedback>
              {{
                !$v.formData.ddd.minLength
                  ? 'Insira um ddd válido'
                  : 'Preencha o campo acima'
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <b-col cols="8">
          <b-form-group>
            <label for="phone">&nbsp;</label>
            <b-form-input
              id="phone"
              v-model="formData.phone"
              v-mask="['#####-####']"
              name="phone"
              placeholder="0 0000-0000"
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
      </b-row>

      <button class="mt-4 mb-2" :disabled="formSend" @click="saveProposal">
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
      customers: [],
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
        ddd: null,
        email: null,
        photo: null,
        details: null,
        import: null,
        services: [],
        cpf: null,
        name: null,
        proposal_expire_at: null,
      },
      customerOptions: [
        {
          value: null,
          text: 'Cliente 1',
        },
        {
          value: 'Cliente 2',
          text: 'Cliente 2',
        },
      ],
      servicesOptions: [
        {
          value: 'Manutenção',
          html: '<span style="color:#5e5e5e; font-size:14px;">Manutenção</span>',
        },
        {
          value: 'Limpeza',
          html: '<span style="color:#5e5e5e; font-size:14px;">Limpeza</span>',
        },
        {
          value: 'Chamado',
          html: '<span style="color:#5e5e5e; font-size:14px;">Chamado</span>',
        },
        {
          value: 'Instalação',
          html: '<span style="color:#5e5e5e; font-size:14px;">Instalação</span>',
        },
      ],
    };
  },
  validations: {
    formData: {
      name: {
        required,
      },
      phone: {
        required,
        minLength: minLength(9),
      },
      ddd: {
        required,
        minLength: minLength(2),
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
      cpf: {
        required,
        minLength: minLength(11),
      },
    },
  },

  async mounted() {
    const { data } = await this.$axios.get('customers');
    const customer = data;
    console.log(customer);
    this.customers = customer;
  },
  methods: {
    async saveProposal(_response) {
      this.$v.formData.$touch();

      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        console.log(this.formData);

        try {
          this.formSend = false;
          this.$v.$reset();

          console.log('executou o clic');
          this.$refs.proposalModal.hide();

          await this.$axios
            .post('business-proposal', this.$data.formData)
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
h2 {
  font-weight: 700;
  font-size: 1rem;
  color: var(--primary-80);
  margin-bottom: 1rem;
}
.phone {
  display: flex !important;
}
</style>
