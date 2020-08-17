<template>
  <div class="article-meta">
    <nuxt-link :to="'/profile/' + username">
      <img :src="image" :alt="username" />
    </nuxt-link>
    <div class="info">
      <a href class="author">{{ username }}</a>
      <span class="date">{{ date | dateFormat }}</span>
    </div>

    <template v-if="$store.state.user.user && $store.state.user.user.username === username">
      <nuxt-link :to="{ name: 'editor', params: { slug: slug } }" class="btn btn-outline-secondary btn-sm"
        ><i class="ion-edit"></i> Edit Article</nuxt-link
      >
      <button class="btn btn-outline-danger btn-sm" @click.stop="onDeletePost(slug)">
        <i class="ion-trash-a"></i>
        Delete Article
      </button>
    </template>
    <template v-else-if="$store.state.user.user">
      <button
        class="btn btn-sm btn-outline-secondary"
        @click.stop="onFollowAuthor(followAuthoring, username)"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{ followAuthoring ? 'Unf' : 'F' }}ollow {{ username }}
      </button>
      &nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: followPosting }"
        @click.stop="onFollowPost(followPosting, slug)"
      >
        <i class="ion-heart"></i>
        &nbsp; {{ followPosting ? 'Unf' : 'F' }}avorite Post
        <span class="counter">({{ favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { followUser, unfollowUser, unfavoriteArticle, favoriteArticle } from '~/services'
export default Vue.extend({
  props: {
    slug: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    favoritesCount: {
      type: Number,
      default: 0,
    },
    followAuthoring: Boolean,
    followPosting: Boolean,

    // method
    onFollowAuthor: {
      type: Function,
      default: () => null,
    },
    onFollowPost: {
      type: Function,
      default: () => null,
    },
    onDeletePost: {
      type: Function,
      default: () => null,
    },
  },
})
</script>
