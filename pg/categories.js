const express = require("express");
const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await db("categories");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      message: "There was a server error fulfilling your request"
    });
  };
});

// why does it always return an empty array, even if id doesn't exist?
router.get("/:id", async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const category = await db("categories").where("category_id", id);
    res.status(200).json(category);

    // if (category) {
    // } else {
    //   res.status(404).json({
    //     message: `The category with ID ${id} could not be found`
    //   })
    // }
  } catch (err) {
    res.status(500).json({
      message: "There was a server error fulfilling your request"
    });
  };
});

// am i getting an error bc picture.data is supposed to be in binary form? --> idk what to do about that
router.post("/", async (req, res) => {
  // category_name, description, picture: { type: "Buffer", data: []}
  const newCategory = req.body;
  try {
    const post = await db("categories").insert(newCategory);
    if (post) {
      res.status(201).json(newCategory);
    } else {
      res.status(400).json({
        message: "Please provide all required fields" // obv terrible error message, fix this --> use Joi?
      })
    }
  } catch (err) {
    res.status(500).json({
      message: "There was a server error fulfilling your request"
    });
  };
});

router.put("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const changes = await db("categories").update(changes).where({
      id
    });

    if (changes) {
      res.status(200).json(changes)
    } else {
      res.status(400).json({
        message: `Category with ID ${id} does not exist`
      });
    };
  } catch (err) {
    res.status(500).json({
      message: "There was a server error fuliflling your request"
    });
  };
});

router.delete("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const deleteCategory = await db("categories").where({
      id
    }).del();

    if (deleteCategory) {
      res.status(200).json(deleteCategory)
    } else {
      res.status(404).json({
        message: `Category with ID ${id} does not exist`
      })
    }
  } catch (err) {
    res.status(500).json({
      message: "There was a server error fulfilling your request"
    });
  };
});

module.exports = router;