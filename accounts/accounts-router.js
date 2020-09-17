const express = require("express");
const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({
      message: "There was a server error fulfilling your request"
    });
  };
});

router.get("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const account = await db("accounts").where("id", id);
    res.status(200).json(account)
  } catch (err) {
    res.status(500).json({
      message: "There was a server error fulfilling your request"
    });
  };
});

// would like to add some validation, maybe use Joi for more exact error messages
router.post("/", async (req, res) => {
  const newAcc = req.body
  try {
    const post = await db("accounts").insert(newAcc);

    if (post) {
      res.status(201).json(newAcc);
    } else {
      res.status(500).json({
        message: "There was a server error fulfilling your request"
      })
    }
  } catch (err) {
    res.status(400).json({
      message: "Please provide 'name' and 'budget' for new account"
    })
  }
})

router.delete("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const deleteAcc = await db("accounts").where({
      id
    }).del();

    if (deleteAcc) {
      res.status(200).json({
        message: `Account with ID ${id} has successfully been deleted`
      })
    } else {
      res.status(404).json({
        message: `ID ${id} is invalid`
      })
    }
  } catch (err) {
    res.status(500).json({
      message: "There was a server error fulfilling your request"
    })
  }
})

router.put("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  const changes = req.body;

  try {
    const edit = await db("accounts").update(changes).where({
      id
    });

    if (edit) {
      res.status(200).json({
        updatedAccount: changes
      });
    } else {
      res.status(400).json({
        message: "Please provide name and budget"
      });
    };
  } catch (err) {
    res.status(500).json({
      message: "There was a server error fulfilling your request"
    })
  }
})

module.exports = router;