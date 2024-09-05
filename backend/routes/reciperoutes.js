// // backend/routes/reciperoutes.js
// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/upload"); // Import the upload middleware
// const recipeController = require("../controllers/recipecontroller");

// // Route to handle recipe creation with file uploads
// router.post(
//   "/recipes",
//   upload.fields([
//     { name: "mainImage", maxCount: 1 },
//     { name: "subImages", maxCount: 4 },
//     { name: "video", maxCount: 1 },
//   ]),
//   recipeController.createRecipe
// );

// // Other routes
// router.get("/by-chef", recipeController.getRecipesByChef);
// router.put("/:recipeId", recipeController.updateRecipe);
// router.delete("/:recipeId", recipeController.deleteRecipe);

// module.exports = router;
////////////okay up/////////

/////////////////////////////////////////////////////////////

// const express = require('express');
// const router = express.Router();
// const recipeController = require('../controllers/recipecontroller');

// // Route to handle recipe creation with file uploads
// router.post(
//   "/recipes",
//   upload.fields([
//     { name: "mainImage", maxCount: 1 },
//     { name: "subImages", maxCount: 4 },
//     { name: "video", maxCount: 1 },
//   ]),
//   recipeController.createRecipe
// );

// router.put(
//   "/recipes/:recipeId",
//   upload.fields([
//     { name: "mainImage", maxCount: 1 },
//     { name: "subImages", maxCount: 10 },
//     { name: "video", maxCount: 1 },
//   ]),
//   recipeController.updateRecipe
// );

// // Other routes
// router.get("/by-chef", recipeController.getRecipesByChef);
// router.put("/:recipeId", recipeController.updateRecipe);
// router.delete("/:recipeId", recipeController.deleteRecipe);
// router.get("/recipes-get", recipeController.getAllRecipes);
// router.delete("/recipes/:recipeId", recipeController.deleteRecipe);
// router.get("/recipes-info/:recipeId", recipeController.getRecipeById);

// module.exports = router;
/////////////////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipecontroller');
const upload = require('../middlewares/upload'); // Adjust path if needed

// Route to handle recipe creation with file uploads
router.post(
  "/recipes",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 4 },
    { name: "video", maxCount: 1 },
  ]),
  recipeController.createRecipe
);

router.put(
  "/recipes/:recipeId",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 10 },
    { name: "video", maxCount: 1 },
  ]),
  recipeController.updateRecipe
);

// Other routes
router.get("/by-chef", recipeController.getRecipesByChef);
router.put("/:recipeId", recipeController.updateRecipe);
router.delete("/:recipeId", recipeController.deleteRecipe);
router.get("/recipes-get", recipeController.getAllRecipes);
router.delete("/recipes/:recipeId", recipeController.deleteRecipe);
router.get("/recipes-info/:recipeId", recipeController.getRecipeById);

module.exports = router;
