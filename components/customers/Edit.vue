<template>
  <b-modal
    :id="'update-client-' + clienteDaLista.id"
    :ref="'update-client-' + clienteDaLista.id"
    size="lg"
    hide-footer
    hide-header
    @shown="modalShown"
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Editar Cliente</h1>
        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          role="button"
          alt="icone de fechar"
          @click="$bvModal.hide('update-client-' + clienteDaLista.id)"
        />
      </div>
      <b-form-group>
        <label for="active">Status do cliente:</label>
        <b-form-radio-group
          v-model="formData.active"
          name="active"
          :options="active"
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
          v-model="formData.cnpj"
          v-mask="['##.###.###/####-##']"
          value="cnpj"
          placeholder="00.000.000/0000-00"
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
          value="cpf"
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
        <label v-if="formData.type == 'f'" for="file" class="text-center"
          >Enviar Foto</label
        >
        <label v-else for="file" class="text-center">Enviar Logotipo</label>
      </BorderButton>
      <div class="campo-foto d-flex align-self center justify-content-center">
        <img
          v-if="clienteDaLista.photo_url"
          :src="clienteDaLista.photo_url"
          alt="foto"
          width="100"
        />
        <b-img
          v-if="clienteDaLista.photo_url"
          src="~/assets/img/icones/delete-icon.svg"
          role="button"
          class="ml-5 pl-5 pb-2"
          @click="excluiFoto"
        />
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
          <img :src="formData.photo" alt="foto" width="100" />
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

      <b-row>
        <b-col cols="12">
          <l-map
            ref="myMap"
            name="mapa"
            style="height: 300px; border-radius: 8px"
            :zoom="zoom"
            :center="center"
            class="mb-4"
          >
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker :lat-lng="center"></l-marker>
            <l-control :position="'topright'" class="custom-control-watermark">
              AíServe &copy; Malek 2022
            </l-control>
            <l-circle :lat-lng="circle.center" :radius="circle.radius" />
          </l-map>
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
import { LMap, LTileLayer, LControl, LCircle } from 'vue2-leaflet';

export default {
  name: 'EditClient',
  directives: { mask },
  components: { LMap, LTileLayer, LControl, LCircle },
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
    coordinates: {
      type: Array | Object,
      default: null,
    },
  },
  data: () => {
    return {
      circle: {
        center: [1, 2],
        radius: 4500,
      },
      lat: '',
      long: '',
      zoom: 18,
      center: [1, 2],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      file: null,
      files: null,
      reader: null,
      vm: null,
      formSend: false,
      formData: {
        active: true,
        type: null,
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
      active: [
        {
          text: 'Ativo',
          value: true,
        },
        {
          text: 'Inativo',
          value: false,
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
      this.setDataFormWithClient();
    },
    async coordinates() {
      await this.getCordinates();
    },
  },
  methods: {
    getCordinates() {
      if (this.coordinates != null) {
        const coordinates = this.coordinates;
        this.lat = coordinates.latitude;
        this.long = coordinates.longitude;
        console.log(this.lat, this.long);
        this.center = [this.lat, this.long];
        this.circle.center = this.center;
      } else {
      }
    },
    modalShown() {
      setTimeout(() => {
        // mapObject is a property that is part of leaflet
        this.$refs.myMap.mapObject.invalidateSize();
      }, 100);
    },
    setDataFormWithClient() {
      this.formData.state_registration = this.clienteDaLista.state_registration;
      this.formData.corporate_name = this.clienteDaLista.corporate_name;
      this.formData.name = this.clienteDaLista.name;
      this.formData.type = this.clienteDaLista.type;
      this.formData.cnpj = this.clienteDaLista.cnpj;
      this.formData.cpf = this.clienteDaLista.cpf;
      this.formData.rg = this.clienteDaLista.rg;
      this.formData.phone = this.clienteDaLista.phone;
      this.formData.email = this.clienteDaLista.email;
      this.formData.address = this.clienteDaLista.address;
      this.formData.cep = this.clienteDaLista.cep;
      this.formData.district = this.clienteDaLista.district;
      this.formData.city = this.clienteDaLista.city;
      this.formData.state = this.clienteDaLista.state;
      this.formData.number = this.clienteDaLista.number;
      this.formData.complement = this.clienteDaLista.complement;
      if (this.clienteDaLista.active === 1) {
        this.formData.active = true;
      } else {
        this.formData.active = false;
      }
    },
    async edit(_response) {
      const cliente = await this.$parent.clienteDaLista;
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        this.$v.$reset();
        try {
          this.formSend = false;
          this.$v.$reset();

          await this.$axios
            .put(`customers/${cliente.id}`, this.$data.formData)
            .then((_res) => {
              this.$root.$emit(
                'bv::hide::modal',
                `update-client-${this.clienteDaLista.id}`,
              );

              // this.$refs.criar.hide();

              this.toast('success', 'Sucesso', 'Item editado com sucesso!');
              this.$nuxt.refresh();
            })
            .catch((_err) => {});
        } catch (error) {}
      }
    },
    excluiFoto() {
      if (this.clienteDaLista) {
        this.clienteDaLista.photo_url = null;
        this.clienteDaLista.photo_relative = null;
        this.formData.photo = null;
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
