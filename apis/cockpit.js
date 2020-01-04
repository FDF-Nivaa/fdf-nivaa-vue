const axios = require('axios')
import {cockpit as cockpitConfig} from '~/cockpit-config'

export function createCollectionUrl(collection) {
  return `${cockpitConfig.url}/api/collections/get/${collection}?token=${cockpitConfig.token}`
}

export default class CockpitApi {
  #axiosInstance = null

  get(collection, config) {
    return this.axiosInstance.get(createCollectionUrl(collection), config)
  }

  post(collection, data, config) {
    return this.axiosInstance.post(createCollectionUrl(collection), data, config)
  }

  get axiosInstance() {
    if (!this.#axiosInstance) {
      this.#axiosInstance = axios.create({
        baseURL: this.baseUrl,
      })
    }

    return this.#axiosInstance
  }
}
