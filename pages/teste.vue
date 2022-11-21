<template>
  <div>
    <div class="container">
      <div class="column is-12">
        <h3 class="title is-1">CEP</h3>
        <hr />
        <div v-if="cep" class="notification is-warning">
          <pre>{{ data }}</pre>
          <pre>{{ formdata }}</pre>
        </div>
        <input
          v-model="cep"
          type="text"
          placeholder="digite o cep aqui"
          @keyup="searchCep()"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      data: null,
      cep: null,
      formData: {
        address: null,
        district: null,
        city: null,
        state: null,
        number: null,
      },
    };
  },
  methods: {
    searchCep() {
      // eslint-disable-next-line eqeqeq
      if (this.cep.length == 8) {
        this.$axios
          .get(`https://viacep.com.br/ws/${this.cep}/json/`)
          .then(
            (response) =>
              (this.formData = {
                address: response.data.logradouro,
                district: response.data.bairro,
                city: response.data.localidade,
                state: response.data.uf,
              }),
          )
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>
