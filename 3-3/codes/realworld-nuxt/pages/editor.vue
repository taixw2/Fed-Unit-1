<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <li v-for="(errorDetails, key) of errors" :key="key">
              <!--  as ResponseErrors['errors'] | null -->
              <span v-for="item in errorDetails" :key="item"> {{ key }} {{ item }} </span>
            </li>
          </ul>
          <form @submit.prevent.stop="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="tagInput"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keypress.enter="onEnter"
                />
                <div class="tag-list" style="margin-top: 10px;">
                  <span
                    v-for="item in tagList"
                    :key="item"
                    style="padding: 3px; background-color: #d5f1c4; margin: 0 3px; border-radius: 3px;"
                    @click="onRemove(item)"
                    >{{ item }}</span
                  >
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="submit">Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createArticle, getArticle, updateArticle } from '~/services'

export default Vue.extend({
  async asyncData({ params }) {
    if (!params.slug) {
      return {}
    }
    try {
      const response = await getArticle(params.slug)
      return {
        ...response.data.article,
      }
    } catch (error) {}
  },

  data() {
    return {
      slug: '',
      title: '',
      description: '',
      body: '',
      tagInput: '',
      tagList: [] as string[],
      errors: {},
    }
  },

  methods: {
    onEnter() {
      const input = this.tagInput
      this.tagInput = ''
      this.tagList = Array.from(new Set([...this.tagList, input]))
    },

    onRemove(item: string) {
      this.tagList = this.tagList.filter((tag) => tag !== item)
    },

    async onSubmit() {
      if (!this.title) {
        return
      }

      const service = this.slug ? updateArticle : createArticle

      try {
        const response = await service(
          {
            article: {
              title: this.title,
              description: this.description,
              body: this.body,
              tagList: this.tagList,
            },
          },
          this.slug
        )
        this.title = ''
        this.description = ''
        this.body = ''
        this.tagList = []
        this.$router.push({ name: 'article', params: { slug: response.data.article.slug } })
      } catch ({ response }) {
        this.errors = response?.data?.errors
      }
    },
  },
})
</script>
