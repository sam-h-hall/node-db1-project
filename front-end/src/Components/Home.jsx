import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export const Home = () => {
  // functions
  return (
    <div className="intro-container">
      <h1>DATABASE</h1>
      <div className="buttons">
        <Link to="/customers">
          <Button variant="contained" color="primary">
            CUSTOMERS
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="contained" color="primary">
            PRODUCTS
          </Button>
        </Link>
        <Button variant="contained" color="primary">
          SOMETHING
        </Button>
        <Button variant="contained" color="primary">
          SOMETHING
        </Button>
      </div>
    </div>
  );
};
