export const state = () => ({
  error: { message: '', statusCode: 0 }
})

export const getters = {
  getError: state => () => {
    return state.error
  }
}

export const mutations = {
  setError(state, error) {
    state.error = error
  }
}

export const actions = {
  clearError({ commit }) {
    commit('setError', { statusCode: 0, messsage: '' })
  },
}
