const axios = require('axios');


module.export = getAppRoutes = async () => {
  let routes = [];
  const instance = axios.create({
    baseURL: 'https://api.nobles.com',
  });
  const {
    data
  } = await axios.get('/book/show/all')
  data.forEach((book) => {
    routes.push(`/books/${book.id}`)
  })
  return routes
}
