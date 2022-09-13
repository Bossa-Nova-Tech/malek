<template>
  <div>
    <PainelHeader :tela="telaName" />
    <main class="container p-0">
      <PainelAside v-if="$screen.lg" />

      <div class="d-flex justify-content-center">
        <b-tabs pills class="mx-auto" align="center">
          <b-tab id="em-atraso" title="Em atraso" class="mt-4">
            <ListingPast :tasks-data="tasksData" />
          </b-tab>

          <b-tab id="hoje" title="Hoje" active class="mt-4">
            <Listing :tasks-data="tasksData" />
          </b-tab>

          <b-tab id="futuras" title="Futuras" class="mt-4">
            <ListingFuture :tasks-data="tasksData" />
          </b-tab>

          <Add />

          <div class="footer">
            <button class="" @click="$bvModal.show('criar')">
              Criar Ordem de Serviço
            </button>
          </div>
        </b-tabs>
      </div>
    </main>
  </div>
</template>

<script>
import PainelHeader from '~/components/layout/PainelHeader.vue';
import PainelAside from '~/components/layout/PainelAside.vue';
import Add from '~/components/tasks/Add.vue';
import Listing from '~/components/tasks/Listing.vue';
import ListingPast from '~/components/tasks/ListingPast.vue';
import ListingFuture from '~/components/tasks/ListingFuture.vue';

export default {
  components: {
    Add,
    Listing,
    ListingPast,
    ListingFuture,
    PainelHeader,
    PainelAside,
  },
  async asyncData({ $axios }) {
    const tasks = await $axios.get('tasks');
    const tasksData = tasks.data;
    console.log('tasks :: ', tasks.data);
    return { tasksData };
  },

  data: () => {
    return {
      telaName: 'Ordem de serviços',
      tasksData: [],
      formData: {
        need_signature: false,
        photo: [],
        estimated_time: null,
        end_date: null,
        note: null,
        name_customer: 'HAVAN Unidade 02',
        template: null,
        services: null,
        time_of_execution: '02h30',
      },
    };
  },

  head() {
    return {
      title: `Ordem de Serviços | ${process.env.title}`,
    };
  },

  methods: {
    setToEditing(index) {
      this.formEditing = index;
      setTimeout(() => {
        document.getElementById(`form-edit-${index}`).focus();
      }, 1);
      if (this.formDataEdited === null) {
        this.formDataEdited = this.formData;
      }
    },
    save(index) {
      this.saved = true;
      if (this.saved === true) {
        this.formData = this.formDataEdited;
      }
      console.log(this.formData);
      this.formEditing = !index;
      this.$root.$emit('bv::hide::modal', 'modal-1', index);
      this.formData = {
        services: null,
        name_customer: null,
        template: null,
        end_date: null,
        time_of_execution: null,
        estimated_time: null,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3fr;

  .footer {
    width: 100%;
    height: 6rem;
    background: var(--gray-10);
    padding: 1.5rem;
    position: inherit;
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.05);
  }
}

@media screen and (max-width: 991px) {
  main {
    grid-template-columns: 1fr;

    .footer {
      width: 100%;
      height: 6rem;
      background: var(--gray-10);
      padding: 1.5rem;
      position: fixed;
      bottom: 0;
      box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
