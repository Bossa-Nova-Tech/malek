<template>
  <b-modal :id="'view-client-' + clienteDaLista.id" :ref="'view-client-' + clienteDaLista.id" size="lg" centered
    no-close-on-backdrop hide-footer hide-header @shown="modalShown">
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Visualizar Cliente</h1>
        <img src="~/assets/img/icones/X-icon.svg" class="mb-5 mt-3" role="button"
          @click="$bvModal.hide('view-client-' + clienteDaLista.id)" />
      </div>
      <div class="d-flex align-items-center justify-content-center">

        <b-img class="photo-cliente" :src="formData.photo" />
      </div>
      <b-form-group>
        <label>Status</label>
        <p v-if="formData.active">Ativo</p>
        <p v-if="!formData.active">Inativo</p>
      </b-form-group>
      <b-form-group>
        <label>Nome</label>
        <b-form-input :value="formData.name" disabled class="bg-white" />
      </b-form-group>

      <b-form-group class="mb-4">
        <label v-if="formData.type == 'pj'">CNPJ</label>
        <label v-else>CPF</label>
        <b-form-input v-if="formData.type == 'pj'" :value="formData.cnpj" disabled class="bg-white" />
        <b-form-input v-else :value="formData.cpf" disabled class="bg-white" />
      </b-form-group>

      <b-row>
        <b-col cols="12">
          <b-form-group v-if="formData.type == 'f'" class="mb-4">
            <label>RG</label>
            <b-form-input :value="formData.rg" disabled class="bg-white" />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="6" md="12">
          <b-form-group v-if="formData.type == 'pj'" class="mb-4">
            <label>Razão Social</label>
            <b-form-input :value="formData.corporate_name" disabled class="bg-white" />
          </b-form-group>
        </b-col>
        <b-col lg="6" md="12">
          <b-form-group v-if="formData.type == 'pj'" class="mb-4">
            <label>Inscrição Estadual</label>
            <b-form-input :value="formData.state_registration" disabled class="bg-white" />
          </b-form-group>
        </b-col>
      </b-row>

      <div class="grid">
        <b-form-group class="mb-4">
          <label>Telefone</label>
          <b-form-input :value="formData.phone" disabled class="bg-white" />
        </b-form-group>

        <b-form-group class="mb-4">
          <label>E-mail</label>
          <b-form-input :value="formData.email" disabled class="bg-white" />
        </b-form-group>
      </div>

      <b-form-group class="mb-4">
        <label>CEP</label>
        <b-form-input :value="formData.cep" disabled class="bg-white" />
      </b-form-group>

      <b-row>
        <b-col lg="6" md="12">
          <b-form-group class="mb-4">
            <label>Endereço</label>
            <b-form-input :value="formData.address" disabled class="bg-white" />
          </b-form-group>
        </b-col>

        <b-col lg="6" md="12">
          <b-form-group class="mb-4">
            <label>Bairro</label>
            <b-form-input :value="formData.district" disabled class="bg-white" />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group class="mb-4">
            <label>Cidade</label>
            <b-form-input :value="formData.city" disabled class="bg-white" />
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group class="mb-4">
            <label>Estado</label>
            <b-form-input :value="formData.state" disabled class="bg-white" />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group class="mb-4">
            <label>Número</label>
            <b-form-input :value="formData.number" disabled class="bg-white" />
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group class="mb-4">
            <label>Complemento</label>
            <b-form-input :value="formData.complement" disabled class="bg-white" />
          </b-form-group>
        </b-col>
      </b-row>
      <client-only>
        <l-map ref="myMap" name="mapa" style="height: 300px; border-radius: 8px" :zoom="zoom" :center="center"
          class="mb-4">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :draggable="true" :lat-lng="center"></l-marker>
          <l-control :position="'topright'" class="custom-control-watermark">
            AíServe &copy; Malek 2022
          </l-control>
          <l-circle :lat-lng="circle.center" :radius="circle.radius" />
        </l-map>
      </client-only>
    </div>
  </b-modal>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import { latLng, Icon } from 'leaflet';
import { LMap, LTileLayer, LControl, LCircle } from 'vue2-leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
export default {
  name: 'ViewClient',
  components: { LMap, LTileLayer, LControl, LCircle },
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
        active: null,
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
      circle: {
        center: latLng(-27.64337, -48.68869),
        radius: 300,
      },
      zoom: 18,
      center: latLng(-27.64337, -48.68869),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      date_of_visit: null,
    };
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
        console.log('deu erro');
      }
    },
    setDataFormWithClient() {
      if (this.clienteDaLista.active === 1) {
        this.formData.active = true;
      } else {
        this.formData.active = false;
      }
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
      this.formData.state_registration = this.clienteDaLista.state_registration;
      this.formData.corporate_name = this.clienteDaLista.corporate_name;
      this.formData.photo = this.clienteDaLista.photo_url;

    },
    modalShown() {
      setTimeout(() => {
        // mapObject is a property that is part of leaflet
        this.$refs.myMap.mapObject.invalidateSize();
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: var(--primary-80);
}

.photo-cliente {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  object-position: center;
  object-fit: cover;

}

label {
  font-size: 0.75rem;
}

label,
input {
  color: var(--gray-40);
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
