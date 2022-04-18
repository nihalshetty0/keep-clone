const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Label = require("../models/Label");
const bcrypt = require("bcrypt");

const { registerValidate } = require("../validator");

// register user
router.post("/", async (req, res) => {
  const error = registerValidate.validate(req.body).error;

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    await user.save();

    const addDefaultLabel = new Label({
      labels: ["Todo", "Learn", "Fav"],
      userId: user._id,
    });

    addDefaultLabel.save();

    const payload = {
      user: {
        _id: user._id,
      },
    };
    jwt.sign(payload, process.env.jwtSecret, (err, token) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.json({ token });
    });
  } catch (error) {}
});

module.exports = router;
