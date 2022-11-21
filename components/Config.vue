<template>
  <div>
    <svg
      role="button"
      width="29"
      height="30"
      viewBox="0 0 29 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="ml-3"
      v-b-modal.modal-1
    >
      <g clip-path="url(#clip0_918_22005)">
        <path
          d="M4.83325 25.875V17.4167M4.83325 12.5833V4.125M14.4999 25.875V15M14.4999 10.1667V4.125M24.1666 25.875V19.8333M24.1666 15V4.125M1.20825 17.4167H8.45825M10.8749 10.1667H18.1249M20.5416 19.8333H27.7916"
          stroke="#ffffff"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_918_22005">
          <rect
            width="29"
            height="29"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
    <b-modal id="modal-1" hide-footer hide-header centered>
      <div class="mx-4">
        <div class="d-flex justify-content-between">
          <h1 class="my-4">Configurações da conta</h1>
        </div>
        <label for="file">Logotipo</label>
        <BorderButton class="mb-4" v-if="formData.photo === null">
          <input
            id="file"
            type="file"
            accept=".png, .jpg"
            class="d-flex"
            @change="onFileChange"
          />
          <label v-if="formData.type == 'f'" for="file" class="text-center"
            >Enviar Foto</label
          >
          <label v-else for="file" class="text-center">Enviar Logotipo</label>
        </BorderButton>
        <div
          v-if="formData.photo"
          class="d-flex align-items-start justify-content-between"
        >
          <img :src="formData.photo" alt="" width="200" />
          <img
            src="~/assets/img/icones/delete-icon.svg"
            role="button"
            @click="excluiFoto"
            class="ml-2"
          />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      files: null,
      reader: null,
      vm: null,
      formData: {
        photo: null,
      },
    };
  },

  methods: {
    excluiFoto() {
      if (this.formData.photo) {
        this.formData = {
          photo: null,
        };
      }
    },
    onFileChange(e) {
      this.files = e.target.files || e.dataTransfer.files;
      if (!this.files.length) return;
      this.createImage(this.files[0]);
    },
    createImage(file) {
      this.reader = new FileReader();
      this.vm = this;

      this.reader.onload = (e) => {
        this.vm.formData.photo = e.target.result;
      };
      this.reader.readAsDataURL(file);
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
  },
};
</script>

<style></style>
