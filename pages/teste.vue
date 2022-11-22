<template>
  <div>
    <h3>CEP</h3>
    <hr />
    <div>
      <pre>{{ formData }}</pre>
    </div>
    <input
      v-model="formData.cep"
      type="text"
      placeholder="digite o cep aqui"
      @keyup="searchCep()"
    />
    <input
      v-model="formData.address"
      type="text"
      placeholder="rua das flores"
    />
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      formData: {
        cep: null,
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
      if (this.formData.cep.length == 8) {
        this.$axios
          .get(`https://viacep.com.br/ws/${this.formData.cep}/json/`)
          .then(
            (response) =>
              (this.formData = {
                address: response.data.logradouro,
                district: response.data.bairro,
                city: response.data.localidade,
                state: response.data.uf,
                cep: response.data.cep,
              }),
          )
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>
