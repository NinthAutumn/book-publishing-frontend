const axios = require('axios');


export default async () => {
  let routes = [];
  const instance = axios.create({
    baseURL: 'https://api.nobles.com',
  });
  try {
    const {
      data
    } = await axios.get('/api/book/show/all')
    for (let book in data) {
      routes.push(`/books/${book.id}`)
    }
    return routes
  } catch (error) {
    return routes
  }
}
