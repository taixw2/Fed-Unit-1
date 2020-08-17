<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ signType === 'login' ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="signType === 'login'" :to="{ name: 'register' }">Go to register?</nuxt-link>
            <nuxt-link v-else :to="{ name: 'login' }">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-for="(errorDetails, key) of errors" :key="key">
              <!--  as ResponseErrors['errors'] | null -->
              <span v-for="item in errorDetails" :key="item"> {{ key }} {{ item }} </span>
            </li>
          </ul>

          <form @submit="login">
            <fieldset v-if="signType === 'register'" class="form-group">
              <input
                v-model="username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
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
              {{ signType === 'login' ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { ResponseErrors, register, login } from '~/services'

export default Vue.extend({
  asyncData({ route }) {
    return {
      errors: {} as ResponseErrors['errors'],
      signType: route.name,
    }
  },

  data() {
    return {
      signType: '',
      errors: {},
      username: '',
      email: '',
      password: '',
    }
  },

  methods: {
    ...mapMutations({
      updateUser: 'user/updateUser',
    }),

    async login(e: Event) {
      e.preventDefault()
      if (this.signType === 'register' && !this.username.trim()) {
        this.errors = {
          username: ['is not allow empty'],
        }
        return
      }
      if (!this.email.trim()) {
        this.errors = {
          email: ['is not allow empty'],
        }
        return
      }
      if (!this.password.trim()) {
        this.errors = {
          password: ['is not allow empty'],
        }
        return
      }

      let service = null
      if (this.signType === 'register') {
        service = register
      } else {
        service = login
      }

      try {
        const response = await service({
          user: {
            username: this.username,
            password: this.password,
            email: this.email,
          },
        })

        this.updateUser(response.data.user)
        this.$router.replace({ name: 'home' })
      } catch ({ response }) {
        this.errors = response?.data?.errors
      }
    },
  },
})
</script>
