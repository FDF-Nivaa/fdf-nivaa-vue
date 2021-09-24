<template>
  <article>
    <h1>Aldersgrupper</h1>
    <ContentList :items="ageGroups">
      <template #default="{ item: group }">
        <h2>
          <nuxt-link :to="'/age-groups/' + group._id">
            {{ group.title }}
          </nuxt-link>
        </h2>
        <AgeGroupMeta :age-group="group" :heading-size="3" />
        <p v-if="group.intro || group.description">
          <FancyButton :to="`/age-groups/${group._id}`"
            >Læs mere om {{ group.title }}
            <ChevronRightIcon />
          </FancyButton>
        </p>
      </template>
    </ContentList>
  </article>
</template>

<script>
import AgeGroupMeta from '../../components/AgeGroupMeta'
import { ChevronRightIcon } from 'vue-feather-icons'
import ContentList from '../../components/ContentList'
import FancyButton from '../../components/FancyButton'

export default {
  components: { AgeGroupMeta, ChevronRightIcon, ContentList, FancyButton },
  async fetch({ store }) {
    store.dispatch('clearError')
    await store.dispatch('age-groups/fetchAll')
  },
  computed: {
    ageGroups() {
      return this.$store.getters['age-groups/getAll']()
    },
  },
}
</script>
