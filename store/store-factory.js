import CockpitApi from '~/apis/cockpit'

const cockpitApi = new CockpitApi()

export function createStore(internalName, publicName, publicNamePlural) {
  return {
    state() {
      return { list: [], allFetchedOnce: false }
    },
    getters: {
      getAll: state => () => {
        return state.list
      },
      getById: state => id => {
        return state.list.find(item => item._id === id)
      },
      getByCustomId: state => id => {
        return state.list.find(item => item.id === id)
      },
      getBySlug: state => slug => {
        return state.list.find(item => item.slug === slug)
      }
    },
    mutations: {
      allFetchedOnce(state) {
        state.allFetchedOnce = true
      },
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
                source: 'Cockpit',
                statusCode: response.status,
                message: `Det valgte ${publicName} blev ikke fundet`
              }, { root: true })
            }
          }).catch((error) => {
            commit('setError', {
              source: 'Cockpit',
              statusCode: error.response.status,
              message: error.response.data.error
            }, { root: true })
          })
      },
      async fetchByCustomId({ commit }, id) {
        await cockpitApi.post(internalName, { filter: { id: id } })
          .then(response => {
            if (response.status === 200 && response.data.entries.length > 0) {
              commit('setItem', response.data.entries[0])
            } else {
              commit('setError', {
                source: 'Cockpit',
                statusCode: response.status,
                message: `Det valgte ${publicName} blev ikke fundet`
              }, { root: true })
            }
          }).catch((error) => {
            commit('setError', {
              source: 'Cockpit',
              statusCode: error.response.status,
              message: error.response.data.error
            }, { root: true })
          })
      },
      async fetchAllOnce({ dispatch, state }) {
        if (!state.allFetchedOnce) {
          dispatch('fetchAll')
        }
      },
      async fetchAll({ commit }) {
        commit('allFetchedOnce')

        await cockpitApi.get(internalName)
          .then(response => {
            if (response.status === 200) {
              commit('setList', response.data.entries)
            } else {
              commit('setError', {
                source: 'Cockpit',
                statusCode: response.status,
                message: `Ingen ${publicNamePlural} fundet`
              }, { root: true })
            }
          }).catch((error) => {
            commit('setError', {
              source: 'Cockpit',
              statusCode: error.response.status,
              message: error.response.data.error
            }, { root: true })
          })
      }
      ,
    }
  }
}
