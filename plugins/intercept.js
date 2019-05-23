import Cookies from 'js-cookie';

export default function ({
  store,
  $axios,
  app,
}) {
  $axios.onRequest(config => {
    config.headers['Access-Control-Allow-Origin'] = "*";
  })

}
