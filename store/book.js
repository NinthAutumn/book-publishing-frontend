export const state = () => {
  books: {}
}


export const getters = {
  isGoodBook: (state) => {
    state.filter((book) => {
      book.rating > 4
    })
  }
}

export const actions = {
  addBook({
    commit
  }) {

  },
  editBook({
    commit
  }) {

  },
  deleteBook({
    commit
  }) {

  }
}

export const mutations = {
  add() {

  },
  show() {

  },
  edit() {

  },
  update() {

  },
  delete() {

  }

}
