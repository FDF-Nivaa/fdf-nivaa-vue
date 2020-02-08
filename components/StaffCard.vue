<template>
  <div class="staff-card">
    <template v-if="person">
      <div class="staff-card-details">
        <h3 class="staff-card-name">
          <NuxtLink :to="`/staff/${person._id}`">{{person.name}}</NuxtLink>
        </h3>
        <dl class="staff-card-contact">
          <template v-if="person.phone">
            <dt>
              <PhoneIcon />
            </dt>
            <dd><a :href="`tel:${person.phone}`">{{person.phone}}</a></dd>
          </template>
          <template v-if="person.email">
            <dt>
              <MailIcon />
            </dt>
            <dd><a :href="`mailto:${person.email}`">{{person.email}}</a></dd>
          </template>
        </dl>
      </div>
      <CockpitImage
        v-if="person.photo.path"
        :src="person.photo.path"
        class="staff-card-image"
      />
    </template>
    <LoadingAnimation v-else />
  </div>
</template>

<script>
  import CockpitImage from "./CockpitImage"
  import LoadingAnimation from "./LoadingAnimation"
  import {MailIcon, PhoneIcon} from 'vue-feather-icons'

  export default {
    name: 'StaffCard',
    components: { CockpitImage, LoadingAnimation, MailIcon, PhoneIcon },
    props: {
      staffId: {
        type: String,
        required: true
      }
    },
    computed: {
      person() {
        return this.$store.getters['staff/getById'](this.staffId)
      }
    },
    mounted() {
      if (!this.person) {
        this.$store.dispatch('staff/fetchById', this.staffId)
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .staff-card {
    display: inline-flex;
    background: mix($navigationBackgroundColor, $backgroundColor);
    box-shadow: $defaultBoxShadow;
    border-radius: $largeBorderRadius;
    overflow: hidden;
    flex-direction: row-reverse;
    margin-right: 1em;
  }

  .staff-card-details {
    padding: .75em 1.5em .75em 1em;
  }

  .staff-card-contact {
    display: grid;
    grid-template: 2em / 2.5em auto;
    font-size: .75em;
  }

  .staff-card-name {
    font-size: 1em;
    margin-top: 0;

    > a {
      color: inherit;
      text-decoration: none;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }
    }

  }

  .staff-card .staff-card-image {
    height: 5.75em;
    flex: 0 0 5.75em;
    object-fit: cover;
    border-radius: 0;
  }

</style>
