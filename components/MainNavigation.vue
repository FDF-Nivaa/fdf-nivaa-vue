<template>
  <nav class="main-navigation">
    <ul class="main-navigation-list">
      <li class="main-navigation-list-item">
        <nuxt-link
          class="main-navigation-link main-navigation-logo-link"
          to="/"
        >
          <img
            alt="FDF Nivå"
            class="main-navigation-logo"
            src="/logo.svg"
          >
        </nuxt-link>
      </li>
      <li class="main-navigation-list-item">
        <nuxt-link
          class="main-navigation-link"
          to="/events"
        >
          <CompassIcon class="main-navigation-link-icon" />
          <span class="main-navigation-link-text">
            Aktuelle lejre & arrangementer
          </span>
        </nuxt-link>
      </li>
      <li class="main-navigation-list-item">
        <nuxt-link
          class="main-navigation-link"
          to="/repeated-events"
        >
          <RepeatIcon class="main-navigation-link-icon" />
          <span class="main-navigation-link-text">
           Gentagne lejre & arrangementer
          </span>
        </nuxt-link>
      </li>
      <li class="main-navigation-list-item">
        <nuxt-link
          class="main-navigation-link"
          to="/staff"
        >
          <UsersIcon class="main-navigation-link-icon" />
          <span class="main-navigation-link-text">
            Ledere & bestyrelse
          </span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  import {CompassIcon, RepeatIcon, UsersIcon} from 'vue-feather-icons'

  export default {
    components: { CompassIcon, RepeatIcon, UsersIcon }
  }
</script>

<style
  lang="less"
  scoped
>
  .main-navigation {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background: @duskBlue;
  }

  .main-navigation-list {
    display: flex;
    flex-direction: row;
    max-width: 50em;
    margin: 0 auto;
    list-style: none;
    align-items: stretch;
  }

  .main-navigation-list-item {
    display: flex;
    flex: 1 auto 0;
    margin: 0;
  }

  .main-navigation-link {
    vertical-align: middle;
    display: flex;
    color: white;
    padding: 1em 1.5em;
    text-decoration: none;
    margin: 0;
    flex-direction: row;
    align-items: center;

    @media (hover: hover) {
      &:hover {
        background: @nightBlue;
      }
    }
  }

  .main-navigation-link-icon {
    display: block;
    font-size: 2.5em;
    width: 1em;
    height: 1em;
  }
  .main-navigation-link-text {
    display: block;
    margin-left: 1em;
  }


  .main-navigation-logo-link {
    padding: 0;
    flex-grow: 1;
  }

  .main-navigation-logo {
    display: block;
    height: 4em;
  }
</style>
