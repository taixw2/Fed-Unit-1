<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <aritcle-meta
          :slug="article.slug"
          :username="article.author.username"
          :bio="article.author.bio"
          :image="article.author.image"
          :date="article.createdAt"
          :favorites-count="article.favoritesCount"
          :follow-authoring="article.author.following"
          :follow-posting="article.favorited"
          :on-follow-author="onFollowAuthor"
          :on-follow-post="onFollowPost"
          :on-delete-post="onDeletePost"
        />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="col-md-12" v-html="content"></div>
      </div>
      <hr />

      <div class="article-actions">
        <aritcle-meta
          :slug="article.slug"
          :username="article.author.username"
          :bio="article.author.bio"
          :image="article.author.image"
          :date="article.createdAt"
          :favorites-count="article.favoritesCount"
          :follow-authoring="article.author.following"
          :follow-posting="article.favorited"
          :on-follow-author="onFollowAuthor"
          :on-follow-post="onFollowPost"
          :on-delete-post="onDeletePost"
        />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form v-if="$store.state.user.user" class="card comment-form" @submit.prevent="onSubmitComment">
            <div class="card-block">
              <textarea
                v-model="commentContent"
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="$store.state.user.user.image" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div v-for="comment in comments" :key="comment.id" class="card">
            <div class="card-block">
              <p class="card-text">
                {{ comment.body }}
              </p>
            </div>
            <div class="card-footer">
              <a href class="comment-author">
                <img :src="comment.author.image" class="comment-author-img" />
              </a>
              &nbsp;
              <a href class="comment-author">{{ comment.author.username }}</a>
              <span class="date-posted">{{ comment.updatedAt | dateFormat }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MarkdownIt from 'markdown-it'
import {
  Article,
  Comment,
  getArticle,
  getComments,
  addComments,
  unfavoriteArticle,
  favoriteArticle,
  unfollowUser,
  followUser,
  deleteArticle,
} from '~/services'
import AritcleMeta from '~/components/article-meta.vue'

const md = new MarkdownIt()

export default Vue.extend({
  components: {
    AritcleMeta,
  },

  async asyncData({ route }) {
    try {
      const [articleResponse, commentResponse] = await Promise.allSettled([
        getArticle(route.params.slug),
        getComments(route.params.slug),
      ])

      let article = {} as Article
      if (articleResponse.status === 'fulfilled') {
        article = articleResponse.value.data.article
      }

      let comments = {}
      if (commentResponse.status === 'fulfilled') {
        comments = commentResponse.value.data.comments
      }

      return {
        content: md.render(article.body),
        article,
        comments,
      }
    } catch ({ response }) {}
  },

  data() {
    return {
      commentContent: '',
      content: '',
      article: {
        title: '',
        slug: '',
        body: '',
        createdAt: '',
        updatedAt: '',
        tagList: [],
        description: '',
        author: {
          username: '',
          bio: '',
          image: '',
          following: false,
        },
        favorited: false,
        favoritesCount: 0,
      } as Article,
      comments: [] as Comment[],
    }
  },

  methods: {
    async onSubmitComment() {
      if (!this.commentContent.trim()) return
      try {
        const response = await addComments(this.$route.params.slug, {
          comment: {
            body: this.commentContent,
          },
        })
        this.comments.unshift(response.data.comment)
        this.commentContent = ''
      } catch (error) {}
    },

    async onFollowPost(following: boolean, slug: string) {
      const asyncTask = following ? unfavoriteArticle(slug) : favoriteArticle(slug)
      try {
        await asyncTask
        this.article.favorited = !this.article.favorited
        this.article.favorited ? this.article.favoritesCount++ : this.article.favoritesCount--
      } catch (error) {}
    },
    async onFollowAuthor(following: boolean, username: string) {
      const asyncTask = following ? unfollowUser(username) : followUser(username)
      try {
        await asyncTask
        this.article.author.following = !this.article.author.following
      } catch (error) {}
    },

    async onDeletePost(slug: string) {
      try {
        await deleteArticle(slug)
        this.$router.replace({
          name: 'home',
          query: { tab: 'personal', author: this.$store.state.user.user.username },
        })
      } catch (error) {}
    },
  },
})
</script>
