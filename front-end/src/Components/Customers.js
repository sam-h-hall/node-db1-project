import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  SvgIcon,
  Typography,
} from "@material-ui/core";

export const Customers = () => {
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

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          padding: "0 20px",
        }}>
        <h1>YOU FOUND CUSTOMERS</h1>
        <Link
          to="/"
          style={{
            borderRadius: "5px",
            padding: "0px",
            height: "40px",
            textAlign: "center",
            alignSelf: "center",
          }}>
          <HomeIcon style={{ color: "white" }} alt="home" />
        </Link>
      </div>
      <div
        className="customer-cards"
        style={{
          display: "flex",
          flexFlow: "row wrap",
          width: "60%",
          margin: "0 auto",
        }}>
        {customers.map((c) => (
          <Card
            key={c["customer_id"]}
            style={{
              width: "500px",
              height: "600px",
              margin: "0 auto",
              marginBottom: "30px",
            }}>
            <CardHeader
              title={c["company_name"]}
              subheader={`${c["contact_name"]}, ${c["contact_title"]}`}
            />
            <CardContent>
              <Typography variant="body1" color="textSecondary">
                Address:{" "}
              </Typography>
              <Typography
                variant="body2"
                color="textPrimary">{`${c["address"]}, ${c["city"]}, ${c["country"]} ${c["postal_code"]}`}</Typography>
              <br />
              <Typography variant="body1" color="textSecondary">
                Phone:{" "}
              </Typography>
              <Typography
                variant="body2"
                color="textPrimary">{`${c["phone"]}`}</Typography>
              <br />
              <Typography variant="body1" color="textSecondary">
                Fax:{" "}
              </Typography>
              {c["fax"] ? (
                <Typography
                  variant="body2"
                  color="textPrimary">{`${c["fax"]}`}</Typography>
              ) : (
                <Typography variant="body2" color="textPrimary">
                  n/a
                </Typography>
              )}
            </CardContent>
            {/* EDIT AND DELETE BUTTON  --> change card to form when edit is selected */}
          </Card>
        ))}
      </div>
    </div>
  );
};
