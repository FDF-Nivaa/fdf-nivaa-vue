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
        >Aktuelle lejre & arrangementer
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          class="main-navigation-link"
          to="/repeated-events"
        >Gentagne lejre & arrangementer
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          class="main-navigation-link"
          to="/staff"
        >Ledere & bestyrelse
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="less">
  body {
    padding-top: 5em;
  }
  .main-navigation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
  }

  .main-navigation-list {
    max-width: 50em;
    list-style: none;
    display: flex;
    flex-direction: row;
  }

  .main-navigation-list-item {
    flex: 1 auto 0;
  }

  .main-navigation-link {
    vertical-align: middle;
    display: block;
    color: white;
    padding: 1em 1.5em;
  }

  .main-navigation-logo-link {
    padding: 0;
  }

  .main-navigation-logo {
    display: block;
    height: 3em;
  }
</style>
