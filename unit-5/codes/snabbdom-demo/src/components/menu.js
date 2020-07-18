import { h } from 'snabbdom/build/package/h'
import { connect } from '../store'
import { add, rankSort, titleSort, descriptionSort } from '../store/actions'

function SortItem({ onClick, text }) {
  return h(
    'span',
    {
      on: { click: onClick },
      style: {
        color: '#aaa',
        backgroundColor: '#292929',
        padding: '7px 15px',
        cursor: 'pointer',
      },
    },
    [text]
  )
}

function SortTools({ dispatch }) {
  return h('div', [
    h('span', { style: { paddingRight: '10px' } }, 'Sort By:'),
    SortItem({ text: 'Rank', onClick: () => dispatch(rankSort()) }),
    SortItem({ text: 'Title', onClick: () => dispatch(titleSort()) }),
    SortItem({
      text: 'Description',
      onClick: () => dispatch(descriptionSort()),
    }),
  ])
}

function AddButton({ dispatch }) {
  return h(
    'button',
    {
      on: {
        click: () => dispatch(add()),
      },
      style: {
        color: '#aaa',
        backgroundColor: '#292929',
        padding: '7px 15px',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        borderRadius: 'none',
      },
    },
    ['Add']
  )
}

export default () =>
  h(
    'div#menu',
    {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#cecdb1',
        fontSize: '20px',
        height: '60px',
      },
    },
    [connect()(SortTools)(), connect()(AddButton)()]
  )
