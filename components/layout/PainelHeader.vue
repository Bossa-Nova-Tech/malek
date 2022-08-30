<template>
  <div>
    <header>
      <div class="bg-separado"></div>

      <div class="titulo container">
        <img src="~/assets/img/logo-bg-white.png" alt="" width="140" />
        <div>
          <h1>Olá {{ $auth.user.name }},</h1>
          <p>Acompanhe por aqui o desempenho geral da sua empresa</p>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  padding-bottom: 3.125rem;
  .bg-separado {
    height: 6.25rem;
    background-image: url(~/assets/img/top-painel-adm.svg);
    background-repeat: no-repeat;
    background-size: cover;
  }
  img {
    position: relative;
    top: -30px;
    margin-right: 40px;
  }
  .titulo {
    display: flex;
    align-items: flex-end;
    div {
      padding-bottom: 30px;
      h1 {
        font-size: 34px;
        color: var(--gray-60);
        font-weight: 500;
        padding-bottom: 10px;
      }
      p {
        font-size: 16px;
      }
    }
  }
}
</style>
