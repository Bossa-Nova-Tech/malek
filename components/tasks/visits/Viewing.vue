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
          Visita da OS <span> {{ visitaItem.task.id }}</span>
        </h1>

        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mt-3"
          alt="icone para fechar"
          role="button"
          @click="salvarFoto"
        />
      </div>
      <h3>Tipo de serviço</h3>
      <p>{{ visitaItem.task.services }}</p>
      <h3 class="mt-4">Cliente</h3>
      <p>{{ visitaItem.task.name_customer }}</p>
      <h3 class="mt-4">Data da Visita:</h3>
      <p>{{ visitaItem.date_visit }}</p>
      <h3 class="mt-4">Duração média da tarefa</h3>
      <p>{{ visitaItem.task.estimated_time }}</p>
      <h3 class="mt-4">Horário da Visita:</h3>
      <p>{{ visitaItem.hour_visit }}</p>
      <h3 class="mt-4">Colaborador</h3>
      <p>{{ visitaItem.user.name }}</p>

      <h3 class="mt-4">Adicionar foto e descrição</h3>
      <div class="d-flex align-items-center mb-3">
        <label for="file" class="text-center mb-0">Enviar Foto </label>
        <img id="info-foto" src="~/assets/img/icones/info.svg" class="ml-3" />
        <b-tooltip target="info-foto" placement="right" variant="primary">
          <pre>{{ visitaItem.photo }}</pre>
          <span>Foto opcional</span>
        </b-tooltip>
      </div>
      <input
        ref="arquivo"
        type="file"
        accept="image/*"
        class="d-none"
        @change="foto_selecionada"
      />
      <ul class="list-unstyled">
        <li v-for="(foto, index) in fotos" :key="index" class="mb-2">
          <h6>Título da foto:</h6>
          <b-form-input
            v-model="foto.title"
            placeholder="Título da foto:"
            class="my-3"
          />
          <div class="d-flex align-items-start justify-content-between">
            <b-img
              :src="foto.image"
              width="80"
              height="80"
              class="mb-2 rounded"
            ></b-img>
            <b-img
              size="sm"
              src="~/assets/img/icones/delete-icon.svg"
              variant="link"
              class="p-0"
              @click="fotos.splice(index, 1)"
            />
          </div>
          <h6>Descrição da foto:</h6>
          <b-form-input
            v-model="foto.note"
            placeholder="Digite a descrição:"
            class="my-3"
          />
        </li>
      </ul>
      <BorderButton class="mb-4 selecionar" @click.native="addFoto">
        Selecionar foto
      </BorderButton>

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
      <b-form-group>
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
      <b-button variant="primary" @click="salvarComentario">Salvar</b-button>
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
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
export default {
  name: 'ViewingVisit',
  components: { LMap, LTileLayer, LControl, LCircle },
  mixins: [validationMixin],
  props: {
    visitaItem: {
      type: Object,
      default: null,
    },
    center: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      files: null,
      reader: null,
      vm: null,
      fotos: [],
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
      latitude: null,
      longitude: null,
      coordenadas: [],
      fotos: [],
      photo: [],
      visits: {
        date_visit: null,
        hour_visit: null,
        user_id: null,
      },
      customer_id: null,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      visits: [],
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
    addFoto() {
      $(this.$refs.arquivo).trigger('click');
    },
    foto_selecionada() {
      const files = $(this.$refs.arquivo).prop('files');
      if (files.lenght < 1) {
        return false;
      }
      const foto = files[0];
      const leitor = new FileReader();
      leitor.onload = () => {
        this.fotos.push({
          image: leitor.result,
          title: foto.title,
          note: foto.note,
        });
        $(this.$refs.arquivo).val('');
      };
      leitor.readAsDataURL(foto);
      this.photo = this.fotos;
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
          'tasks/comment/' + this.visitaItem.task.id,
          this.$data.comment,
        );
        this.listComment = true;
        await this.salvarFoto();
        this.$bvModal.hide('view-visit-' + this.visitaItem.id);
      }
    },
    async salvarFoto() {
      if (this.fotos) {
        try {
          this.visits = {
            date_visit: this.visitaItem.date_visit,
            hour_visit: this.visitaItem.hour_visit,
            user_id: this.visitaItem.user_id,
            photo: this.photo,
          };
          await this.$axios
            .put('tasks/visit/' + this.visitaItem.id, this.$data.visits)
            .then((_res) => {
              this.$root.$emit('bv::hide::modal', 'visitas');
              this.toast(
                'success',
                'Sucesso',
                'Visita atualizada com sucesso!',
              );
              /* this.$router.go( 0); */
            });
          this.$bvModal.hide('view-visit-' + this.visitaItem.id);
          this.$nuxt.refresh().catch((_err) => {});
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$bvModal.hide('view-visit-' + this.visitaItem.id);
      }
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

  /* ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
    li {
      display: flex;
      flex-direction: column;
      .trash {
        align-self: end;
        width: fit-content;
      } */
  .foto {
    width: 100%;
  }
}

/* }
} */
</style>
