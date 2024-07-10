import React from "react";
import { useState, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './styles/app.css'

import Transaction from './component/Transaction'
import Form from "./component/FormComponent";
import DataContext from "./assets/data/dataContext";
import Report from './component/Report'

const design = {
  color: "rgb(6, 210, 146)",
  textAlign: "center",
  fontSize: "30px",
  margin: "0 0 10px 0",
};
const Title = () => <h1 style={design}>App income - expenses</h1>;

function RecordFinancial() {
  const initData = [
    { id: 1, title: "salary", amount: 20000 },
    { id: 3, title: "medical treatment fee", amount: -2000 },
    { id: 4, title: "food cat", amount: -3000 },
  ];

  const [items, setItems] = useState(initData);
  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  const onAddNewItem = (newItem) => {
    setItems((prevItem) => [newItem, ...prevItem]);
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  useEffect(() => {
    const amounts = items.map((items) => items.amount);
    const income = amounts.filter((element) => element > 0).reduce((total, element) => (total += element), 0);
    const expense = amounts.filter((element) => element < 0).reduce((total, element) => (total += element), 0) * -1;

    setReportIncome(income.toFixed(2));
    setReportExpense(expense.toFixed(2));
  }, [items]);

  const [showReport, setShowReport] = useState(true);
  const reducer = (state, action) => {
    switch (action.type) {
      case "SHOW":
        return setShowReport(true);
      case "HIDE":
        return setShowReport(false);
      default:
        return state;
    }
  };
  const [result, dispatch] = useReducer(reducer, setShowReport);

  return (
    <DataContext.Provider value={{ income: reportIncome, expense: reportExpense }}>
      <div className="container min-h-[525px]">
        <Title />
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li><Link to="/" className="w-full">Statement</Link></li>
              <li><Link to="/ledger" className="w-full">Ledger</Link></li>
            </ul>
            <Routes>
              <Route path="/" element={showReport && <Report />} />
              <Route path="/ledger" element={
                <section>
                  <Form onAddItem={onAddNewItem} />
                  <Transaction items={items} onDeleteItem={deleteItem} />
                </section>
              } />
            </Routes>
          </div>
        </Router>
      </div>
    </DataContext.Provider>
  );
}

export default RecordFinancial;
