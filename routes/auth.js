const router = require("express").Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const brypt = require("bcrypt");

const User = require("../models/User");

const { loginValidate } = require("../validator");

// get user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// login
router.post("/", async (req, res) => {
  const error = loginValidate.validate(req.body).error;

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await brypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = {
      user: {
        _id: user._id,
      },
    };

    jwt.sign(payload, process.env.jwtSecret, (err, token) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server Error" });
      }
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
