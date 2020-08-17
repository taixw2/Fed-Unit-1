<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ul class="error-messages">
            <li v-for="(details, key) in errors" :key="key">
              <span v-for="item in details" :key="item"> {{ key }} {{ item }} </span>
            </li>
          </ul>
          <form @submit.prevent="updateSetting">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="email" class="form-control form-control-lg" type="text" placeholder="Email" />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { updateUser } from '~/services'
export default Vue.extend({
  data() {
    return {
      ...this.$store.state.user.user,
      password: '',
      errors: {},
    }
  },

  methods: {
    async updateSetting() {
      try {
        const response = await updateUser({
          user: {
            email: this.email,
            username: this.username,
            image: this.image,
            bio: this.bio,
            password: this.password,
          },
        })
        this.$store.commit('user/updateUser', response.data.user)
        this.$router.replace({
          name: 'home',
          query: { tab: 'personal', author: this.$store.state.user.user.username },
        })
      } catch ({ response }) {
        this.errors = response?.data?.errors
      }
    },
  },
})
</script>
