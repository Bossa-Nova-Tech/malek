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
              <b-form-input v-model="formData.name" name="name" type="text" placeholder="João" :class="{
                'is-invalid': $v.formData.name.$error,
              }" />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="last_name">Sobrenome <span class="requerido">*</span></label>
              <b-form-input v-model="formData.last_name" name="last_name" type="text" placeholder="Souza" :class="{
                'is-invalid': $v.formData.last_name.$error,
              }" />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group class="mb-4">
          <label for="cnpj">CPF / CNPJ <span class="requerido">*</span></label>
          <b-form-input v-model="formData.cnpj" v-mask="['###.###.###-##', '##.###.###/####-##']" name="cnpj"
            placeholder="00.000.000/000-00" :class="{ 'is-invalid': $v.formData.cnpj.$error }" />
          <b-form-invalid-feedback>
            {{
                !$v.formData.cnpj.minLength
                  ? 'Insira um CNPJ válido'
                  : 'Preencha o campo acima'
            }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="mb-4">
          <label for="fantasy_name">Nome da Empresa <span class="requerido">*</span></label>
          <b-form-input v-model="formData.fantasy_name" name="fantasy_name" placeholder="Nome da Empresa"
            :class="{ 'is-invalid': $v.formData.fantasy_name.$error }" />
          <b-form-invalid-feedback>
            Preencha o campo acima
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="mb-4">
          <label for="email">E-mail <span class="requerido">*</span></label>
          <b-form-input v-model="formData.email" name="email" type="email" placeholder="email@gmail.com" :class="{
            'is-invalid': $v.formData.email.$error,
          }" />
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
          <b-form-input v-model="formData.phone" v-mask="['(##) ####-####', '(##) #####-####']" name="phone"
            placeholder="(00) 0 0000-0000" :class="{
              'is-invalid': $v.formData.phone.$error,
            }" />
          <b-form-invalid-feedback>
            {{
                !$v.formData.phone.minLength
                  ? 'Insira um telefone válido'
                  : 'Preencha o campo acima'
            }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-row>
          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="password">Senha <span class="requerido">*</span></label>
              <b-form-input v-model="$v.formData.password.$model" name="password" type="password" placeholder="********"
                :class="{
                  'is-invalid': $v.formData.password.$error,
                }" />
              <b-form-invalid-feedback>
                {{
                    !$v.formData.password.minLength
                      ? 'No mínimo 8 caracteres'
                      : 'Insira uma senha'
                }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="confirm_password">Confirmar Senha <span class="requerido">*</span></label>
              <b-form-input v-model="$v.formData.confirm_password.$model" name="confirm_password" type="password"
                placeholder="********" :class="{
                  'is-invalid': $v.formData.confirm_password.$error,
                }" />
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
          <label for="address">Endereço <span class="requerido">*</span></label>
          <b-form-input v-model="formData.address" name="address" type="text" placeholder="Rua" :class="{
            'is-invalid': $v.formData.address.$error,
          }" />
          <b-form-invalid-feedback>
            Preencha o campo acima
          </b-form-invalid-feedback>
        </b-form-group>

        <b-row>
          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="cep">CEP <span class="requerido">*</span></label>
              <b-form-input v-model="formData.cep" v-mask="['#####-###']" name="cep" placeholder="00000-000" :class="{
                'is-invalid': $v.formData.cep.$error,
              }" />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="district">Bairro <span class="requerido">*</span></label>
              <b-form-input v-model="formData.district" name="district" type="text" placeholder="-" :class="{
                'is-invalid': $v.formData.district.$error,
              }" />
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
              <b-form-input v-model="formData.city" name="city" type="text" placeholder="Cidade" :class="{
                'is-invalid': $v.formData.city.$error,
              }" />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="state">Estado <span class="requerido">*</span></label>
              <b-form-input v-model="formData.state" name="state" type="text" placeholder="Estado" :class="{
                'is-invalid': $v.formData.state.$error,
              }" />
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
              <b-form-input v-model="formData.number" name="number" type="number" placeholder="000" :class="{
                'is-invalid': $v.formData.number.$error,
              }" />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="complement">Complemento</label>
              <b-form-input v-model="formData.complement" name="complement" type="text"
                placeholder="Apartamento X, Bloco Y" />
            </b-form-group>
          </b-col>
        </b-row>
        <div v-if="!formData.logo" for="file" class="campo-foto">
          <el-upload v-model="formData.logo" action="#" :show-file-list="false" :on-success="handleAvatarSuccess"
            :on-remove="handleRemove" :before-upload="beforeAvatarUpload"
            :class="{ 'is-invalid': $v.formData.logo.$error }"
            class="d-flex flex-column justify-content-center align-items-center">
            <b-form-feedback class="text-center h5">
              Envio necessário. Clique abaixo para fazer o upload da sua logo.
            </b-form-feedback>
            <b-img src="~/assets/img/icones/upload.svg" />
            <p>Clique para enviar sua logo</p>
            <span>PNG, JPG (tamanho máximo X)</span>
          </el-upload>
        </div>

        <div v-else class="d-flex flex-column justify-content-center align-items-center">
          <b-img rel="preload" src="~/assets/img/icones/delete-icon.svg" role="button" class="ml-5 pl-5 pb-2"
            @click="excluiFoto" />
          <img :src="formData.logo" alt="logo" width="100" class="avatar pb-5" />
        </div>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="formData.logo" alt="upload da logo" />
        </el-dialog>
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
      <b-modal id="modal-center" ref="modal-center" centered hide-header hide-footer>
        <div class="d-flex flex-column align-items-center">
          <img src="~/assets/img/icones/email-icon.svg" alt="icone de email" class="py-4" />
          <h3 class="text-center">Cadastro realizado com sucesso!</h3>
          <NuxtLink to="/">Clique aqui para realizar o login</NuxtLink>
        </div>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';

export default {
  name: 'RegisterCompany',

  directives: { mask },
  mixins: [validationMixin],

  data: () => {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      file: null,
      files: null,
      reader: null,
      vm: null,
      formSend: false,
      formData: {
        name: null,
        last_name: null,
        cnpj: null,
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
        logo: null,
      },
    };
  },

  validations: {
    formData: {
      name: { required },
      last_name: { required },
      cnpj: { required, minLength: minLength(13) },
      phone: { required, minLength: minLength(14) },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      confirm_password: { required, sameAsPassword: sameAs('password') },
      cep: { required },
      district: { required },
      city: { required },
      state: { required },
      number: { required },
      fantasy_name: { required },
      address: { required },
      logo: { required },
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
    handlePictureCardPreview(file) {
      this.formData.logo = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.formData.logo = URL.createObjectURL(file.raw);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isJPG || isPNG)) {
        this.$message.error('A logo de ser em formato jpeg ou png!');
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
      }
      return (isPNG || isJPG) && isLt2M;
    },
    excluiFoto() {
      this.formData.logo = null;
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
        this.vm.formData.logo = e.target.result;
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

          await this.$axios
            .post('companies', this.$data.formData)
            .then((_res) => {
              this.$refs['modal-center'].show();
              this.formSend = false;
            })
            .catch((_err) => { });
        } catch (error) {
          console.log(error);
        }
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
</style>
