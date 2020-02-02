<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-content">
        <h2>Kom og vær med</h2>
        <p>
          Vi mødes hver tirsdag aften.
          <br>
          <nuxt-link to="/age-groups">Se mødetider for aldersgrupperne</nuxt-link>
        </p>

      </div>
      <div class="footer-content">
        <h2>Kontakt</h2>
        <p><a :href="`mailto:${config.email}`">{{config.email}}</a></p>
      </div>
      <div class="footer-content">
        <h2>Adresse</h2>
        <p><a
          :href="addressLink"
        >{{config.address.name}}
          <br>
          {{config.address.street}} {{config.address.streetNumber}}
          <br>
          {{config.address.zipCode}}
          {{config.address.city}}</a>
        </p>
      </div>
      <div class="footer-content some-links">
        <h2>Sociale medier</h2>
        <ul class="some-links-list">
          <li class="some-links-list-item">
            <a
              :href="config.facebookUrl"
              class="some-link"
              title="Besøg os på Facebook"
            >
              <FacebookIcon
              />
            </a>
          </li>
          <li class="some-links-list-item">
            <a
              :href="config.instagramUrl"
              class="some-link"
              :title="`Besøg os på Instagram`"
            >
              <InstagramIcon
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
  import {FacebookIcon, InstagramIcon} from 'vue-feather-icons'

  import config from '~/site.config'

  export default {
    name: 'SiteFooter',
    components: { FacebookIcon, InstagramIcon },
    data() {
      return { config }
    },
    computed: {
      addressLink() {
        return (
          `https://www.google.dk/maps/dir/''/${config.address.name},+${config.address.street}+${config.address.streetNumber},+${config.address.zipCode}+${config.address.city}`
        )
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .site-footer {
    position: relative;
    padding: 3rem 2.5rem 2.5rem;
    color: $backgroundColor;
    background: $duskBlue;

    h2,
    a {
      color: rgba(255, 255, 255, 0.85);
    }

    h2 {
      font-size: 1.2em;
      font-weight: $fontWeightSemiBold;
    }

    @media (max-width: $maxContentWidth) {
      padding: 2.5rem 1.5rem 2rem;
    }

    @media (max-width: 30em) {
      padding: 2.5rem 1rem 2rem;
    }
  }

  .footer-inner {
    margin: auto;
    max-width: $maxContentWidth;
    font-size: 0.8em;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .footer-content {
    flex-grow: 1;
    flex-basis: 10em;
    padding: 0 .5rem;
  }

  .some-links {
    @media (min-width: 40em) {
      text-align: right;
    }
  }

  .some-links-list {
    list-style: none;
    display: inline-block;
    white-space: nowrap;
    padding: 0;
  }

  .some-links-list-item {
    display: inline-block;
    margin: 0;
  }

  .some-link {
    display: inline-block;
    padding: 0.5em;

    &:last-child {
      margin-right: -0.5em;
    }
  }

  svg.feather {
    height: 2em;
  }
</style>
