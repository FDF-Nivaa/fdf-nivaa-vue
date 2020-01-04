import CockpitApi from '~/apis/cockpit'

const cockpitApi = new CockpitApi()

export function createStore(internalName, publicName, publicNamePlural) {
  return {
    state() {
      return { list: [] }
    }, mutations: {
      setList(state, list) {
        state.list = list
      },
    }, actions: {
      async fetchAll({ commit }) {
        await cockpitApi.get(internalName)
          .then(response => {
            if (response.status === 200) {
              commit('setList', response.data.entries)
            } else {
              commit('setError', {
                statusCode: response.status,
                message: `Ingen ${publicNamePlural} fundet`
              }, { root: true })
            }
          }).catch((error) => {
            commit('setError', {
              statusCode: error.response.status,
              message: error.response.data.error
            }, { root: true })
          })
      },
    }
  }
}
