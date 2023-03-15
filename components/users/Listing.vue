<template>
  <div class="w-100 mx-auto position-relative">
    <div class="d-flex align-items-center mb-2">
      <b-form-input
        v-model="search"
        placeholder="Pesquisar"
        class="ml-3"
      ></b-form-input>
      <img
        ref="dropdown"
        role="button"
        src="~/assets/img/icones/sliders.svg"
        class="mx-2"
        @click="isFiltered = !isFiltered"
      />
      <div
        v-if="!$screen.lg"
        class="icone-criar d-flex justify-content-center mr-3"
      >
        <b-img
          src="~/assets/img/icones/criar-4.svg"
          role="button"
          @click="$bvModal.show('criar-usuario')"
        />
      </div>
      <button v-if="$screen.lg" @click="$bvModal.show('criar-usuario')">
        Criar Usuário
      </button>
    </div>
    <b-container v-if="isFiltered">
      <b-row class="mx-0 p-2 border rounded mb-3">
        <span class="h5 ml-3 mb-3">Filtre sua busca:</span>
        <b-col cols="10">
          <b-form-radio-group
            v-model="selected"
            :options="options"
            :unchecked-value="null"
          ></b-form-radio-group>
        </b-col>
        <b-col cols="2">
          <b-img
            v-b-tooltip.hover
            title="Limpar filtro"
            src="~/assets/img/icones/delete-icon.svg"
            role="button"
            @click="cleanFilter"
          />
        </b-col>
      </b-row>
    </b-container>
    <section class="rounded w-100">
      <h1 class="p-4">Usuários</h1>
      <ul>
        <li
          v-for="user in filteredList"
          v-if="$auth.user.email !== user.email"
          :key="user.id"
          class="card-cliente p-4 d-flex flex-column justify-content-center"
        >
          <div>
            <b-row class="align-items-center">
              <b-col cols="9" role="button" @click="showVer(user)">
                <div class="d-flex align-items-center">
                  <b-img
                    v-if="user.photo_url"
                    :src="user.photo_url"
                    class="foto-usuario"
                  />
                  <div class="pl-3">
                    <p>{{ user.name }}</p>
                    <p>{{ user.city }}</p>
                  </div>
                </div>
              </b-col>
              <b-col cols="3">
                <img
                  src="~/assets/img/icones/edit-icon.svg"
                  alt="botão para acessar o modal de edição de cliente"
                  role="button"
                  @click="showEditar(user)"
                />
                <img
                  src="~/assets/img/icones/delete-icon.svg"
                  role="button"
                  alt="botão para deletar cliente"
                  @click="showExcluir(user)"
                />
              </b-col>
            </b-row>
          </div>
          <Edit :watching="id" :user-list="user" />
          <Viewing :watching="id" :user-list="user" />
        </li>
        <Delete :id="id" />
      </ul>
    </section>
  </div>
</template>
<script>
import Delete from '~/components/users/Delete.vue';
import Edit from '~/components/users/Edit.vue';
import Viewing from '~/components/users/Viewing.vue';

export default {
  name: 'Listing',
  components: { Delete, Edit, Viewing },
  props: {
    users: {
      type: Array | Object,
      default: null,
    },
  },
  data() {
    return {
      selected: null,
      isFiltered: false,
      coordinates: [],
      options: [
        {
          text: 'CNPJ',
          value: 'pj',
        },
        {
          text: 'CPF',
          value: 'f',
        },
      ],
      id: null,
      search: '',
    };
  },
  computed: {
    filteredList() {
      let users = this.users.filter((user) => {
        return (
          user.name.toLowerCase().match(this.search.toLowerCase()) ||
          user.id.toString().match(this.search)
        );
      });

      users = users.filter((user) => {
        if (this.selected === null) {
          return user;
        }
        if (this.selected === 'pj') {
          return user.cpfCnpj.length === 18;
        } else {
          return user.cpfCnpj.length === 14;
        }
      });

      return users;
    },
  },

  methods: {
    showExcluir(user) {
      this.id = user.id;
      this.$nextTick(function () {
        this.$bvModal.show(`excluir-${this.id}`);
      });
      this.userList = user;
    },
    showEditar(user) {
      this.id = user.id;
      this.$nextTick(function () {
        this.$bvModal.show(`update-user-${this.id}`);
      });
      this.userList = user;
    },
    showVer(user) {
      this.id = user.id;
      this.$nextTick(function () {
        this.$bvModal.show(`view-user-${this.id}`);
      });
      this.userList = user;
    },
    cleanFilter() {
      this.search = '';
      this.selected = null;
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

  .foto-usuario {
    border-radius: 100%;
    max-width: 100px;
    max-height: 100px;
    height: 100px;
    width: 100px;
    object-fit: cover;
    object-position: center;
  }

  ul {
    height: 18.75rem;
    overflow: auto;

    li {
      /* display: grid; */
      height: 8rem;
      /* grid-template-columns: 3fr 1fr; */

      /* span {
        align-self: center;
        justify-self: end;
      } */
    }
  }

  .card-cliente {
    border-top: 0.5px solid var(--gray-20);
  }
}

@media screen and (max-width: 991px) {
  .icone-criar {
    animation: criar 1.5s ease-in-out;
  }

  @keyframes criar {
    0% {
      scale: 0;
    }

    50% {
      scale: 1.2;
    }

    100% {
      transform: rotate(1deg);
      scale: 1;
    }
  }

  section {
    height: 67vh;

    ul {
      height: 45vh;
    }
  }
}
</style>
