import cookie from 'cookie'

export const actions = {
  async nuxtServerInit({ commit, dispatch }: any, { req }: any) {
    if (req.headers.cookie) {
      const cookies = cookie.parse(req.headers.cookie)

      if (cookies.user) {
        try {
          // 设置 token
          commit('user/updateUser', JSON.parse(cookies.user))

          // 更新用户数据
          await dispatch('user/getCurrentUser')
        } catch (error) {
          //
        }
      }
    }
  },
}
