/**
 * Action Type
 */

// 添加一条数据
export const ADD = 'ADD'

// 删除一条数据
export const REMOVE_ITEM = 'REMOVE_ITEM'

// 根据排名排序
export const RANK_SORT = 'RANK_SORT'

// 标题排序
export const TITLE_SORT = 'TITLE_SORT'

// 描述排序
export const DESCRIPTION_SORT = 'DESCRIPTION_SORT'

export const removeItem = (id) => {
  return { type: REMOVE_ITEM, id }
}

export const add = () => {
  return { type: ADD }
}

export const rankSort = () => {
  return { type: RANK_SORT }
}

export const titleSort = () => {
  return { type: TITLE_SORT }
}

export const descriptionSort = () => {
  return { type: DESCRIPTION_SORT }
}
