<template>
  <nav class="main-navigation">
    <div class="main-navigation-inner">
      <nuxt-link
        class="main-navigation-logo-link"
        to="/"
      >
        <img
          alt="FDF Nivå"
          class="main-navigation-logo"
          src="/logo.svg"
        >
      </nuxt-link>
      <ul class="main-navigation-list">
        <li class="main-navigation-list-item">
          <nuxt-link
            class="main-navigation-link"
            to="/posts"
          >
            <MessageSquareIcon class="main-navigation-link-icon" />
            <span class="main-navigation-link-text">
              Opslag
            </span>
          </nuxt-link>
        </li>
        <li class="main-navigation-list-item">
          <nuxt-link
            class="main-navigation-link"
            to="/calendar"
          >
            <CalendarIcon class="main-navigation-link-icon" />
            <span class="main-navigation-link-text">
              Kalender
            </span>
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
            Mød lederne
          </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {CalendarIcon, CompassIcon, MessageSquareIcon, RepeatIcon, UsersIcon} from 'vue-feather-icons'

  export default {
    components: { CalendarIcon, CompassIcon, MessageSquareIcon, RepeatIcon, UsersIcon }
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
    background: white;
  }

  .main-navigation-inner {
    display: flex;
    flex-direction: row;
    max-width: @maxContentWidth;
    margin: auto;
    padding: 0 1.25em;
  }

  .main-navigation-list {
    display: flex;
    flex-direction: row;
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
    --underline-scale: 0;

    position: relative;
    display: flex;
    vertical-align: middle;
    padding: 1em .5em;
    text-decoration: none;
    margin: 0;
    flex-direction: row;
    align-items: center;

    &:after {
      content: '';
      position: absolute;
      display: block;
      left: 25%;
      bottom: 1em;
      width: 50%;
      border-top: 0.125em solid @duskBlue;
      transition: all 0.2s ease-out;
      margin: 0 -0.25em;
      transform: scaleX(var(--underline-scale));
    }

    &.nuxt-link-exact-active {
      --underline-scale: 1;
    }

    @media (hover: hover) {
      &:hover {
        --underline-scale: 0.5;
      }
    }
  }

  .main-navigation-link-icon {
    display: block;
    font-size: 1.125em;
    width: 1em;
    height: 1em;
  }

  .main-navigation-link-text {
    display: block;
    margin-left: .5em;
    font-size: .8125em;
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
