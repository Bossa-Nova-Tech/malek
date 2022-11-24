<template>
  <section class="rounded">
    <h1 class="p-4">Acontecendo hoje</h1>
    <ul>
      <li
        v-for="(visita, index) in filteredList"
        :key="index"
        class="card-servico p-4"
      >
        <div class="d-flex pb-3" @click="showVer(visita)">
          <div class="ajuste">
            <!-- <a class="timer"
              >{{ zfill(hour) }}:{{ zfill(min) }}:{{ zfill(sec) }}</a
            > -->
            <h2 class="primary-80 pb-1">
              # {{ visita.task_id }} {{ visita.services }}
            </h2>
            <p class="gray-40">
              Quem irá atender: <strong>{{ visita.user_id }}</strong>
            </p>
          </div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <div class="d-flex mb-2">
            <Viewing :visita-item="visita" :task="tasksData" :center="center" />

            <Timer :visit-id="visita.id" :start="visita.status" />
          </div>
        </div>
        <div class="d-flex align-items-center" @click="showVer(visita)">
          <b-img :src="photo_perfil.photo" alt="foto de perfil" />
          <p class="pl-2">Cliente</p>
          <b-badge
            v-if="visita.status === 'scheduled'"
            variant="success"
            class="ml-2 px-2"
            ><small>Agendada</small></b-badge
          >
          <b-badge
            v-if="visita.status === 'start'"
            variant="warning"
            class="ml-2 px-2"
            ><small>Em execução</small></b-badge
          >
          <b-badge
            v-if="visita.status === 'canceled'"
            variant="danger"
            class="ml-2 px-2"
            >Cancelada</b-badge
          >
          <b-badge
            v-if="visita.status === 'finished'"
            variant="info"
            class="ml-2 px-2"
            >Finalizada</b-badge
          >
          <b-badge
            v-if="visita.status === 'pause'"
            variant="warning"
            class="ml-2 px-2"
            >Em pausa</b-badge
          >
        </div>
        <span class="gray-40">
          {{ visita.date_of_visit }}
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
import Vue2Filters from 'vue2-filters';
import Timer from './Timer.vue';
import Viewing from '~/components/tasks/visits/Viewing.vue';
export default {
  name: 'Listing',
  components: { Viewing, Timer },
  filters: {
    truncate(data) {
      const search = 'pessoa f';
      if (data.match(search)) {
        const str = data.split(' ');
        return str[0];
      } else {
        const str = data.replace('pessoa pj', '');
        return str + ' PJ';
      }
    },
  },
  mixins: [Vue2Filters.mixin],
  props: {
    visitsData: {
      type: Array,
      default: null,
    },
    watching: {
      type: String,
      default: null,
    },
  },
  emits: ['timerFinish'],
  data() {
    return {
      id: null,
      stop: false,
      intervalList: [],
      tasksData: [],
      coordenadas: [],
      center: [1, 2],
      latitude: null,
      longitude: null,
      start: true,
      sec: 0,
      min: 0,
      hour: 0,
      timer: null,
      pause: false,
      photo_perfil: { photo: require('~/assets/img/icones/icone-perfil.svg') },
    };
  },
  computed: {
    filteredList() {
      /* eslint-disable */
      return this.visitsData.filter((t) => {
        if (t.task != null) {
          return t;
        }
      });
    },
  },
  methods: {
    async showVer(visita) {
      this.id = visita.id;
      this.$nextTick(function () {
        this.$bvModal.show(`view-visit-${this.id}`);
      });
      this.visita_selecionada = visita;
      const tasks = await this.$axios.get('tasks/' + visita.task_id);
      this.tasksData = tasks.data;
      const coordenadas = await this.$axios.get(
        'customers/get-coordinates/' + this.tasksData.customer_id,
      );
      this.coordenadas = coordenadas.data;
      this.latitude = this.coordenadas.latitude;
      this.longitude = this.coordenadas.longitude;
      this.center = [this.latitude, this.longitude];
    },
    /* activeTimer() {
      if(this.start === true){
        console.log('drop');
      }
    } */
  },
};
</script>

<style lang="scss" scoped>
section {
  height: 25rem;
  background: var(--gray-10);
  box-shadow: 0px 4px 4px rgba(0, 71, 187, 0.06);

  p {
    font-weight: 600;
    font-size: 12px;
  }

  h2,
  h3 {
    font-weight: 600;
    font-size: 0.75rem;
  }

  ul {
    height: 18.75rem;
    overflow: auto;

    li {
      display: grid;
      grid-template-columns: 3fr 1fr;

      span {
        align-self: center;
        justify-self: end;
      }

      .ajuste {
        padding-left: 0.5rem;
      }

      .red {
        background: var(--red-50);
      }
      .yellow {
        background: yellow;
      }
      .green {
        background: green;
      }
    }
  }

  .card-servico {
    border-top: 0.5px solid var(--gray-20);
  }
}

@media screen and (max-width: 991px) {
  section {
    height: 70vh;

    ul {
      height: 50vh;
      li {
        .ajuste {
          padding-left: 0rem;
        }
      }
    }
  }
}
</style>
