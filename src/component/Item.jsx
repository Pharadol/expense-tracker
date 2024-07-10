import "../styles/component/item.css";
import PropTypes from "prop-types";

const Item = (props) => {
  const { title, amount, onDelete } = props;
  const status = amount < 0 ? "expense" : "income";
  const symbol = amount < 0 ? "-" : "+";
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <li className={`${status} group`}>
      {title}
      <div className="flex">
        <span className="money">
          {symbol}
          {formatNumber(Math.abs(amount))}
        </span>
        <button
          onClick={onDelete}
          className="delete-btn ml-2 hover:opacity-70 bg-red-500 text-white  px-3 cursor-pointer hidden group-hover:block rounded-sm "
        >
          delete
        </button>
      </div>
    </li>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Item;
