<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">realworld</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="$store.state.user.user" class="nav-item">
                <nuxt-link
                  :replace="true"
                  :to="{ query: { tab: 'personal', author: $store.state.user.user.username } }"
                  :class="{ active: tab === 'personal' && !tag }"
                  class="nav-link"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  :replace="true"
                  :to="{ query: { tab: 'all' } }"
                  :class="{ active: tab === 'all' && !tag }"
                  class="nav-link"
                  href
                  >Global Feed</nuxt-link
                >
              </li>
              <li v-if="tag" class="nav-item">
                <span class="nav-link active">#{{ tag }}</span>
              </li>
            </ul>
          </div>

          <div v-for="item in articles" :key="item.slug" class="article-preview">
            <div class="article-meta">
              <nuxt-link :to="{ name: 'profile', params: { username: item.author.username } }">
                <img :src="item.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{ name: 'profile', params: { username: item.author.username } }"
                  class="author"
                  >{{ item.author.username }}</nuxt-link
                >
                <span class="date">{{ item.updatedAt | dateFormat }}</span>
              </div>
              <button
                :disabled="!$store.state.user.user"
                :class="{ active: item.favorited }"
                class="btn btn-outline-primary btn-sm pull-xs-right"
                @click.stop="onFavorited(item)"
              >
                <i class="ion-heart"></i>
                {{ item.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{ name: 'article', params: { slug: item.slug } }" class="preview-link">
              <h1>{{ item.title }}</h1>
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

          <nav>
            <ul class="pagination">
              <li
                v-for="item in pagination.total"
                :key="item"
                :data-test="'page-link-' + (item + 1)"
                class="page-item"
              >
                <nuxt-link
                  :to="{ name: 'home', query: { offset: item, tab: tab, tag: tag } }"
                  class="page-link"
                >
                  {{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="item in tags"
                :key="item"
                :to="{ name: 'home', query: { tag: item } }"
                class="tag-pill tag-default"
              >
                {{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  listarticles,
  getTags,
  Article,
  MultipleArticles,
  favoriteArticle,
  unfavoriteArticle,
} from '~/services'

export default Vue.extend({
  name: 'Home',

  async asyncData({ query }) {
    const [articlesResponse, tagsResponse] = await Promise.allSettled([
      listarticles({
        offset: Number(query.offset),
        tag: query.tag as string,
        favorited: query.favorited as string,
        author: query.author as string,
      }),
      getTags(),
    ])

    let articles: MultipleArticles = {
      articles: [],
      articlesCount: 0,
    }
    if (articlesResponse.status === 'fulfilled') {
      articles = articlesResponse.value.data
    }

    let tags: string[] = []
    if (tagsResponse.status === 'fulfilled') {
      tags = tagsResponse.value.data.tags.filter((v) => v.trim()).filter((v) => v.charCodeAt(0) !== 8204)
    }

    const data = {
      ...articles,
      pagination: {
        pageIndex: query.offset,
        total: Math.floor(articles.articlesCount / 20),
      },
      tags,
      author: query.author,
      favorited: query.favorited,
      tag: query.tag,
      tab: query.tab ? query.tab : 'all',
    }

    console.log('Data -> query', query, data)
    return data
  },

  methods: {
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

  watchQuery: ['offset', 'tag', 'tab', 'favorited', 'author'],
})
</script>
