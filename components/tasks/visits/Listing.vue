<template>
  <section class="rounded">
    <h1 class="p-4">Acontecendo hoje</h1>
    <ul>
      <li
        v-for="(visita, index) in visitsData"
        :key="index"
        class="card-servico p-4"
      >
        <div class="d-flex pb-3" @click="showVer(visita)">
          <div class="ajuste">
            <a class="timer"
              >{{ zfill(hour) }}:{{ zfill(min) }}:{{ zfill(sec) }}</a
            >
            <h2 class="primary-80 pb-1">
              # {{ visita.id }} {{ visita.services }}
            </h2>
            <p class="gray-40">
              Quem irá atender: <strong>{{ visita.colaborator }}</strong>
            </p>
          </div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <div class="d-flex mb-2">
            <Viewing
              :coordenadas-data="coordenadasData"
              :visita-item="visita"
            />
            <img
              v-if="start === false"
              src="~/assets/img/icones/pause-icon.svg"
              class="mr-3"
              role="button"
              width="22"
              height="24"
              @click="play"
            />
            <img
              v-if="start === true"
              src="~/assets/img/icones/play-icon.svg"
              role="button"
              class="mr-3"
              width="22"
              height="24"
              @click="play"
            />
            <img
              v-if="stop === true"
              src="~/assets/img/icones/stop-icon.svg"
              role="button"
              width="22"
              height="24"
              @click="stopService(visita)"
            />
          </div>
        </div>
        <div class="d-flex align-items-center" @click="showVer(visita)">
          <b-img :src="photo_perfil.photo" alt="foto de perfil" />
          <p class="pl-2">Cliente</p>
          <b-badge
            class="ml-2 px-2"
            :class="{
              green: visita.status === 'Agendada',
              red: visita.status === 'Cancelada',
              yellow: visita.status === 'Em andamento',
            }"
            ><small>{{ visita.status }}</small></b-badge
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
import Viewing from '~/components/tasks/visits/Viewing.vue';
export default {
  name: 'Listing',
  components: { Viewing },
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
    /* visitsData: {
      type: Array,
      default: null,
    }, */
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

      /* !!!!!!!!!!!!!!!!!!!!!!!!!!! */
      /* Para conseguir fazer o comentário, comentatar o visitsData abaixo e descomentar o de cima ali nas props */

      visitsData: [
        {
          colaborator: 'Vanessa Gonçalves',
          date_of_visit: '02/06/2023',
          services: 'Limpeza de equipamento',
          status: 'Agendada',
        },
      ],
      intervalList: [],
      start: true,
      sec: 0,
      min: 0,
      hour: 0,
      timer: null,
      pause: false,
      photo_perfil: { photo: require('~/assets/img/icones/icone-perfil.svg') },
    };
  },
  methods: {
    showVer(visita) {
      this.id = visita.id;
      this.$nextTick(function () {
        this.$bvModal.show(`view-visit-${this.id}`);
      });
      this.visita_selecionada = visita;
    },

    zfill(number) {
      return number.toString().padStart(2, 0);
    },

    play() {
      if (this.timer === null) {
        this.playing();
        this.start = !this.start;
        this.stop = !this.stop;
        this.pause = !this.pause;
        this.timer = setInterval(() => this.playing(), 1000);
      } else {
        clearInterval(this.timer);
        this.timer = null;
        this.start = true;
        this.pausee();
      }
    },

    /*  playService() {
      if (this.start === true) {
        this.startVisit();
        this.start = !this.start;
        this.stop = !this.stop;
        this.pause = !this.pause;
      } else {
        this.start = true;
      }
    }, */

    playing() {
      this.sec++;
      if (this.sec >= 59) {
        this.sec = 0;
        this.min++;
      }
      if (this.min >= 59) {
        this.min = 0;
        this.hour++;
      }
    },
    pausee() {
      this.intervalList.push(
        `${this.zfill(this.hour)}:${this.zfill(this.min)}:${this.zfill(
          this.sec,
        )}`,
      );
      console.log(this.intervalList);
    },

    clear() {
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.sec = 0;
      this.min = 0;
      this.hour = 0;
      this.clearIntervalList();
    },
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
