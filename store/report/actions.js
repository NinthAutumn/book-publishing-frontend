const actions = {
  postReport: async function ({
    commit
  }, {
    report
  }) {
    const {
      data
    } = await this.$axios.post(`/v2/report`, report)
  },
}

export default actions;
