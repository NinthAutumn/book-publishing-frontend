export const state = () => ({
  comments: []
})

export const getters = {

}


const filterParent = function (items, id = undefined) {
  return items.filter((item) => {
    return item.parent === id
  }).map((filteredItem) => ({ ...filteredItem,
    children: filterParent(items, filteredItem._id)
  }))
}


export const mutations = {
  GET_COMMENTS(state, comments) {
    const nestedParent = filterParent(comments)
    // const nested = nest(comments, filtered)
    // const nestC = nest(comments)
    state.comments = nestedParent
    console.log(state.comments)
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
    await this.$axios.get(process.env.baseUrl + '/comments/show?bookId=' + bookId + '&chapterIndex=' + chapterIndex).then(async (res) => {
      commit('GET_COMMENTS', res.data)
    })
  }
}
