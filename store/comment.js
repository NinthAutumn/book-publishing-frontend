export const state = () => ({
  comments: []
})

export const getters = {

}

const nest = (items, id = null) =>
  items
  .filter(item => item.parent === id)
  .map(item => ({ ...item,
    children: nest(items, item._id)
  }));

export const mutations = {
  GET_COMMENTS(state, comments) {

    console.log(comments)
    comments.filter(an)
    const nestedComments = nest(comments)
    console.log(nestedComments)
    state.comments = comments
  }

}

export const actions = {
  async getComments({
    commit
  }, {
    chapterIndex,
    bookId
  }) {
    // console.log(chapterIndex);
    await this.$axios.get(process.env.baseUrl + '/comments/show?bookId=' + bookId + '&chapterIndex=' + chapterIndex).then((res) => {
      commit('GET_COMMENTS', res.data)
    })
  }
}
