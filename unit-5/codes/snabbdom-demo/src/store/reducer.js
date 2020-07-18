import {
  REMOVE_ITEM,
  ADD,
  RANK_SORT,
  TITLE_SORT,
  DESCRIPTION_SORT,
} from './actions'
import mock from 'mockjs'

function create(rank) {
  return {
    id: mock.Random.guid(),
    rank: rank,
    title: mock.Random.title(1, 2),
    description: mock.Random.sentence(10, 20),
  }
}

const initState = {
  list: [create(1)],
  currentSort: 1,
}

export default (state = initState, action) => {
  if (action.type === REMOVE_ITEM) {
    state.list = state.list.filter((item) => item.id !== action.id)
    return { ...state }
  }

  if (action.type === ADD) {
    const rank = [...state.list].sort((a, b) => b.rank - a.rank)[0]
    state.list.push(create(rank.rank + 1))
    return { ...state }
  }

  if (action.type === RANK_SORT) {
    state.list.sort((a, b) => a.rank - b.rank)
    return { ...state }
  }

  if (action.type === TITLE_SORT) {
    state.list.sort((a, b) => a.title.charCodeAt() - b.title.charCodeAt())
    return { ...state }
  }

  if (action.type === DESCRIPTION_SORT) {
    state.list.sort(
      (a, b) => a.description.charCodeAt() - b.description.charCodeAt()
    )
    return { ...state }
  }

  return state
}
