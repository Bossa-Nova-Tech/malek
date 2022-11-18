<template>
  <b-modal
    :id="'view-visit-' + visitaItem.id"
    :ref="'view-visit'"
    size="lg"
    centered
    no-close-on-backdrop
    hide-header
    hide-footer
    @shown="modalShown"
  >
    <div class="view-modal mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4">
          Visita da OS <span> {{ visitaItem.task_id }}</span>
        </h1>

        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mt-3"
          role="button"
          @click.once="$bvModal.hide(`view-visit-${visitaItem.id}`)"
        />
      </div>
      <h3>Tipo de serviço</h3>
      <p>{{ visitaItem.services }}</p>
      <h3 class="mt-4">Cliente</h3>
      <p>{{ visitaItem.name_customer }}</p>
      <h3 class="mt-4">Duração média da tarefa</h3>
      <p>{{ visitaItem.estimated_time }}</p>
      <h3 class="mt-4">Colaborador</h3>
      <p>{{ visitaItem.colaborator }}</p>

      <h3 class="mt-4">Adicionar foto e descrição</h3>
      <b-form-file
        placeholder="Escolha uma foto ..."
        drop-placeholder="Solte uma foto aqui ..."
        @change="onFileChange"
      ></b-form-file>

      <b-form-input
        v-model="newTitle_photo"
        class="my-3"
        type="text"
        placeholder="Ex: Vazamento de ar em tubulação...."
      />
      <b-button variant="primary" @click="save()">Salvar</b-button>

      <ul class="py-3">
        <li
          v-for="(photoItem, index) in listPhotos"
          :key="photoItem.index"
          @remove="photoItem.splice(index, 1)"
        >
          <p>{{ photoItem.title_photo }}</p>
          <img :src="photoItem.photo" />
        </li>
      </ul>

      <h3 class="mt-4">Localização do Cliente</h3>
      <client-only>
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
      </client-only>
      <b-button variant="primary" @click="getLocate"
        >Ver localização do cliente</b-button
      >
      <div>
        <b-button
          variant="outline-primary"
          class="mt-4"
          @click="signatureActive = !signatureActive"
          >Colher Assinatura</b-button
        >
        <signature v-if="signatureActive" />
      </div>
      <h3 class="mt-4">Comentário:</h3>
      <b-form-group v-if="listComment === false">
        <b-form-textarea
          id="user-comment"
          v-model="comment.text"
          placeholder="Digite o comentário..."
          rows="3"
          max-rows="6"
          :class="{
            'is-invalid': $v.comment.text.$error,
          }"
        ></b-form-textarea>
        <b-form-invalid-feedback>
          Para salvar, preencha o comentário.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button
        v-if="listComment === false"
        variant="primary"
        @click="salvarComentario"
        >Salvar comentário</b-button
      >
      <p v-if="listComment === true">{{ comment.text }}</p>
    </div>
  </b-modal>
</template>
<script>
import 'leaflet/dist/leaflet.css';
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { Icon } from 'leaflet';
import { LMap, LTileLayer, LControl, LCircle } from 'vue2-leaflet';
import Signature from '~/components/tasks/visits/Signature.vue';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
export default {
  name: 'ViewingVisit',
  components: { LMap, LTileLayer, LControl, LCircle, Signature },
  mixins: [validationMixin],
  props: {
    visitaItem: {
      type: Object,
      default: null,
    },
    coordenadasData: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      signatureActive: false,
      listComment: false,
      comment: {
        text: null,
      },
      circle: {
        center: [1, 2],
        radius: 300,
      },
      zoom: 18,
      center: [1, 2],
      latitude: null,
      longitude: null,
      coordenadas: [],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      visitsData: [
        {
          colaborator: 'Vanessa Gonçalves',
          date_of_visit: '02/06/2023',
          services: 'Limpeza de equipamento',
          id: 1,
        },
      ],
      urlImage: null,
      newTitle_photo: '',
      listPhotos: [],
    };
  },
  validations: {
    comment: {
      text: {
        required,
      },
    },
  },

  methods: {
    async getLocate() {
      const coordenadas = await this.$axios.get(
        'customers/get-coordinates/113',
      );
      this.coordenadas = coordenadas.data;
      this.latitude = this.coordenadas.latitude;
      this.longitude = this.coordenadas.longitude;
      this.center = [this.latitude, this.longitude];
    },
    modalShown() {
      setTimeout(() => {
        // mapObject is a property that is part of leaflet
        this.$refs.myMap.mapObject.invalidateSize();
      }, 100);
    },
    async salvarComentario() {
      this.$v.comment.$touch();

      if (!this.$v.comment.$invalid) {
        await this.$axios.post(
          'tasks/comment/' + this.visitaItem.task_id,
          this.$data.comment,
        );
        this.listComment = true;
        this.$bvModal.hide('view-visit-' + this.visitaItem.id);
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.urlImage = URL.createObjectURL(file);
    },
    save() {
      this.listPhotos.push({
        photo: this.urlImage,
        title_photo: this.newTitle_photo,
      });
      this.urlImage = '';
      this.newTitle_photo = '';
    },
  },
};
</script>
<style lang="scss" scoped>
.view-modal {
  h1 {
    font-size: 1.4rem;

    span {
      color: var(--primary-80);
    }
  }

  .imprimir {
    border: 1px solid var(--primary-80);
    border-radius: 8px;
    background: transparent;
    color: var(--fosco);
    font-size: 1rem;
    box-shadow: none;
  }

  h3 {
    font-size: 0.8rem;
    font-weight: bolder;
    color: var(--gray-60);
  }

  p {
    font-size: 1rem;
    color: var(--gray-60);
  }
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
    li {
      img {
        width: 100%;
      }
    }
  }
}
</style>
