<template>
  <div class="age-group-meta">
    <div
      v-if="ageGroup.minAge || ageGroup.maxAge"
      class="age-group-meta-section"
    >
      <component :is="headingTag" class="age-group-meta-heading"
        >Aldersgruppe</component
      >
      <p class="age-group-meta-content">
        <AgeGroupSpan :min="ageGroup.minAge" :max="ageGroup.maxAge" />
      </p>
    </div>
    <div v-if="ageGroup.meetingTime" class="age-group-meta-section">
      <component :is="headingTag" class="age-group-meta-heading"
        >Mødetid</component
      >
      <p class="age-group-meta-content">{{ ageGroup.meetingTime }}</p>
    </div>
  </div>
</template>

<script>
import AgeGroupSpan from './AgeGroupSpan'

export default {
  name: 'AgeGroupMeta',
  components: { AgeGroupSpan },
  props: {
    ageGroup: {
      type: Object,
      required: true,
    },
    headingSize: {
      type: Number,
      default: 2,
      validator: (headingSize) => headingSize > 0 && headingSize < 6,
    },
  },
  computed: {
    headingTag() {
      return `h${this.headingSize}`
    },
  },
}
</script>

<style lang="scss" scoped>
.age-group-meta {
  margin-bottom: 2em;
}

.age-group-meta-section,
.age-group-meta-heading,
.age-group-meta-content {
  display: inline-block;
}

.age-group-meta-heading,
.age-group-meta-content {
  margin: 0;
}

.age-group-meta-section {
  &:not(:first-child) {
    margin-left: 1em;
    padding-left: 1em;
    border-left: 1px solid $duskBlue;
  }
}

.age-group-meta-heading {
  font-size: 1em;
  font-family: inherit;
  font-weight: $fontWeightSemiBold;
}
.age-group-meta-content {
}
</style>
