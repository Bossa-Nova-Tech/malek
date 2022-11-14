<template>
  <section class="rounded">
    <h1 class="p-4">Acontecendo hoje</h1>
    <ul>
      <li
        class="card-servico p-4"
        v-for="(visita, index) in visitsData"
        :key="index"
      >
        <div class="d-flex pb-3" @click="showVer(itemVisita)">
          <div class="ajuste">
            <h2 class="primary-80 pb-1">
              # {{ visita.id }} {{ visita.services }}
            </h2>
            <p class="gray-40">{{ visita.colaborator }}</p>
          </div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <div class="d-flex mb-2">
            <img
              v-if="pause === true"
              src="~/assets/img/icones/pause-icon.svg"
              class="mr-3"
              role="button"
              width="22"
              height="24"
              @click="pauseService(itemVisita)"
            />
            <img
              v-if="start === true"
              src="~/assets/img/icones/play-icon.svg"
              role="button"
              class="mr-3"
              width="22"
              height="24"
              @click="playService(itemVisita)"
            />
            <img
              v-if="stop === true"
              src="~/assets/img/icones/stop-icon.svg"
              role="button"
              width="22"
              height="24"
              @click="stopService(itemVisita)"
            />
          </div>
        </div>
        <div class="d-flex align-items-center" @click="showVer(itemVisita)">
          <b-img :src="photo_perfil.photo" alt="foto de perfil" />
          <p class="pl-2">Cliente</p>
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

export default {
  name: 'Listing',
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
    tasksData: {
      type: Array,
      default: null,
    },
    watching: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      id: null,
      stop: false,
      visitsData: [
        {
          colaborator: 'Vanessa Gonçalves',
          date_of_visit: '02/06/2023',
          services: 'Limpeza de equipamento',
          id: 1,
        },
      ],
      start: true,
      stopwatchRunning: false,
      timeIsSeconds: 0,
      stopwatch: 0,
      pause: false,
      photo_perfil: { photo: require('~/assets/img/icones/icone-perfil.svg') },
    };
  },
  methods: {
    playService() {
      if (this.start === true) {
        this.start = !this.start;
        this.stop = !this.stop;
        this.pause = !this.pause;
        this.stopwatchRunning = true;
        this.stopwatch = setInterval(() => {
          this.timeIsSeconds += 1;
        }, 1000);
      } else {
        this.start = true;
      }
    },
    stopService() {
      if (this.stop === true) {
        this.start = !this.start;
        this.stop = !this.stop;
        this.pause = !this.pause;
      } else {
        this.stop = !this.stop;
        this.stopwatchRunning = true;
        this.stopwatch = setInterval(() => {
          this.timeIsSeconds += 1;
        }, 1000);
      }
    },
    pauseService() {
      if (this.pause === true) {
        this.start = !this.start;
        this.stop = !this.stop;
        this.pause = !this.pause;
      } else {
        this.pause = true;
      }
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
