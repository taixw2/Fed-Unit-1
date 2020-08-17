<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="image" class="user-img" />
            <h4>{{ username }}</h4>
            <p>
              {{ bio }}
            </p>
            <nuxt-link
              v-if="username === $store.state.user.user.username"
              to="/settings"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </nuxt-link>
            <button
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="onFollowUser(username)"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ following ? 'Unfollow' : 'follow' }} {{ username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link :to="{ query: { tab: 'my' } }" :class="{ active: tab === 'my' }" class="nav-link">
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  :to="{
                    query: { tab: 'favorited' },
                  }"
                  :class="{ active: tab === 'favorited' }"
                  class="nav-link"
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div v-for="item in articles" :key="item.id" class="article-preview">
            <div class="article-meta">
              <nuxt-link :to="{ params: { username: item.author.username } }">
                <img :src="item.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link :to="{ params: { username: item.author.username } }" class="author">{{
                  item.author.username
                }}</nuxt-link>
                <span class="date">{{ item.createdAt | dateFormat }}</span>
              </div>
              <button
                :class="{ active: item.favorited }"
                class="btn btn-outline-primary btn-sm pull-xs-right"
                @click.stop="onFavorited(item)"
              >
                <i class="ion-heart"></i> {{ item.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{ name: 'article', params: { slug: item.slug } }" class="preview-link">
              <h1>
                {{ item.title }}
              </h1>
              <p>{{ item.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li v-for="tag in item.tagList" :key="tag" class="tag-default tag-pill tag-outline">
                  {{ tag }}
                </li>
              </ul>
            </nuxt-link>
          </div>

          <div v-if="!articles.length" class="article-preview">
            No articles are here... yet.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getProfile,
  followUser,
  unfollowUser,
  listarticles,
  Article,
  favoriteArticle,
  unfavoriteArticle,
} from '~/services'
export default Vue.extend({
  name: 'Profile',

  async asyncData({ params, query, error }) {
    const username = params.username
    const isfavorited = query.tab === 'favorited'

    try {
      const [profileResponse, articlesResponse] = await Promise.allSettled([
        getProfile(encodeURIComponent(username)),
        listarticles({
          author: isfavorited ? undefined : username,
          favorited: isfavorited ? username : undefined,
        }),
      ])
      let profile = {}
      if (profileResponse.status === 'fulfilled') {
        profile = profileResponse.value.data.profile
      }

      let articles = {}
      if (articlesResponse.status === 'fulfilled') {
        articles = articlesResponse.value.data
      }

      return {
        ...profile,
        ...articles,
        tab: query.tab || 'my',
      }
    } catch ({ response }) {
      error({ message: response?.statusText ?? '服务器内部错误', statusCode: response?.status ?? 404 })
    }
  },

  data() {
    return {
      bio: '',
      articles: [],
      articlesCount: 0,
      following: false,
      image: '',
      username: '',
      tab: 'my',
    }
  },

  watchQuery: true,

  methods: {
    onFollowUser() {
      this.following = !this.following
      this.following ? followUser(this.username) : unfollowUser(this.username)
    },

    onFavorited(item: Article) {
      item.favorited = !item.favorited
      item.favorited ? item.favoritesCount++ : item.favoritesCount--

      if (item.favorited) {
        favoriteArticle(item.slug)
      } else {
        unfavoriteArticle(item.slug)
      }
    },
  },
})
</script>
