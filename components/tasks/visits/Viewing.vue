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
          Visita da OS <span> {{ visitaItem.id }}</span>
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
      <h3 class="mt-4">Comentário:</h3>
      <b-form-group v-if="this.listComment === false">
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
        v-if="this.listComment === false"
        variant="primary"
        @click="salvarComentario"
        >Salvar comentário</b-button
      >
      <p v-if="this.listComment === true">{{ comment.text }}</p>
    </div>
  </b-modal>
</template>
<script>
import 'leaflet/dist/leaflet.css';
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { latLng, Icon } from 'leaflet';
import { LMap, LTileLayer, LControl, LCircle } from 'vue2-leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
export default {
  name: 'Viewing',
  components: { LMap, LTileLayer, LControl, LCircle },
  mixins: [validationMixin],
  props: {
    visitaItem: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      listComment: false,
      comment: {
        text: null,
      },
      id: null,
      circle: {
        center: latLng(-27.64337, -48.68869),
        radius: 300,
      },
      zoom: 18,
      center: latLng(-27.64337, -48.68869),
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
    modalShown() {
      setTimeout(() => {
        // mapObject is a property that is part of leaflet
        this.$refs.myMap.mapObject.invalidateSize();
      }, 100);
    },
    showVer(visita) {
      this.id = visita.id;
      this.$nextTick(function () {
        this.$bvModal.show(`view-visit-${this.id}`);
      });
      this.visita_selecionada = visita;
    },
    async salvarComentario() {
      this.$v.comment.$touch();

      if (!this.$v.comment.$invalid) {
        await this.$axios.post(
          'tasks/comment/' + this.visitaItem.id,
          this.$data.comment,
        );
        this.listComment = true;
      }
      this.$bvModal.hide('view-visit-' + this.visitaItem.id);
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
}
</style>

