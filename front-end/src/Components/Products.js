import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
// import { material-ui components } from "@material-ui/core";

export const Products = () => {
  // functions
  return (
    <div>
      <h1>YOU FOUND PRODUCTS</h1>
      <Link to="/">
        <Button>HOME</Button>
      </Link>
    </div>
  );
};
