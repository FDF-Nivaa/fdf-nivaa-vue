import CockpitApi from '~/apis/cockpit'

const cockpitApi = new CockpitApi()

export function createStore(internalName, publicName, publicNamePlural) {
  return {
    state() {
      return { list: [] }
    },
    getters: {
      getById: state => id => {
        return state.list.find(item => item._id === id)
      }
    },
    mutations: {
      setList(state, list) {
        state.list = list
      },
      setItem(state, item) {
        const oldItem = state.list.find(oItem => oItem._id === item._id)

        if (oldItem) {
          state.list.splice(state.list.indexOf(oldItem), 1, item)
        } else {
          state.list.push(item)
        }
      }
    },
    actions: {
      async fetchById({ commit }, id) {
        await cockpitApi.post(internalName, { filter: { _id: id } })
          .then(response => {
            if (response.status === 200) {
              commit('setItem', response.data.entries[0])
            } else {
              commit('setError', {
                statusCode: response.status,
                message: `Det valgte ${publicName} blev ikke fundet`
              }, { root: true })
            }
          }).catch((error) => {
            commit('setError', {
              statusCode: error.response.status,
              message: error.response.data.error
            }, { root: true })
          })
      },
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
      }
      ,
    }
  }
}
