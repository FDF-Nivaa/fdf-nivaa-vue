<template>
  <ul class="staff-list">
    <li
      v-for="person in processedStaff"
      :key="person.id"
      class="staff-list-item"
    >
      <StaffCard
        :staff-id="person.id"
        :label="person.label"
      />
    </li>
  </ul>
</template>

<script>
  import StaffCard from "./StaffCard"

  export default {
    name: 'StaffList',
    components: { StaffCard },
    props: {
      staff: {
        type: Array,
        required: true
      },
      primaryStaff: {
        type: Object,
        required: false
      }
    },
    computed: {
      primaryStaffId() {
        return this.primaryStaff && this.primaryStaff._id
      },
      combinedStaff() {
        if (this.primaryStaff) {
          return [
            this.primaryStaff,
            ...this.staff.filter(person => person._id !== this.primaryStaffId)
          ]
        }

        return this.staff
      },
      processedStaff() {
        return this.combinedStaff.map(person => ({
          id: person._id,
          label: person._id === this.primaryStaffId ? 'Kontaktperson' : undefined
        }))
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .staff-list {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, 20em);
    grid-gap: 1.5em;
    padding: 0;
    list-style: none;

    @media (max-width: $largePhone) {
      grid-template-columns: 1fr;
    }
    @media (max-width: $smallPhone) {
      font-size: .8125em;
    }
  }

  .staff-list-item {
    margin: 0;
  }

  .staff-card {
    width: 100%;

    @media (min-width: $largePhone) {
      max-width: 20em;
    }
  }
</style>
