export const state = () => {
  books: {}
}


export const getters = {
  isHighRated: (state) => {
   let goodBook = state.filter((book) => {
      book.rating > 4
    });
    return goodBook
  },
  isTrending: (state) => {
    
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
