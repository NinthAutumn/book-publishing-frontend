export const state = () => ({
  counter: 0,
  menuState: "menu-active",
  slidesPerView: 6.5
})

export const getters = {
  getMenuState(state) {
    return state.menuState
  }
}


export const mutations = {
  increment(state) {
    state.counter++
  },
  menuStateChange(state) {
    // console.log("dogss")
    if (state.menuState != "menu-active") {
      state.menuState = "menu-active";
      state.slidesPerView = 7
    } else {
      state.menuState = "menu-inactive";
      state.slidesPerView = 9
    }
    // console.log(state.menuState)
  }
}


export const actions = {

}
