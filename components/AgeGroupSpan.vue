<template>
  <span class="age-group-span">
    <template v-if="isSpan">
      {{minValue}}
      {{hasCommonUnit ? '' : minUnit}}
      -
      {{maxValue}}
      {{maxUnit}}
    </template>
    <template v-else>
      {{singleValue}}
    </template>
  </span>
</template>

<script>
  export default {
    props: {
      min: {
        type: String
      },
      max: {
        type: String
      }
    },
    computed: {
      isSpan() {
        return (this.min && this.max) && this.min !== this.max
      },
      singleValue() {
        return this.min || this.max
      },
      minSplit() {
        return this.min.split(' ')
      },
      maxSplit() {
        return this.max.split(' ')
      },
      minValue() {
        return this.minSplit[0]
      },
      maxValue() {
        return this.maxSplit[0]
      },
      minUnit() {
        return this.minSplit[1]
      },
      maxUnit() {
        return this.maxSplit[1]
      },
      hasCommonUnit() {
        return this.minUnit === this.maxUnit
      }
    }
  }
</script>
