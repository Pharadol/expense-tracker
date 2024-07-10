import { useContext } from "react";
import DataContext from "../assets/data/dataContext";
import '../styles/component/report.css'

const Report = () => {
  const { income, expense } = useContext(DataContext);
  const surplus = (income - expense).toFixed(2);

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <div>
      <div className="surplus-container">
        <h4 className="surplus">Surplus (baht) </h4>
        <h1 className="surplus"> ฿{formatNumber(surplus)}</h1>
      </div>
      <div className="con">
        <div className="report-container">
          <div>
            <h4>income</h4>
            <p className="report plus">฿{formatNumber(income)}</p>
          </div>
          <div>
            <h4>expense</h4>
            <p className="report minus">฿{formatNumber(expense)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
