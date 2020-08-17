import { AxiosResponse } from 'axios'
import qs from 'qs'
import { request } from '~/plugins/request'

export interface User {
  email: string
  token: string
  username: string
  bio: string
  image?: string
}

interface Profile {
  username: string
  bio: string
  image: string
  following: boolean
}

interface Author {
  username: string
  bio: string
  image: string
  following: boolean
}

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
}

export interface MultipleArticles {
  articles: Article[]
  articlesCount: number
}

export interface Comment {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: Author
}

interface MultipleComments {
  comments: Comment[]
}

export interface ResponseErrors {
  errors: {
    [key: string]: string[]
  }
}

/**
 * Authentication
 */
interface RequestLoginData {
  user: { email: string; password: string }
}
export const login = (data: RequestLoginData): Promise<AxiosResponse<{ user: User }>> => {
  return request.post('/api/users/login', data)
}

/**
 * Registration
 */
interface RequestRegisterData {
  user: { email: string; password: string; username: string }
}
export const register = (data: RequestRegisterData): Promise<AxiosResponse<{ user: User }>> => {
  return request.post('/api/users', data)
}

/**
 * Get Current User
 */
export const getCurrentUser = (): Promise<AxiosResponse<{ user: User }>> => {
  return request.get('/api/user')
}

/**
 * Update User
 */
interface RequestUpdateUserData {
  user: { email: string; bio: string; image: string; password: string; username: string }
}
export const updateUser = (data: RequestUpdateUserData): Promise<AxiosResponse<{ user: User }>> => {
  return request.put('/api/user', data)
}

/**
 * Get Profile
 */
export const getProfile = (username: string): Promise<AxiosResponse<{ profile: Profile }>> => {
  return request.get('/api/profiles/' + username)
}

/**
 * Follow user
 */
export const followUser = (username: string): Promise<AxiosResponse<Profile>> => {
  return request.post('/api/profiles/' + username + '/follow')
}

/**
 * Unfollow user
 */
export const unfollowUser = (username: string): Promise<AxiosResponse<Profile>> => {
  return request.delete('/api/profiles/' + username + '/follow')
}

/**
 * List Articles
 */
interface RequestListArticlesData {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
}
export const listarticles = (data: RequestListArticlesData = {}): Promise<AxiosResponse<MultipleArticles>> => {
  const limit = data.limit ?? 20
  const offset = (data.offset ?? 0) * limit

  const queryString = qs.stringify({ ...data, limit, offset })
  return request.get('/api/articles?' + queryString)
}

/**
 * Feed Articles
 */
interface RequestFeedArticlesData {
  limit?: number
  offset?: number
}
export const feedarticles = (data: RequestFeedArticlesData): Promise<AxiosResponse<MultipleArticles>> => {
  const limit = data.limit ?? 20
  const offset = (data.offset ?? 0) * limit

  const queryString = qs.stringify({ ...data, limit, offset })

  return request.get('/api/articles/feed?' + queryString)
}

/**
 * Get Article
 */
export const getArticle = (slug: string): Promise<AxiosResponse<{ article: Article }>> => {
  return request.get('/api/articles/' + slug)
}

/**
 * Create Article
 */
interface RequestCreateArticleData {
  article: {
    title: string
    description: string
    body: string
    tagList?: string[]
  }
}
export const createArticle = (
  data: RequestCreateArticleData
): Promise<AxiosResponse<{ article: Article }>> => {
  return request.post('/api/articles', data)
}

/**
 * Update Article
 */
interface RequestUpdateArticleData {
  article: {
    title: string
  }
}
export const updateArticle = (
  data: RequestCreateArticleData,
  slug: string
): Promise<AxiosResponse<{ article: Article }>> => {
  return request.put('/api/articles/' + slug, data)
}

/**
 * Delete Article
 */
export const deleteArticle = (slug: string): Promise<AxiosResponse<Article>> => {
  return request.delete('/api/articles/' + slug)
}

/**
 * Add Comments to an Article
 */
interface RequestAddCommentsData {
  comment: {
    body: string
  }
}
export const addComments = (
  slug: string,
  data: RequestAddCommentsData
): Promise<AxiosResponse<{ comment: Comment }>> => {
  return request.post('/api/articles/' + slug + '/comments', data)
}

/**
 * Get Comments from an Article
 */
export const getComments = (slug: string): Promise<AxiosResponse<MultipleComments>> => {
  return request.get('/api/articles/' + slug + '/comments')
}

/**
 * Delete Comment
 */
export const deleteComments = (slug: string, id: string): Promise<AxiosResponse<Comment>> => {
  return request.delete(`/api/articles/${slug}/comments/${id}`)
}

/**
 * Favorite Article
 */
export const favoriteArticle = (slug: string): Promise<AxiosResponse<Article>> => {
  return request.post('/api/articles/' + slug + '/favorite')
}

/**
 * Unfavorite Article
 */
export const unfavoriteArticle = (slug: string): Promise<AxiosResponse<Article>> => {
  return request.delete('/api/articles/' + slug + '/favorite')
}

/**
 * Get Tags
 */
export const getTags = (): Promise<AxiosResponse<{ tags: string[] }>> => {
  return request.get('/api/tags')
}
