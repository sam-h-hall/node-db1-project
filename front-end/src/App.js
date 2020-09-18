import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Button } from "@material-ui/core";
import { Route, Switch, Link } from "react-router-dom";
import { Customers } from "./Components/Customers";
import { Home } from "./Components/Home";
import { Products } from "./Components/Products";

export const App = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((res) => {
        console.log("useEffect customer get", res);
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/customers">
          <Customers customers={customers} />
        </Route>
        <Route path="/products" component={Products} />
      </Switch>
    </>
  );
};
