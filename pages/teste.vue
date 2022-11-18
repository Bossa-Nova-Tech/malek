<template>
  <div>
    <label for="title_photo">Adicionar foto e descrição</label>
    <b-form-file
      placeholder="Escolha uma foto ..."
      drop-placeholder="Solte uma foto aqui ..."
      @change="onFileChange"
    ></b-form-file>

    <b-form-group>
      <b-form-input
        id="title_photo"
        v-model="newTitle_photo"
        type="text"
        placeholder="Ex: Vazamento de ar em tubulação...."
      />
    </b-form-group>

    <b-button variant="primary" @click="save()">Salvar</b-button>

    <ul class="d-flex">
      <li
        v-for="(photoItem, index) in listPhotos"
        :key="photoItem.index"
        @remove="photoItem.splice(index, 1)"
      >
        <p>{{ photoItem.title_photo }}</p>
        <img :src="photoItem.photo" width="200" />
      </li>
    </ul>
    <pre>{{ listPhotos }}</pre>
    <pre>{{ urlImage }}</pre>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      urlImage: null,
      newTitle_photo: '',
      listPhotos: [],
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.urlImage = URL.createObjectURL(file);
    },
    save() {
      this.listPhotos.push({
        photo: this.urlImage,
        title_photo: this.newTitle_photo,
      });
      this.urlImage = '';
      this.newTitle_photo = '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
