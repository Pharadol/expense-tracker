import Item from './Item'
import '../styles/component/transaction.css'

const Transaction = (props) => {
  const { items, onDeleteItem } = props;
  return (
    <div>
      <ul className='item-list overflow-hidden'>
        {items.map((element) => <Item {...element} key={element.id} onDelete={() => onDeleteItem(element.id)} />)}
      </ul>
    </div>
  );
}

export default Transaction;
