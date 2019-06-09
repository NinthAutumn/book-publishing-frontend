const actions = {
  postReport: async function ({
    commit
  }, {
    report
  }) {
    const {
      data
    } = await this.$axios.post(`/report`, {
      report
    })
  },
}

export default actions;
