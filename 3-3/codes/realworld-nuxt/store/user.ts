import cookie from 'js-cookie'
import { User, getCurrentUser } from '~/services'

export const state = () => ({
  user: null,
})

export const mutations = {
  updateUser(state: { user: User }, user: User) {
    cookie.set('user', JSON.stringify(user))
    state.user = user
  },
}

export const actions = {
  async getCurrentUser({ commit }: any) {
    try {
      const response = await getCurrentUser()
      commit('updateUser', response.data.user)
    } catch (error) {
      console.log('getCurrentUser -> error', error)
    }
  },
}
