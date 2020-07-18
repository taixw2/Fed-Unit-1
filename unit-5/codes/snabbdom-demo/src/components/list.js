import { h } from 'snabbdom/build/package/h'
import { connect } from '../store'
import { add, removeItem } from '../store/actions'

function ListItem({ key, title, rank, description, onRemove }) {
  return h(
    'li',
    {
      attrs: {
        key,
      },
      key,
      style: {
        background: 'rgb(41, 41, 41)',
        padding: '15px 20px',
        position: 'relative',
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        color: '#cecdb1',
        marginBottom: '10px',
        opacity: '0',
        delayed: { opacity: '1' },
        transition: 'all 2s'
      },
    },
    [
      h('span', { style: { width: '40px' } }, [rank]),
      h('span', { style: { flex: 10 } }, [title]),
      h('p', { style: { flex: 25, paddingRight: '60px' } }, [description]),
      h(
        'span',
        {
          on: {
            click: onRemove,
          },
          style: {
            position: 'absolute',
            right: '10px',
            top: '10px',
            color: '#a96969',
            cursor: 'pointer',
          },
        },
        ['x']
      ),
    ]
  )
}

const ListComponent = ({ list, dispatch }) => {
  function onRemoveItem(id) {
    return () => {
      dispatch(removeItem(id))
    }
  }

  return h(
    'ul#list',
    { style: { maxHeight: '760px', overflow: 'auto' } },
    list.map((item) =>
      ListItem({ ...item, key: item.id, onRemove: onRemoveItem(item.id) })
    )
  )
}

const mapStateToProps = (state) => ({ list: state.list })

export default connect(mapStateToProps)(ListComponent)
