<template>
  <div>
    <section v-for="(ordem, index) in tasksData" :key="ordem.id" class="mt-3">
      <div class="card-servico mb-4">
        <div class="d-flex justify-content-between pb-2">
          <h2 class="manutencao primary-80">
            #{{ ordem.id }}
            {{ ordem.services }}
          </h2>
          <p class="local gray-40">{{ ordem.name_customer }}</p>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <b-img :src="photo_perfil" alt="foto de perfil" />
            <span class="pl-3">{{ ordem.name }}</span>
          </div>
          <div>
            <!-- <span class="porcentagem primary-80">
                    {{ ordem.performance }}</span
                  > -->
            <span class="tempo gray-40">{{ ordem.estimated_time }} </span>
          </div>
        </div>
        <!-- modal-editar -->
        <b-modal
          v-if="formEditing === index"
          id="modal-1"
          title="BootstrapVue"
          hide-footer
          hide-header
        >
          <img src="~/assets/img/icones/seta-voltar-azul.svg" class="my-4" />
          <h1 class="mb-4">Editar Ordem de Serviço</h1>

          <div>
            <b-form-group
              label="Serviço"
              label-for="formDataEdited.template"
              class="mb-4"
            >
              <b-form-select
                :id="`form-edit-${index}`"
                v-model="formDataEdited.template"
                :options="optionsTemplate"
                :class="{ 'is-invalid': $v.formData.template.$error }"
              />
              <b-form-invalid-feedback>
                Selecione uma opção.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label="Categoria"
              label-for="formDataEdited.services"
              class="mb-4"
            >
              <b-form-select
                :id="`form-edit-${index}`"
                v-model="formDataEdited.services"
                :options="optionsServices"
                :class="{ 'is-invalid': $v.formData.services.$error }"
              />
              <b-form-invalid-feedback>
                Selecione uma opção.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label="Cliente"
              label-for="formDataEdited.name_customer"
              class="mb-4"
            >
              <b-form-select
                :id="`form-edit-${index}`"
                v-model="formDataEdited.name_customer"
                :options="optionsNameCustomer"
                :class="{
                  'is-invalid': $v.formData.name_customer.$error,
                }"
              />
              <b-form-invalid-feedback>
                Selecione uma opção.
              </b-form-invalid-feedback>
            </b-form-group>

            <BorderButton class="my-4">
              <b-form-file
                id="file"
                v-model="formDataEdited.photo"
                plain
                multiple
              ></b-form-file>
              <label for="file" class="label text-center">Enviar Fotos</label>
            </BorderButton>

            <b-form-group
              label="Duração média da tarefa"
              label-for="formData.estimated_time"
              class="mb-4"
            >
              <b-form-select
                :id="`form-edit-${index}`"
                v-model="formDataEdited.estimated_time"
                :options="optionsEstimatedTime"
              >
              </b-form-select>
            </b-form-group>

            <b-form-group
              label="Data prevista de conclusão"
              label-for="formDataEdited.end_date"
              class="mb-4"
            >
              <b-form-datepicker
                :id="`form-edit-${index}`"
                v-model="formDataEdited.end_date"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                direction="rtl"
                locale="pt"
                placeholder="00/00/2022"
                :class="{ 'is-invalid': $v.formData.end_date.$error }"
              />
              <b-form-invalid-feedback>
                Selecione uma opção.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label="Observação"
              label-for="formDataEdited.note"
              class="mb-4"
            >
              <b-form-input
                :id="`form-edit-${index}`"
                v-model="formDataEdited.note"
                placeholder="Esta tarefa consiste em..."
              >
              </b-form-input>
            </b-form-group>

            <button @click="save(index)">salvar</button>
          </div>
        </b-modal>

        <b-button
          v-b-modal.modal-1
          size="sm"
          variant="primary"
          class="mt-3"
          @click="setToEditing(index)"
        >
          Editar</b-button
        >

        <div>
          <b-button
            size="sm"
            variant="danger"
            class="mt-3"
            @click="$bvModal.show(excluir)"
          >
            Excluir</b-button
          >
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Listing',
};
</script>
