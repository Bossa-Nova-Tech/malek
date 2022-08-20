import Vue from 'vue';
export default function (
  { $axios, $nameTeste, $showName, redirect },
  context,
  $bvToast,
) {
  // console.log('teste no axios::', $nameTeste);
  // console.log('teste no função axios::', $showName('Pedro Santos'));

  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url);
  });

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);

    if (code === 400) {
      console.log('ERRO 400');
    }

    if (code === 401) {
      console.log('ERRO 401');
      const instance = new Vue({});
      instance.$bvToast.toast('Sua sessão expirou. Entre novamente!', {
        title: `Erro`,
        variant: 'danger',
        solid: true,
      });
      redirect('/login');
    }

    if (code === 422) {
      if (error.response.data?.status === 'false') {
        const instance = new Vue({});
        instance.$bvToast.toast(error.response.data.message, {
          title: `Erro`,
          variant: 'danger',
          solid: true,
        });
      }
    }

    if (code === 500) {
      const instance = new Vue({});
      instance.$bvToast.toast(
        'Houve algum problema na API. Favor contactar o suporte!',
        {
          title: `Erro`,
          variant: 'danger',
          solid: true,
        },
      );
    }
  });
}
