<template>
  <article>
    <h1>Aldersgrupper</h1>
    <ContentList :items="ageGroups">
      <template #default="{item: group}">
        <h2>
          <nuxt-link :to="'/age-groups/' + group._id">
            {{group.title}}
          </nuxt-link>
        </h2>
        <p v-if="group.age">{{group.age}}</p>
        <p v-if="group.intro || group.description">
          <FancyButton :to="`/age-groups/${group._id}`">Læs mere om {{group.title}}
            <ChevronRightIcon />
          </FancyButton>
        </p>
      </template>
    </ContentList>
  </article>
</template>

<script>
  import {ChevronRightIcon} from 'vue-feather-icons'
  import ContentList from "../../components/ContentList"
  import FancyButton from "../../components/FancyButton"

  export default {
    name: 'age-groups.index',
    components: { ChevronRightIcon, ContentList, FancyButton },
    computed: {
      ageGroups() {
        return this.$store.state['age-groups'].list
      }
    },
    async fetch({ store }) {
      store.dispatch('clearError')
      await store.dispatch('age-groups/fetchAll')
    },
  }
</script>
