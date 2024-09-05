const router = require("express").Router();
const contact = require("../models/contact");

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new contact({ name, email, message });
    await newContact.save();

    return res.status(200).json({ message: "Data Saved" });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({ message: "Technical Error Occurred" });
  }
});

module.exports = router;
