<template>
  <article>
    <h1>Mød lederne</h1>
    <ContentList :items="staff">
      <template #default="{item: person}">
        <h2>
          <nuxt-link :to="'/staff/' + person._id">
            {{person.name}}
          </nuxt-link>
        </h2>
        <div v-html="person.description"></div>
      </template>
    </ContentList>
  </article>
</template>

<script>
  import {ChevronRightIcon} from 'vue-feather-icons'
  import ContentList from '../../components/ContentList'
  import FancyButton from "../../components/FancyButton"

  export default {
    components: {
      ChevronRightIcon, ContentList, FancyButton
    },
    computed: {
      staff() {
        return this.$store.getters['staff/getAll']()
      }
    },
    async fetch({ store }) {
      store.dispatch('clearError')
      await store.dispatch('staff/fetchAll')
    },
  }
</script>
