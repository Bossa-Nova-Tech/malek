<template>
  <main>
    <TheHeader> Clientes </TheHeader>
    <div class="container">
      <button v-b-modal.modal-lg class="my-5">Criar clientes</button>

      <b-modal id="modal-lg" size="lg" hide-footer hide-header>
        <h1>Criar / Editar Cliente</h1>
        <b-form-group class="mb-4">
          <label for="name">Nome <span class="requerido">*</span></label>
          <b-form-input name="name" type="text" placeholder="João" />
          <b-form-invalid-feedback>
            Preencha o campo acima
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="mb-4">
          <label for="cnpj">CPF / CNPJ <span class="requerido">*</span></label>
          <b-form-input name="cnpj" placeholder="00.000.000/000-00" />
        </b-form-group>

        <b-row>
          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="ddd">Telefone <span class="requerido">*</span></label>
              <b-form-input name="ddd" placeholder="(00)" />
            </b-form-group>
          </b-col>

          <b-col cols="8">
            <b-form-group class="mb-4">
              <label for="email">E-mail <span class="requerido">*</span></label>
              <b-form-input
                name="email"
                type="email"
                placeholder="email@gmail.com"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <BorderButton class="my-4">
          <b-form-file id="file" plain multiple></b-form-file>
          <label for="file" class="label text-center">Enviar Fotos</label>
        </BorderButton>

        <b-form-group class="mb-4">
          <label for="address">Endereço <span class="requerido">*</span></label>
          <b-form-input name="address" type="text" placeholder="-" />
          <b-form-invalid-feedback>
            Preencha o campo acima
          </b-form-invalid-feedback>
        </b-form-group>

        <b-row>
          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="cep">CEP <span class="requerido">*</span></label>
              <b-form-input name="cep" type="number" placeholder="000-00000" />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="district">Bairro</label>
              <b-form-input name="district" type="text" placeholder="-" />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="city">Cidade</label>
              <b-form-input name="city" type="text" placeholder="-" />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="state">Estado</label>
              <b-form-input name="state" type="text" placeholder="-" />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="number"
                >Número <span class="requerido">*</span></label
              >
              <b-form-input name="number" type="number" placeholder="000" />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="complement">Complemento</label>
              <b-form-input name="complement" type="text" placeholder="-" />
            </b-form-group>
          </b-col>
        </b-row>

        <button>Salvar</button>
      </b-modal>

      <section>
        <h1 class="p-4">Clientes</h1>
        <ul>
          <li>
            <p>UNIFEBE - Fundação Ed. de Brusque</p>
            <div>
              <a href=""
                ><img src="~/assets/img/icones/edit-icon.svg" alt=""
              /></a>
              <a href="">
                <img src="~/assets/img/icones/delete-icon.svg" alt=""
              /></a>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script>
import TheHeader from '~/components/layout/TheHeader.vue';
export default { components: { TheHeader } };
</script>

<style lang="scss" scoped>
main {
  section {
    height: 500px;
    background: #fff;

    li {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #000;
      a {
        margin-right: 20px;
      }
    }
  }
}
</style>
