<template>
  <section class="rounded">
    <h1 class="p-4">Ordens atrasadas</h1>
    <ul>
      <li v-for="ordem in tasksData" :key="ordem.id" class="card-servico p-4">
        <div class="separador">
          <h2 class="primary-80 pb-4">{{ ordem.services }}</h2>

          <div class="posicao">
            <p v-if="$screen.lg" class="gray-40 pb-2">
              Ordem de serviço {{ ordem.id }}
            </p>
            <div class="d-flex align-items-center">
              <b-img :src="photo_perfil" alt="foto de perfil" />
              <p class="pl-2">Nome do Colaborador</p>
            </div>
          </div>

          <p class="gray-40">{{ ordem.name_customer }}</p>
        </div>

        <div class="d-flex flex-column align-items-end">
          <div class="d-flex mb-2">
            <img
              v-b-modal.modal-1
              src="~/assets/img/icones/edit-icon.svg"
              class="mr-3"
              width="22"
              height="24"
            />

            <img
              src="~/assets/img/icones/delete-icon.svg"
              role="button"
              width="22"
              height="24"
              @click="showModal(ordem)"
            />
            <Delete :ordem="ordem" />
          </div>

          <span class="gray-40">{{ ordem.estimated_time }} </span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import Delete from '~/components/tasks/Delete.vue';

export default {
  name: 'ListingPast',
  components: { Delete },
  props: {
    tasksData: {
      type: Array,
      default: null,
    },
  },

  async asyncData({ $axios }) {
    const tasks = await $axios.get('tasks');
    const tasksData = tasks.data;
    console.log('tasks :: ', tasks.data);
    return { tasksData };
  },

  data() {
    return {
      id: null,
      saved: false,
      formSend: false,
      formEditing: null,
      editing: false,
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
      formDataEdited: {
        need_signature: false,
        photo: [],
        estimated_time: null,
        end_date: null,
        note: null,
        name_customer: null,
        template: null,
        services: null,
        time_of_execution: null,
      },
      photo_perfil: [require('~/assets/img/icones/icone-perfil.svg')],
    };
  },

  methods: {
    showModal(ordem) {
      this.id = ordem.id;
      this.$bvModal.show(this.id);
      console.log(ordem.id + ' chamado');
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

  h2 {
    font-weight: 600;
    font-size: 0.75rem;
  }

  ul {
    height: 18.75rem;
    overflow: auto;

    li {
      display: grid;
      grid-template-columns: 2fr 1fr;

      .separador {
        display: grid;
        grid-template-columns: 1fr 1fr;
        .posicao {
          grid-column: 1;
          grid-row: 1 / 3;
        }
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
        display: grid;
        grid-template-columns: 1fr 1fr;

        .separador {
          display: grid;
          grid-template-columns: 1fr;
          .posicao {
            grid-row: 2;
          }
        }
      }
    }
  }
}
</style>
