export const state = () => ({
  counter: 0,
  menuState: "menu-active",
  slidesPerView: 6.5,
  dropdownState: "dropdown-inactive"

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
  },
  DROPDOWN_STATE(state) {
    if (state.dropdownState !== "dropdown-active") {
      state.dropdownState = "dropdown-active"
    } else {
      state.dropdownState = "dropdown-inactive"
    }
  }
}


export const actions = {

}
