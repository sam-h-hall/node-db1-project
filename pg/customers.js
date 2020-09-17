const express = require("express");
const db = require("../data/dbConfig.js");
const shortid = require("shortid");
const { as } = require("../data/dbConfig.js");
// shortid.generate();

const router = express.Router();

const serverErr = "There was a server error fulfilling your request";

router.get("/", async (req, res) => {
  try {
    const customers = await db("customers");
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({
      message: serverErr,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await db("customers").where("customer_id", id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(500).json({
        message: serverErr,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: `Customer with ID ${id} does not exist`,
    });
  }
});

// figure out how the db is generating its IDs, obviously they are the first couple letters of the first name and last name
router.post("/", async (req, res) => {
  const newCustomer = req.body;
  newCustomer["customer_id"] = shortid.generate();
  try {
    const postCustomer = await db("customers").insert(req.body);
    if (postCustomer) {
      res.status(201).json(newCustomer);
    } else {
      res.status(500).json({
        message: serverErr,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Please provide all required fields",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const update = await db("customers")
      .update(changes)
      .where("customer_id", id);
    if (update) {
      res.status(200).json(changes);
    } else {
      res.status(500).json({
        message: serverErr,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: `User with ID ${id} does not exist`,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCustomer = await db("customers").where("customer_id", id).del();
    if (deleteCustomer) {
      res.status(200).json({
        message: `Customer with ID ${id} has successfully been deleted`,
      });
    } else {
      res.status(404).json({
        message: `Customer with ID ${id} does not exist`,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: serverErr,
    });
  }
});

module.exports = router;
