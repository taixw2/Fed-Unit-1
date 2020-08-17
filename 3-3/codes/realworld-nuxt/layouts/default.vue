<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" :to="{ name: 'home' }">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link exact="" :to="{ name: 'home' }" class="nav-link">Home</nuxt-link>
          </li>
          <li v-if="$store.state.user.user" class="nav-item">
            <nuxt-link to="/editor" class="nav-link"> <i class="ion-compose"></i>&nbsp;New Post </nuxt-link>
          </li>
          <li v-if="$store.state.user.user" class="nav-item">
            <nuxt-link to="/settings" class="nav-link"> <i class="ion-gear-a"></i>&nbsp;Settings </nuxt-link>
          </li>
          <li v-if="$store.state.user.user" class="nav-item">
            <nuxt-link
              :to="{ name: 'profile', params: { username: $store.state.user.user.username } }"
              class="nav-link"
            >
              <img :src="$store.state.user.user.image" class="user-pic" />
              {{ $store.state.user.user.username }}
            </nuxt-link>
          </li>
          <li v-if="!$store.state.user.user" class="nav-item">
            <nuxt-link to="/login" class="nav-link">Sign in</nuxt-link>
          </li>
          <li v-if="!$store.state.user.user" class="nav-item">
            <nuxt-link to="/register" class="nav-link">Sign up</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    <Nuxt />
    <footer>
      <div class="container">
        <nuxt-link :to="{ name: 'home' }" class="logo-font">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
