<template>
  <div>
    <div>
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
        @click="stopTimer"
      />
    </div>
    <b-modal
      :id="'visitFinished-' + visitId"
      :ref="'visitFinished'"
      centered
      hide-footer
      hide-header
      no-close-on-backdrop
    >
      <div class="view-modal mx-2">
        <div class="d-flex justify-content-between">
          <h1 class="mt-4 mb-2">Deseja finalizar a visita?</h1>
        </div>
        <b-button
          variant="primary"
          role="button"
          class="my-3"
          @click="signatureActive = !signatureActive"
          >Sim</b-button
        >
        <div v-if="signatureActive" class="my-3">
          <h2>Colete a assinatura do cliente:</h2>
          <signature :timer="duration" :id="visitId" :visita="visita" />
        </div>
        <b-button
          variant="outline-primary"
          role="button"
          class="my-3"
          @click="closeModal"
          >Não</b-button
        >
      </div>
    </b-modal>
    <div class="mt-2">
      <a class="timer">{{ zfill(hour) }}:{{ zfill(min) }}:{{ zfill(sec) }}</a>
    </div>
  </div>
</template>

<script>
import Signature from '~/components/tasks/visits/Signature.vue';
export default {
  components: { Signature },
  props: {
    visitId: {
      type: Number,
      default: null,
    },
    visita: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      signatureActive: false,
      stop: false,
      intervalList: [],
      start: true,
      sec: 0,
      min: 0,
      hour: 0,
      duration: null,
      timer: null,
      pause: false,
      visit: {
        status: 'scheduled',
        duration: null,
        date_visit: null,
        hour_visit: null,
        user_id: null,
      }
    };
  },
  methods: {
    zfill(number) {
      return number.toString().padStart(2, 0);
    },
    async play() {
      if (this.timer === null) {
        this.playing();
        this.start = false;
        this.stop = true;
        this.pause = true;
/*         temos que igualar dessa maneira pq na api estão como required */        this.visit.status = 'in_progress',
        this.visit.user_id = this.visita.user_id;
        this.visit.date_visit = this.visita.date_visit;
        this.visit.hour_visit =this.visita.hour_visit;
        this.timer = setInterval(() => this.playing(), 1000);
        await this.$axios.put(`tasks/visit/${this.visita.id}`, this.$data.visit);
      } else {
        clearInterval(this.timer);
        this.timer = null;
        this.start = true;
        this.pausee();
      }
    },

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
      /* this.intervalList.push(
        `${this.zfill(this.hour)}:${this.zfill(this.min)}:${this.zfill(
          this.sec,
        )}`,
      ); */
      console.log('timer paused');
    },

    async stopTimer() {
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.intervalList.push(
        `${this.zfill(this.hour)}:${this.zfill(this.min)}:${this.zfill(
          this.sec,
        )}`,
      );
      this.duration = this.intervalList[0];
      this.visit.status = 'finished'
      await this.$axios.put(`tasks/visit/${this.visita.id}`, this.$data.visit);
      this.$nextTick(function () {
        this.$bvModal.show(`visitFinished-${this.visitId}`);
      });
      this.start = true;
      console.log(this.intervalList);
      this.clearIntervalList();
    },

    clearIntervalList() {
      this.intervalList = [];
    },

    closeModal() {
      this.signatureActive = false;
      this.$nextTick(function () {
        this.$bvModal.hide(`visitFinished-${this.visitId}`);
      });
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
}
</style>
