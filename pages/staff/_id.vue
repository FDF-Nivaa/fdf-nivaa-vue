<template>
  <article>
    <h1>{{person.name}}</h1>
    <CockpitImage
      class="staff-photo"
      :src="person.photo.path"
      :format="CockpitImageFormat.ROUND"
      sizes="(min-width: 10rem) 10rem, 100vw"
    />
    <div v-html="person.description"></div>
    <p>Telefon: <a :href="`tel:${person.phone}`">{{person.phone}}</a></p>
    <p>E-mail: <a :href="`mailto:${person.email}`">{{person.email}}</a></p>
  </article>
</template>

<script>
  import CockpitImage, {CockpitImageFormat} from "../../components/CockpitImage"

  export default {
    components: { CockpitImage },
    data(params) {
      return { id: params.id, CockpitImageFormat }
    },
    computed: {
      person() {
        return this.$store.getters['staff/getById'](this.$route.params.id)
      }
    },
    async fetch({ params, store }) {
      store.dispatch('clearError')
      await store.dispatch('staff/fetchById', params.id)
    },
  }
</script>

<style scoped>
  .staff-photo {
    max-width: 10em;
  }
</style>
